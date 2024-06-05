import React from 'react'
import Carousel, { CarouselItem } from './Carousel'

export default function CarouselMain() {
  return (
    <Carousel>
      {/* <CarouselItem>
        <a
          href="https://www.instagram.com/involuntir"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/slides/slide-1.png" alt="" className="mx-auto" />
        </a>
      </CarouselItem> */}
      <CarouselItem>
        <a href="https://www.peduly.com" target="_blank" rel="noreferrer">
          <img src="/images/slides/slide-2.png" alt="" className="mx-auto" />
        </a>
      </CarouselItem>
      <CarouselItem>
        <a href="https://www.peduly.com" target="_blank" rel="noreferrer">
          <img src="/images/slides/slide-2.png" alt="" className="mx-auto" />
        </a>
      </CarouselItem>
      
    </Carousel>
  )
}
