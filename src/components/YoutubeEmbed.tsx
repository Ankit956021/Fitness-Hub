'use client';

interface YoutubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

export function YoutubeEmbed({ 
  videoId, 
  title = "YouTube video", 
  className = "",
  autoPlay = false,
  showControls = true 
}: YoutubeEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    autoplay: autoPlay ? '1' : '0',
    controls: showControls ? '1' : '0',
    rel: '0', // Don't show related videos
    modestbranding: '1', // Reduce YouTube branding
    fs: '1', // Allow fullscreen
    hl: 'en', // Set language to English
    iv_load_policy: '3', // Hide video annotations
    disablekb: '0', // Enable keyboard controls
    cc_load_policy: '0', // Hide closed captions by default
    playsinline: '1', // Play inline on iOS
    origin: window.location.origin, // Set origin for API
  }).toString()}`;

  return (
    <div className={`relative w-full ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full rounded-lg shadow-2xl"
        style={{ aspectRatio: '16/9' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        frameBorder="0"
      />
      
      {/* Custom overlay for additional controls (optional) */}
      <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-white/10"></div>
    </div>
  );
}

// Utility function to get YouTube thumbnail URL
export function getYoutubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high') {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

// Component for just the thumbnail with play button
export function YoutubeThumbnail({ 
  videoId, 
  title, 
  onClick,
  className = "",
  duration 
}: {
  videoId: string;
  title: string;
  onClick?: () => void;
  className?: string;
  duration?: string;
}) {
  return (
    <div 
      className={`relative cursor-pointer group overflow-hidden ${className}`}
      onClick={onClick}
    >
      <img
        src={getYoutubeThumbnail(videoId, 'maxres')}
        alt={title}
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        style={{ aspectRatio: '16/9' }}
        onError={(e) => {
          // Fallback to high quality if maxres fails
          e.currentTarget.src = getYoutubeThumbnail(videoId, 'high');
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-lg">
        <div className="relative">
          {/* Pulsing ring */}
          <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse opacity-75 group-hover:opacity-100"></div>
          
          {/* Main play button */}
          <div className="relative w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <svg 
              className="w-7 h-7 text-white ml-0.5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Video duration overlay */}
      {duration && (
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
          {duration}
        </div>
      )}

      {/* HD Quality badge */}
      <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
        HD
      </div>
    </div>
  );
}