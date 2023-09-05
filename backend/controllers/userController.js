import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

//Register a user
export const registerUser = asyncHandler(async (req, res) => {
  console.log('creating a user...');

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    res.status(201);
    throw new Error('User already exists');
  } else {
    const user = await prisma.user.create({
      data: req.body,
    });
    if (user) {
      res.send({ message: 'User registered successfully', user: user });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

//Book a visit
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBoked = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: { bookedVisits: true },
    });

    if (alreadyBoked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: 'Visit already booked' });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id: id, date: date } },
        },
      });
      res.send({ message: 'Visit booked successfully' });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//Get all bookings for a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//Cancel a booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
    }
    res.status(200).send({ message: 'Visit cancelled successfully' });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//Add a residency in favorites list of a user
export const addResidencyToFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user.favResidenciesID.includes(id)) {
      const updatedFavResidenciesID = await prisma.user.update({
        where: { email: email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((residency) => residency !== id),
          },
        },
      });
      res.send({
        message: 'Residency removed from favorites',
        user: updatedFavResidenciesID,
      });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          favResidenciesID: { push: id },
        },
      });
      res
        .status(200)
        .send({ message: 'Residency added to favorites successfully' });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//Get all favorites residencies for a user
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favRes = await prisma.user.findUnique({
      where: { email: email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favRes);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
