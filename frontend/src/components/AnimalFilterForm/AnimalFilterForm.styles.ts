import styled, { css } from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 100%;
  gap: 2rem;

  margin-top: 1rem;
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormButton = styled.div`
  display: flex;
`

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;
`
interface InputLabelProps {
  $hasError: boolean
}

export const InputLabel = styled.div<InputLabelProps>`
  ${({ theme, $hasError }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ${$hasError &&
    `
      > span:last-child {
        display: flex;
        align-items: center;
        font-size: 0.75rem;
        color: ${theme.colors.red[700]};
      }
    `}
  `}
`

export const AnimalNameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;

    input {
      padding: 0.5rem;
    }
  }
`

export const AnimalTypeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 100%;
`

export const AnimalGenderInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 50%;
`

export const AnimalRaceInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  label {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;

    input {
      padding: 0.5rem;
    }
  }
`
