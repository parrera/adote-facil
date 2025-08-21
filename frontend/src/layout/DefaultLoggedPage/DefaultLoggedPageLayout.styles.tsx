import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 770px) {
    flex-direction: row;
  }
`

export const MobileHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: ${theme.colors.gray[200]};

    max-width: 100vw;
    height: 3rem;

    color: ${theme.colors.white};

    padding: 0.5rem 1rem;

    @media (min-width: 770px) {
      display: none;
    }
  `}
`

interface MobileMenuProps {
  $isOpen: boolean
}

export const MobileMenu = styled.aside<MobileMenuProps>`
  ${({ $isOpen, theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    display: ${$isOpen ? 'flex' : 'none'};
    flex-direction: column;

    height: 100%;
    width: 100%;

    background-color: ${theme.colors.gray[200]};

    @media (min-width: 770px) {
      display: none;
    }
  `}
`

export const MobileHeaderIconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    transition: color 0.2s;

    &:hover {
      color: ${theme.colors.green[300]};
    }
  `}
`

export const MobileMenuIconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 1rem;

    transition: color 0.2s;

    &:hover {
      color: ${theme.colors.green[300]};
    }
  `}
`

export const AsideMenu = styled.aside`
  display: none;
  position: fixed;

  background-color: ${({ theme }) => theme.colors.gray[200]};

  @media (min-width: 770px) {
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 300px;
  }

  @media (min-width: 1300px) {
    width: 400px;
  }
`

export const UserInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 0.5rem;

    color: ${theme.colors.white};

    @media (min-width: 770px) {
      gap: 1rem;
      padding: 1rem;

      margin: 1rem 0;

      span {
        font-size: 24px;
        font-weight: 700;
      }
    }
  `}
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface MenuItemProps {
  $isActive?: boolean
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
`

export const PageContent = styled.div`
  max-width: 100vw;
  padding: 2rem;

  @media (min-width: 770px) {
    width: calc(100vw - 300px);
    margin-left: 300px;
  }

  @media (min-width: 1300px) {
    width: calc(100vw - 400px);
    margin-left: 400px;
  }
`
