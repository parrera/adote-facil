import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

// Extend DefaultTheme to include 'colors'
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      green: { [key: number]: string };
      gray: { [key: number]: string };
      [key: string]: string | { [key: number]: string };
    };
  }
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 5rem);
`;

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
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  width: 100%;
  max-width: 600px;
`;

export const AnimalPicturesSwiper = styled(Swiper)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 10rem;
  height: 16rem;

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

export const AnimalPictureSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 14rem;

  position: relative;

  img {
    border-radius: 6px;
  }
`;

export const AnimalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-items: flex-start;

  font-size: 1.5rem;
`;

export const AnimalDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;
