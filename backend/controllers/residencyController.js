import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

//Create a residency
export const createResidency = asyncHandler(async (req, res) => {
  console.log('creating a residency...');

  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({
      message: 'Residency created successfully',
      residency,
    });
  } catch (err) {
    if (err.code === 'P2002') {
      throw new Error('A residency with address already exists');
    }
    throw new Error(err.message);
  }
});

//Get all residencies
export const getResidencies = asyncHandler(async (req, res) => {
  console.log('getting all residencies...');
  const residencies = await prisma.residency.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.send(residencies);
});

//Get a residency by id
export const getResidencyById = asyncHandler(async (req, res) => {
  console.log('getting a residency by id...');
  const { id } = req.params;
  const residency = await prisma.residency.findUnique({
    where: {
      id: id,
    },
  });
  res.send(residency);
});
