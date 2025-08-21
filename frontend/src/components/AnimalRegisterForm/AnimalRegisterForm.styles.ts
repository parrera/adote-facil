import styled, { css } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

export const MaxAnimalPicturesWarningModalOverlay = styled(Dialog.Overlay)`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray[100]};
    opacity: 0.5;
    position: fixed;
    inset: 0;
  `}
`

export const MaxAnimalPicturesWarningModalContent = styled(Dialog.Content)`
  ${({ theme }) => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: ${theme.colors.gray[300]};

    border-radius: 6px;

    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    span {
      text-align: center;
    }

    button {
      height: 2rem;
    }
  `}
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 100%;
  gap: 2rem;
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
interface RequiredInputLabelProps {
  $hasError: boolean
}

export const RequiredInputLabel = styled.div<RequiredInputLabelProps>`
  ${({ theme, $hasError }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > span:first-child::after {
      content: '*';
      color: ${theme.colors.red[700]};
    }

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

export const AnimalDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 100%;

  label {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;

    textarea {
      padding: 0.5rem;
      height: 4rem;
    }
  }
`

export const AnimalDescriptionLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  span:last-child {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`

export const AnimalPicturesInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 100%;

  input {
    display: none;
  }
`

export const AddAnimalPicturesSwiper = styled(Swiper)`
  display: flex;

  justify-content: flex-start;
  margin: 0px;
  overflow: hidden;

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
`

export const AnimalPictureSwiperSlide = styled(SwiperSlide)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 94px;

    border-radius: 6px;

    gap: 0.5rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      padding: 0.25rem 0.5rem;

      border: none;
      border-radius: 4px;
      background-color: ${theme.colors.gray[300]};
      color: ${theme.colors.red[700]};

      font-size: 10px;
    }
  `}
`

interface AnimalPicturesInputProps {
  $enabled: boolean
}

export const AnimalPicturesInput = styled.label<AnimalPicturesInputProps>`
  ${({ $enabled, theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 0.25rem;

    width: 92px;
    height: 135px;

    color: ${$enabled ? theme.colors.green[300] : theme.colors.gray[300]};
    border: 1px solid
      ${$enabled ? theme.colors.green[300] : theme.colors.gray[300]};
    border-radius: 6px;

    cursor: pointer;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid
        ${$enabled ? theme.colors.green[300] : theme.colors.gray[300]};
      border-radius: 100%;

      width: 32px;
      height: 32px;
    }
  `}
`

export const AnimalPicture = styled(Image)`
  border-radius: 6px;
  width: 94px;
  height: 135px;

  object-fit: cover;
`
