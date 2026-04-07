import React from 'react';
import MacWindows from '../MacWindows';
import './spotify.scss';

const Spotify = ({windowName}) => {
  return (
    <MacWindows windowName={windowName}>
      <div className='spotify-window'>
        <iframe 
          data-testid="embed-iframe" 
          src="https://open.spotify.com/embed/playlist/08bEJHJxIQSZJQUX0RqOOt?utm_source=generator&theme=0" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
      </div>
    </MacWindows>
  )
}

export default Spotify;
