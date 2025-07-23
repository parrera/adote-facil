import styled, { css } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogOverlay = styled(Dialog.Overlay)`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray[100]};
    opacity: 0.5;
    position: fixed;
    inset: 0;
  `}
`

export const DialogClose = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.red[700]};
  }
`

export const DialogContent = styled(Dialog.Content)`
  ${({ theme }) => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: ${theme.colors.gray[300]};

    border-radius: 6px;

    padding: 1rem;
  `}
`
