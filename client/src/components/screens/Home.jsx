import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
  Carouselimage,
  Carouselimage1,
  Carouselimage2,
} from '../Carouselimage';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <Carouselimage text="First slide" />
          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>
              Exploring the Charm of Rural Life: Connecting Communities, Sharing
              Stories, and Celebrating Country Living!
            </h3>
            <p style={{ color: 'black' }}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carouselimage1 text="Second slide" />
          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>Second slide label</h3>
            <p style={{ color: 'black' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carouselimage2 text="Third slide" />
          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>Third slide label</h3>
            <p style={{ color: 'black' }}>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Home;
