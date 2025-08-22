import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface MenuItemProps {
  $isActive?: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  ${({ $isActive, theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    padding: 1rem;

    cursor: pointer;

    color: ${$isActive ? theme.colors.green[300] : theme.colors.white};
    background-color: ${$isActive ? theme.colors.gray[100] : null};

    &:hover {
      background-color: ${theme.colors.gray[100]};
    }
  `}
`;
