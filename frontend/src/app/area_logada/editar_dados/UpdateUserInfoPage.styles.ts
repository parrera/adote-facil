import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8rem);
  box-sizing: border-box;
  align-items: center;
  gap: 1rem;

  @media (min-width: 770px) {
    height: calc(100vh - 4rem);
  }
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
