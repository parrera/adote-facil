import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    padding: 4.75rem;

    svg {
      color: ${theme.colors.green[200]};
    }

    span {
      text-align: center;
      line-height: 1.5rem;
      color: ${theme.colors.white};
    }
  `}
`;
