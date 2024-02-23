import React from "react";

const Carouselimage = ({ text }) => {
  return (
    <img
      className="d-block w-100 carousel-image"
      src="https://img.freepik.com/free-photo/front-view-succulent-plant-with-desk-accessories_23-2148223262.jpg?w=996&t=st=1707410835~exp=1707411435~hmac=a5d20df44b0436865b28b34d963ed65643365bed8a683d2581fb4f555c9cd0a1"
      alt={text}
    />
  );
};

const Carouselimage1 = ({ text }) => {
  return (
    <img
      className="d-block w-100 carousel-image"
      src="https://img.freepik.com/premium-photo/opened-notepad-with-laptop-top-view_23-2148223233.jpg"
      alt={text}
    />
  );
};

const Carouselimage2 = ({ text }) => {
  return (
    <img
      className="d-block w-100 carousel-image"
      src="https://img.freepik.com/free-photo/front-view-succulent-plant-with-desk-accessories_23-2148223262.jpg?w=996&t=st=1707410835~exp=1707411435~hmac=a5d20df44b0436865b28b34d963ed65643365bed8a683d2581fb4f555c9cd0a1"
      alt={text}
    />
  );
};

export { Carouselimage, Carouselimage1, Carouselimage2 };
