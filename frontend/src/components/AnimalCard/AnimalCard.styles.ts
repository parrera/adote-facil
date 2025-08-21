import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    justify-content: space-between;

    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 10px;

    padding: 0.5rem;
    gap: 0.5rem;

    background-color: ${theme.colors.gray[200]};

    max-width: 18rem;
    min-width: 14rem;
  `}
`

export const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 6px 6px 0 0;
  position: relative;

  width: calc(100% + 1rem + 2px);
  height: 15rem;

  margin-top: calc(-0.5rem - 1px);
  margin-left: calc(-0.5rem - 1px);

  img {
    object-fit: cover;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 1rem;

  button {
    height: 2rem;
    font-size: 0.75rem;
  }
`

export const AnimalInfo = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: bold;
    font-size: 1.25rem;
  }
`

export const MyAnimalsButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;

  gap: 0.5rem;
`

interface MyAnimalsButtonProps {
  $buttonType: 'edit' | 'delete'
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
`
