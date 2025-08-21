import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

    button {
      height: 1.75rem;
      width: 6rem;

      font-size: 0.75rem;
      font-weight: 700;
    }

    @media (min-width: 1000px) {
      h1 {
        font-size: 1.5rem;
      }

      button {
        height: 2rem;
        width: 8rem;

        font-size: 1rem;
      }
    }
  `}
`

export const AnimalsListWrapper = styled.div`
  gap: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 880px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1120px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1480px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1740px) {
    grid-template-columns: repeat(5, 1fr);
  }
`
