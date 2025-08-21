import styled, { css } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 5rem);
  max-width: calc(100vw - 2rem);

  gap: 1rem;

  @media (min-width: 770px) {
    max-width: calc(100vw - 18.75rem - 4rem);
  }

  @media (min-width: 1300px) {
    max-width: calc(100vw - 25rem - 4rem);
  }
`

export const GoBackButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;

    width: 100%;

    a {
      color: ${theme.colors.white};
    }

    a:hover {
      transition: color 0.5s;
      color: ${theme.colors.green[300]};
    }
  `}
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  width: 100%;
  height: 100%;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`

export const AnimalPicturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;

  border-radius: 30px;
  overflow: hidden;

  @media (min-width: 1000px) {
    width: calc(50% - 1rem);
  }
`

export const AnimalPicturesSwiper = styled(Swiper)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.colors.gray[900]};
  }
`

export const AnimalPictureSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  position: relative;

  img {
    border-radius: 30px;
  }
`

export const AnimalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;

  align-items: flex-start;

  @media (min-width: 1000px) {
    width: calc(50% - 1rem);
  }
`

export const AnimalTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const AnimalDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span:first-child {
    font-size: 1.25rem;
    font-weight: bold;
  }
`
