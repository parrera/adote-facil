'use client';

import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      padding: 0;
      margin: 0;

      &:focus {
        outline: none;
      }
    }

    html {
      height: 100%;
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.gray[800]};
    }

    body {
      height: 100%;
    }

    a {
      text-decoration: none;
      color: ${theme.colors.green[300]};
    }

    input,
    textarea {
      border-radius: 6px;

      color: ${theme.colors.gray[800]};
      background-color: ${theme.colors.gray[200]};
      border: 1px solid ${theme.colors.gray[500]};

      padding: 0.5rem 1rem;

      &:focus {
        border-color: ${theme.colors.green[300]};
      }
    }
  `}
`;
