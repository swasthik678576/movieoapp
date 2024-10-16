import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const BannerHome = () => {
  const bannerData = useSelector(state => state.movieoData.bannerData);
  const imageURL = useSelector(state => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentImage(prev => (prev < bannerData.length - 1 ? prev + 1 : 0));
  }, [bannerData.length]);

  const handlePrevious = useCallback(() => {
    setCurrentImage(prev => (prev > 0 ? prev - 1 : bannerData.length - 1));
  }, [bannerData.length]);

  useEffect(() => {
    if (!isHovered && bannerData.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [handleNext, isHovered, bannerData.length]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      handlePrevious();
    }
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!bannerData.length) return null; // Don't render if no data

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {bannerData.map((data, index) => (
          <div
            key={data.id}
            className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all'
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className='w-full h-full'>
              <img
                src={`${imageURL}${data.backdrop_path}`}
                className='h-full w-full object-cover'
                alt={data.title || data.name}
                onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }} // Add fallback image URL
              />
            </div>
            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:flex'>
              <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                <FaAngleLeft />
              </button>
              <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                <FaAngleRight />
              </button>
            </div>
            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
            <div className='container mx-auto'>
              <div className='w-full absolute bottom-0 max-w-md px-3'>
                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                  {data?.title || data?.name}
                </h2>
                <p className='text-ellipsis line-clamp-3 my-2'>
                  {data.overview}
                </p>
                <div className='flex items-center gap-4'>
                  <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                  <span>|</span>
                  <p>View: {Number(data.popularity).toFixed(0)}</p>
                </div>
                <Link to={`/${data?.media_type}/${data.id}`}>
                  <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                    Play Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {bannerData.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${currentImage === index ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerHome;
