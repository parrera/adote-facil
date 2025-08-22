import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (min-width: 770px) {
    flex-direction: row;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  height: 3rem;

  @media (min-width: 770px) {
    display: none;
  }
`;

export const Aside = styled.aside`
  display: none;

  @media (min-width: 770px) {
    display: flex;
    align-items: flex-end;

    padding: 2rem;

    width: 340px;

    background-color: ${({ theme }) => theme.colors.gray[200]};
  }

  @media (min-width: 1080px) {
    width: 480px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem;
  height: 100vh;

  @media (min-width: 770px) {
    max-width: calc(100vw - 340px - 4rem);
    padding: 0;
  }

  @media (min-width: 1080px) {
    max-width: calc(100vw - 480px - 4rem);
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  @media (min-width: 770px) {
    margin-top: 12rem;
    padding: 2rem;

    width: calc(100vw - 404px - 4rem);
  }

  @media (min-width: 1080px) {
    width: calc(100vw - 544px - 4rem);

    h1 {
      font-size: 2rem;
    }
  }
`;

export const LoginFormInputsWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${theme.colors.white};

    width: 100%;
    max-width: 400px;

    label {
      display: flex;
      flex-direction: column;

      gap: 0.5rem;

      span {
        font-size: 0.75rem;
        color: ${theme.colors.red[700]};
      }
    }

    input {
      height: 2rem;
    }
  `}
`;

export const LoginFormButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  button {
    max-width: 400px;
  }
`;

export const LoginFormFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 770px) {
    margin-bottom: 2rem;
  }
`;
