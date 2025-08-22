import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;

    justify-content: space-between;

    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 10px;

    padding: 0.5rem;
    gap: 0.5rem;

    background-color: ${theme.colors.gray[200]};
  `}
`;

export const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 6px;
  position: relative;

  min-width: 9rem;
  height: 10.5rem;

  img {
    object-fit: cover;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  width: 100%;

  button {
    height: 2rem;
    font-size: 0.75rem;
  }
`;

export const AnimalInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  margin-top: 1rem;
`;

export const MyAnimalsButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;

  gap: 0.5rem;
`;

interface MyAnimalsButtonProps {
  $buttonType: 'edit' | 'delete';
}

export const MyAnimalsButton = styled.button<MyAnimalsButtonProps>`
  ${({ theme, $buttonType }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 3rem;

    background: none;

    color: ${$buttonType === 'edit'
      ? theme.colors.green[300]
      : theme.colors.red[700]};
    border: 1px solid
      ${$buttonType === 'edit'
        ? theme.colors.green[300]
        : theme.colors.red[700]};

    border-radius: 6px;

    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: ${$buttonType === 'edit'
        ? theme.colors.green[300]
        : theme.colors.red[700]};
      color: ${theme.colors.white};
    }
  `}
`;
