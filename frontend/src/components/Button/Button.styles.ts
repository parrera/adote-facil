import styled, { css } from 'styled-components'

export type ButtonStyleTypes = 'green-filled' | 'green-outlined' | 'red-filled'

interface ButtonProps {
  $buttonStyle: ButtonStyleTypes
}

const buttonStyles = {
  'green-filled': css`
    background-color: ${({ theme }) => theme.colors.green[300]};
    color: ${({ theme }) => theme.colors.white};
    border-color: transparent;
  `,
  'green-outlined': css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.green[300]};
    border-color: ${({ theme }) => theme.colors.green[300]};
  `,
  'red-filled': css`
    background-color: ${({ theme }) => theme.colors.red[700]};
    color: ${({ theme }) => theme.colors.white};
    border-color: transparent;
  `,
}

export const Button = styled.button<ButtonProps>`
  ${({ $buttonStyle }) => css`
    height: 3rem;
    width: 100%;
    border-radius: 6px;

    border: 1px solid;

    ${buttonStyles[$buttonStyle]}

    cursor: pointer;

    font-weight: 800;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  `}
`
