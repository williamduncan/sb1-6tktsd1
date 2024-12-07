import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface UserContextType {
  users: Record<string, User>;
  updateUserAvatar: (userId: string, newAvatarUrl: string) => void;
}

const defaultUsers: Record<string, User> = {
  '1': {
    id: '1',
    name: 'Angus',
    avatar: 'https://images.unsplash.com/photo-1500529975644-c3d0c1ef7ccf?w=150',
    role: 'child'
  },
  '2': {
    id: '2',
    name: 'Courtney',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'parent'
  },
  '3': {
    id: '3',
    name: 'Millie',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    role: 'family'
  },
  '4': {
    id: '4',
    name: 'Maude',
    avatar: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150',
    role: 'child'
  },
  '5': {
    id: '5',
    name: 'GrandPa',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    role: 'family'
  }
};

const UserContext = createContext<UserContextType>({ 
  users: defaultUsers,
  updateUserAvatar: () => {} 
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<Record<string, User>>(() => {
    const savedUsers = localStorage.getItem('familyConnectUsers');
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });

  useEffect(() => {
    localStorage.setItem('familyConnectUsers', JSON.stringify(users));
  }, [users]);

  const updateUserAvatar = (userId: string, newAvatarUrl: string) => {
    setUsers(prevUsers => ({
      ...prevUsers,
      [userId]: {
        ...prevUsers[userId],
        avatar: newAvatarUrl
      }
    }));
  };

  return (
    <UserContext.Provider value={{ users, updateUserAvatar }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}