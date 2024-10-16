import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector(state => state.movieoData.imageURL);
  const mediaType = data.media_type ?? media_type;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'
      aria-label={`View details of ${data?.title || data?.name || 'Unknown Title'}`}
    >
      {loading && <div className='absolute inset-0 flex justify-center items-center bg-neutral-800'>Loading...</div>}
      {error ? (
        <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
          Image not available
        </div>
      ) : (
        data?.poster_path && (
          <img
            src={imageURL + data?.poster_path}
            alt={data?.title || data?.name || 'Media poster'}
            onLoad={() => setLoading(false)}
            onError={handleError}
            className='object-cover h-full w-full'
          />
        )
      )}

      {trending && (
        <div className='absolute top-4'>
          <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
            #{index} Trending
          </div>
        </div>
      )}

      <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2'>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>
          {data?.title || data?.name || 'Unknown Title'}
        </h2>
        <div className='text-sm text-neutral-400 flex justify-between items-center'>
          <p>{data?.release_date ? moment(data.release_date).format('MMMM Do YYYY') : 'No release date'}</p>
          <div className='relative'>
            <p className='bg-black px-1 rounded-full text-xs text-white' title={`Rating: ${data?.vote_average ? Number(data.vote_average).toFixed(1) : 'N/A'}`}>
              Rating: {data?.vote_average ? Number(data.vote_average).toFixed(1) : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
