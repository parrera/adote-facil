'use client';

import {
  Cat,
  PawPrint,
  Barn,
  PencilSimple,
  SignOut,
  ChatCircleText,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import * as S from './UserMenu.styles';
import { deleteCookie } from 'cookies-next';

enum MenuItemsEnum {
  AVAILABLE_ANIMALS = 'AVAILABLE_ANIMALS',
  ADD_ANIMAL = 'ADD_ANIMAL',
  MY_ANIMALS = 'MY_ANIMALS',
  MY_CHATS = 'MY_CHATS',
  EDIT_USER_DATA = 'EDIT_USER_DATA',
}

type MenuItem = {
  id: MenuItemsEnum;
  label: string;
  icon: ReactElement;
  route: string;
};

const menuItems: MenuItem[] = [
  {
    id: MenuItemsEnum.AVAILABLE_ANIMALS,
    label: 'Animais disponíveis para adoção',
    icon: <Cat size={24} />,
    route: '/area_logada/animais_disponiveis',
  },
  {
    id: MenuItemsEnum.ADD_ANIMAL,
    label: 'Disponibilizar animal para adoção',
    icon: <PawPrint size={24} />,
    route: '/area_logada/disponibilizar_animal',
  },
  {
    id: MenuItemsEnum.MY_ANIMALS,
    label: 'Meus animais disponíveis para adoção',
    icon: <Barn size={24} />,
    route: '/area_logada/meus_animais',
  },
  {
    id: MenuItemsEnum.MY_CHATS,
    label: 'Minhas conversas',
    icon: <ChatCircleText size={24} />,
    route: '/area_logada/conversas',
  },
  {
    id: MenuItemsEnum.EDIT_USER_DATA,
    label: 'Editar dados pessoais',
    icon: <PencilSimple size={24} />,
    route: '/area_logada/editar_dados',
  },
];

export function UserMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItemsEnum>(
    MenuItemsEnum.AVAILABLE_ANIMALS
  );

  useEffect(() => {
    const currentPath = window?.location?.pathname;
    const activeItem = menuItems.find(item => item.route === currentPath);
    if (activeItem) {
      setActiveMenuItem(activeItem.id);
    }
  }, [setActiveMenuItem]);

  const handleMenuItemClick = (menuItem: MenuItem) => {
    setActiveMenuItem(menuItem.id);
  };

  const handleLogout = () => {
    deleteCookie('token', { path: '/' });
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <S.Wrapper>
      {menuItems.map(menuItem => (
        <Link href={menuItem.route} key={menuItem.id}>
          <S.MenuItem
            $isActive={activeMenuItem === menuItem.id}
            onClick={() => handleMenuItemClick(menuItem)}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </S.MenuItem>
        </Link>
      ))}
      <S.MenuItem onClick={handleLogout}>
        <SignOut size={24} />
        <span>Sair</span>
      </S.MenuItem>
    </S.Wrapper>
  );
}
