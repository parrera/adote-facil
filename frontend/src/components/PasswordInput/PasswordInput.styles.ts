import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;

    input {
      width: 100%;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;

      svg {
        color: ${theme.colors.gray[500]};
        width: 1.5rem;
        height: 1.5rem;

        margin-left: -3.5rem;
      }
    }
  `}
`;
