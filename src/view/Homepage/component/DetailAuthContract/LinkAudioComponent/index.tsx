import React, { useRef, useState } from 'react';
import '../../../style.scss';

function LinkAudio({ urlAudio }) {
  const ref = useRef();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const payAudio = () => {
    if (isPlaying === false) {
      ref.current.play();
      setIsPlaying(true);
    } else {
      ref.current.pause();
      setIsPlaying(false);
    }
  };


  return (
    <div className="text-center">
      <div className="d-none">
        <audio
          ref={ref}
          id="myAudio"
          controls
          src={urlAudio}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
      <span className="tag-link" onClick={payAudio}>Nghe</span>
    </div>
  );
}

export default LinkAudio;
