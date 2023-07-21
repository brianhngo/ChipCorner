import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const images = [
    'https://cdn.musebycl.io/2020-07/Doritos-Crash-From-Home-hed-2020.jpg',
    'https://d2td6mzj4f4e1e.cloudfront.net/wp-content/uploads/sites/9/2021/06/Doritos-Make-Your-Play.jpg',
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4988de56-3d50-4f3f-9c8d-968925e507b6/d90l1av-30131928-c2f4-4784-b981-810079278044.png/v1/fill/w_1095,h_730,q_70,strp/nacho_cheese_doritos_advertisement_by_xeroh_by_xerohthehero_d90l1av-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzQ5ODhkZTU2LTNkNTAtNGYzZi05YzhkLTk2ODkyNWU1MDdiNlwvZDkwbDFhdi0zMDEzMTkyOC1jMmY0LTQ3ODQtYjk4MS04MTAwNzkyNzgwNDQucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.uHDtQ5CqIwFmyUgD2uSh0_W9rJZfCPrPUSz69eHfHUg',
  ];

  const previousImage = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? images.length - 1 : newIndex);
  };

  const nextImage = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= images.length ? 0 : newIndex);
  };

  useEffect(() => {}, [index]);

  return (
    <div className="imagePlaceHolder">
      <img
        className="imagePlaceHolder2"
        src={images[index]}
        alt={`Image ${index}`}
      />
      <div className="svgContainer">
        <svg height="80" width="80">
          <circle
            cx="20"
            cy="40"
            r="3"
            stroke="black"
            fill={index === 0 ? 'black' : 'white'}
          />
          <circle
            cx="40"
            cy="40"
            r="3"
            stroke="black"
            fill={index === 1 ? 'black' : 'white'}
          />
          <circle
            cx="60"
            cy="40"
            r="3"
            stroke="black"
            fill={index === 2 ? 'black' : 'white'}
          />
        </svg>
      </div>
      <div className="carouselButtonContainer">
        <button className="buttonPlaceHolder" onClick={previousImage}>
          Previous
        </button>
        <button className="buttonPlaceHolder" onClick={nextImage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
