import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Import your video - adjust the path to match your assets location
import heroVideo from "../../assets/videos/hero-video.mp4";

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => setIsVideoLoaded(true);
      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden mt-0">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&q=80"
        >
          <source src={heroVideo} type="video/mp4" />
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&q=80" 
            alt="Numba Cafe background"
          />
        </video>
        
        {/* Loading overlay */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 z-40 flex items-center space-x-4 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
        <button
          onClick={togglePlay}
          className="text-white hover:text-yellow-400 transition-colors"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="text-white hover:text-yellow-400 transition-colors"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </section>
  );
};

export default Hero;