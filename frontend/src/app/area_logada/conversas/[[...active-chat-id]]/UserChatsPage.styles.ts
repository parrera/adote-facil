import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8rem);
  box-sizing: border-box;
  align-items: center;
  gap: 1rem;

  max-width: 100%;

  @media (min-width: 770px) {
    height: calc(100vh - 4rem);
    max-width: calc(100vw - 300px - 4rem);
  }

  @media (min-width: 1300px) {
    max-width: calc(100vw - 400px - 2rem);
  }
`

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    h1 {
      color: ${theme.colors.white};
      font-size: 1rem;
    }

    @media (min-width: 770px) {
      h1 {
        font-size: 1.5rem;
      }
    }
  `}
`

export const UserChat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  width: 100%;
  max-width: 500px;

  transition: all 0.2s;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.green[300]};
  }

  svg {
    flex-shrink: 0;
  }
`

export const ChatContent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 100%;
  overflow: hidden;
`

export const ChatContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ChatUserName = styled.span`
  font-weight: bold;
  font-size: 18px;
`

export const ChatLastMessageTime = styled.span`
  font-size: 14px;
`
export const ChatLastMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
