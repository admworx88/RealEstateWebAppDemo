import React from 'react';
import { Avatar, Menu } from '@mantine/core';

export default function ProfileMenu({ user, logout }) {
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt={user.name} radius="xl" size={40} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Favorites</Menu.Item>
        <Menu.Item>Bookings</Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
