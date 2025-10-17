import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { Play, Pause, SkipBack, SkipForward, List, Calendar } from "lucide-react";
import config from "./config";

const API = `${config.API_BASE_URL}/api`;

// Các mốc thời gian
const holidays = {
  solarNewYear: {
    name: "Tết Dương Lịch",
    date: "2026-01-01T00:00:00",
    title: "🎉 Năm Mới đang đến rất gần!",
    subtitle: "Hãy cùng đếm ngược tới khoảnh khắc giao thừa năm mới.",
    type: "solar-new-year",
    bgClass: "solar-new-year"
  },
  lunarNewYear: {
    name: "Tết Âm Lịch",
    date: "2026-02-17T00:00:00",
    title: "🌸 Tết đang đến rất gần!",
    subtitle: "Hãy cùng đếm ngược tới khoảnh khắc giao thừa năm mới.",
    type: "lunar-new-year",
    bgClass: "lunar-new-year"
  },
  christmas: {
    name: "Noel",
    date: "2025-12-25T00:00:00",
    title: "🎄 Giáng Sinh đang đến rất gần!",
    subtitle: "Hãy cùng đếm ngược tới đêm Noel đầm ấm.",
    type: "christmas",
    bgClass: "christmas"
  }
};

// Danh sách nhạc Tết - Sử dụng file local MP3 trong public/music/tet/
const tetPlaylist = [
  {
    id: 1,
    title: "Tết Bình An (Đại Mèo Remix)",
    artist: "Hana Cẩm Tiên",
    thumbnail: "https://img.youtube.com/vi/gOtfJ151ue4/hqdefault.jpg",
    audio: "/music/tet/tetbinhan.mp3"
  },
  {
    id: 2,
    title: "Xuân Đã Về",
    artist: "Nhạc Tết 2025",
    thumbnail: "https://img.youtube.com/vi/i6QjJwGOGe0/hqdefault.jpg",
    audio: "/music/tet/xuandave.mp3"
  },
  {
    id: 3,
    title: "Ngày Tết Quê Em",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/Thf6-faRGI4/hqdefault.jpg",
    audio: "/music/tet/ngaytetqueem.mp3"
  },
  {
    id: 4,
    title: "Tết Này Con Sẽ Về",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/YGhE2HZ8g8M/hqdefault.jpg",
    audio: "/music/tet/tetnayconseve.mp3"
  },
  {
    id: 5,
    title: "Đi Về Nhà",
    artist: "Nhạc Xuân 2025",
    thumbnail: "https://img.youtube.com/vi/vTJdVE_gjI0/hqdefault.jpg",
    audio: "/music/tet/divenha.mp3"
  },
  {
    id: 6,
    title: "Năm Qua Tôi Đã Làm Gì",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/ekMxrFeZb-0/hqdefault.jpg",
    audio: "/music/tet/namquatoidalamgi.mp3"
  },
  {
    id: 7,
    title: "Đi Để Trở Về",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/Qc1GxHNRRn4/hqdefault.jpg",
    audio: "/music/tet/didetrave.mp3"
  },
  {
    id: 8,
    title: "Tết Tết Tết Tết Đến Rồi",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/d7k0FsVLB6E/hqdefault.jpg",
    audio: "/music/tet/tettettettetdenroi.mp3"
  },
  {
    id: 9,
    title: "Như Hoa Mùa Xuân",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/g20JODoyHTA/hqdefault.jpg",
    audio: "/music/tet/nhuhoamuaxuan.mp3"
  },
  {
    id: 10,
    title: "Ngày Xuân Lòng Phụng Sụm Vay",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/QLfzXiKREFM/hqdefault.jpg",
    audio: "/music/tet/ngayxuanlongphungsumvay.mp3"
  },
  {
    id: 11,
    title: "Tết Là Tết",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/A-7t7DrKHsc/hqdefault.jpg",
    audio: "/music/tet/tetlatet.mp3"
  },
  {
    id: 12,
    title: "Chuyện Cũ Bỏ Qua",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/kDmOOj5Y0DI/hqdefault.jpg",
    audio: "/music/tet/chuyencuboqua.mp3"
  },
  {
    id: 13,
    title: "Mùa Xuân Ơi",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/18lVcz3wkWw/hqdefault.jpg",
    audio: "/music/tet/muaxuanoi.mp3"
  },
  {
    id: 14,
    title: "Đoàn Xuân Ca",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/mMobsXN6SPY/hqdefault.jpg",
    audio: "/music/tet/doanxuanca.mp3"
  },
  {
    id: 15,
    title: "Phố Xuân",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/VnpdsO4n3Yw/hqdefault.jpg",
    audio: "/music/tet/phoxuan.mp3"
  },
  {
    id: 16,
    title: "Con Bướm Xuân",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/myH0HIZNRiE/hqdefault.jpg",
    audio: "/music/tet/conbuomxuan.mp3"
  },
  {
    id: 17,
    title: "Xuân Phát Tài",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/OhXXsCpv0JI/hqdefault.jpg",
    audio: "/music/tet/xuanphattai.mp3"
  },
  {
    id: 18,
    title: "Cái Tết Giàu",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/faxZLGAEDHU/hqdefault.jpg",
    audio: "/music/tet/caitetgiau.mp3"
  }
];

// Danh sách nhạc Noel - Sử dụng file local MP3 trong public/music/christmas/
const christmasPlaylist = [
  {
    id: 1,
    title: "Merry Christmas Mr Lawrence",
    artist: "Christmas Song",
    thumbnail: "https://img.youtube.com/vi/LGs_vGt0MY8/hqdefault.jpg",
    audio: "/music/christmas/merrychristmasmrlawrence.mp3"
  },
  {
    id: 2,
    title: "Last Christmas",
    artist: "Wham!",
    thumbnail: "https://img.youtube.com/vi/KhqNTjbQ71A/hqdefault.jpg",
    audio: "/music/christmas/lastchristmas.mp3"
  },
  {
    id: 3,
    title: "All I Want For Christmas Is You",
    artist: "Mariah Carey",
    thumbnail: "https://img.youtube.com/vi/aAkMkVFwAoo/hqdefault.jpg",
    audio: "/music/christmas/alliwantforchristmasisyou.mp3"
  },
  {
    id: 4,
    title: "Santa Tell Me",
    artist: "Ariana Grande",
    thumbnail: "https://img.youtube.com/vi/nlR0MkrRklg/hqdefault.jpg",
    audio: "/music/christmas/santatellme.mp3"
  },
  {
    id: 5,
    title: "Mistletoe",
    artist: "Justin Bieber",
    thumbnail: "https://img.youtube.com/vi/LUjn3RpkcKY/hqdefault.jpg",
    audio: "/music/christmas/mistletoe.mp3"
  },
  {
    id: 6,
    title: "Sleigh Ride",
    artist: "Christmas Classic",
    thumbnail: "https://img.youtube.com/vi/DkXIJe8CaIc/hqdefault.jpg",
    audio: "/music/christmas/sleighride.mp3"
  }
];

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [userInfo, setUserInfo] = useState({ ip: "Loading...", isp: "Loading..." });
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState("lunarNewYear");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState(1); // 0 to 1
  
  // Audio player ref
  const audioRef = useRef(null);
  
  // Lấy playlist dựa trên loại lễ
  const currentPlaylist = holidays[selectedHoliday].type === "christmas" 
    ? christmasPlaylist 
    : tetPlaylist;

  // Fetch user IP and ISP
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API}/user-info`);
        setUserInfo(response.data);
      } catch (e) {
        console.error("Error fetching user info:", e);
        setUserInfo({ ip: "N/A", isp: "N/A" });
      }
    };
    fetchUserInfo();
  }, []);

  // Countdown to selected holiday
  useEffect(() => {
    const targetDate = new Date(holidays[selectedHoliday].date).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [selectedHoliday]);

  // Previous track
  const previousTrack = () => {
    const newIndex = currentTrack === 0 ? currentPlaylist.length - 1 : currentTrack - 1;
    changeTrack(newIndex);
  };

  // Next track
  const nextTrack = () => {
    const newIndex = (currentTrack + 1) % currentPlaylist.length;
    changeTrack(newIndex);
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      // Next track when song ends - will trigger useEffect to load and play
      const newIndex = (currentTrack + 1) % currentPlaylist.length;
      setCurrentTrack(newIndex);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isDragging, currentTrack, currentPlaylist]);

  // Load new track when currentTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update audio source and volume
    audio.src = currentPlaylist[currentTrack].audio;
    audio.volume = volume;
    audio.load();
    
    // Auto play if was playing before
    if (isPlaying) {
      audio.play().catch(error => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
    }
  }, [currentTrack, currentPlaylist, isPlaying, volume]);

  // Handle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(error => {
        console.log("Playback error:", error);
      });
      setIsPlaying(true);
    }
  };

  // Handle track change
  const changeTrack = (index) => {
    setCurrentTrack(index);
    setShowPlaylist(false);
    setCurrentTime(0);
    setIsPlaying(true); // Set to playing state
  };

  // Format time helper - format as MM:SS
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Handle seek
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekTime = percentage * duration;
    
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle progress bar drag
  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouse event listeners for dragging
  useEffect(() => {
    const handleProgressMouseMove = (e) => {
      const audio = audioRef.current;
      if (!isDragging || !audio || !duration) return;
      
      const rect = document.querySelector('.progress-bar-container');
      if (!rect) return;
      
      const rectBounds = rect.getBoundingClientRect();
      const clickX = e.clientX - rectBounds.left;
      const percentage = Math.max(0, Math.min(1, clickX / rectBounds.width));
      const seekTime = percentage * duration;
      
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleProgressMouseMove);
      document.addEventListener('mouseup', handleProgressMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleProgressMouseMove);
        document.removeEventListener('mouseup', handleProgressMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, duration]);
  
  // Handle holiday change
  const handleHolidayChange = (holidayKey) => {
    const audio = audioRef.current;
    setSelectedHoliday(holidayKey);
    setShowMenu(false);
    setCurrentTrack(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div className={`App ${holidays[selectedHoliday].bgClass}`}>
      {/* Holiday Selection Menu */}
      <div className="holiday-menu" data-testid="holiday-menu">
        <button 
          className="menu-trigger"
          onClick={() => setShowMenu(!showMenu)}
          data-testid="menu-trigger"
        >
          <Calendar size={20} />
          <span>{holidays[selectedHoliday].name}</span>
        </button>
        
        {showMenu && (
          <div className="menu-dropdown" data-testid="menu-dropdown">
            {Object.entries(holidays).map(([key, holiday]) => (
              <button
                key={key}
                className={`menu-item ${selectedHoliday === key ? 'active' : ''}`}
                onClick={() => handleHolidayChange(key)}
                data-testid={`menu-item-${key}`}
              >
                {holiday.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 data-testid="main-title">{holidays[selectedHoliday].title}</h1>
          <p data-testid="subtitle">{holidays[selectedHoliday].subtitle}</p>
        </div>

        {/* Countdown */}
        <div className="countdown" data-testid="countdown-section">
          <div className="countdown-box" data-testid="countdown-days">
            <div className="number">{String(countdown.days).padStart(2, '0')}</div>
            <div className="label">NGÀY</div>
          </div>
          <div className="countdown-box" data-testid="countdown-hours">
            <div className="number">{String(countdown.hours).padStart(2, '0')}</div>
            <div className="label">GIỜ</div>
          </div>
          <div className="countdown-box" data-testid="countdown-minutes">
            <div className="number">{String(countdown.minutes).padStart(2, '0')}</div>
            <div className="label">PHÚT</div>
          </div>
          <div className="countdown-box" data-testid="countdown-seconds">
            <div className="number">{String(countdown.seconds).padStart(2, '0')}</div>
            <div className="label">GIÂY</div>
          </div>
        </div>

        {/* Music Player */}
        <div className="music-player" data-testid="music-player">
          <div className="player-header">
            <img 
              src={currentPlaylist[currentTrack].thumbnail} 
              alt="Album Art" 
              className="album-art"
              data-testid="album-art"
            />
            <div className="track-info">
              <div className="track-title" data-testid="track-title">{currentPlaylist[currentTrack].title}</div>
              <div className="track-artist" data-testid="track-artist">{currentPlaylist[currentTrack].artist}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="time-display">
              <span className="current-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div 
              className="progress-bar-container"
              onMouseDown={handleProgressMouseDown}
              onClick={handleSeek}
              onTouchStart={handleProgressMouseDown}
              onTouchMove={(e) => {
                e.preventDefault();
                const audio = audioRef.current;
                if (isDragging && e.touches[0] && audio && duration) {
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = touch.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(1, clickX / rect.width));
                  const seekTime = percentage * duration;
                  audio.currentTime = seekTime;
                  setCurrentTime(seekTime);
                }
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
                <div 
                  className="progress-thumb"
                  style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <button 
              className="control-btn" 
              onClick={previousTrack}
              data-testid="prev-button"
            >
              <SkipBack size={20} />
            </button>
            <button 
              className="control-btn play-btn" 
              onClick={togglePlayPause}
              data-testid="play-pause-button"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button 
              className="control-btn" 
              onClick={nextTrack}
              data-testid="next-button"
            >
              <SkipForward size={20} />
            </button>
            <button 
              className="control-btn" 
              onClick={() => setShowPlaylist(!showPlaylist)}
              data-testid="playlist-button"
            >
              <List size={20} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="volume-control">
            <span className="volume-label">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span className="volume-value">{Math.round(volume * 100)}%</span>
          </div>

          {/* Hidden Audio Player */}
          <audio
            ref={audioRef}
            src={currentPlaylist[currentTrack].audio}
            preload="metadata"
          />
        </div>

        {/* Playlist Modal */}
        {showPlaylist && (
          <div className="playlist-modal" data-testid="playlist-modal">
            <div className="playlist-content">
              <h3>Danh sách phát</h3>
              {currentPlaylist.map((track, index) => (
                <div
                  key={track.id}
                  className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
                  onClick={() => changeTrack(index)}
                  data-testid={`playlist-item-${index}`}
                >
                  <img src={track.thumbnail} alt={track.title} />
                  <div>
                    <div className="item-title">{track.title}</div>
                    <div className="item-artist">{track.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="footer" data-testid="footer">
          <p>© 2025 VTuyen.</p>
          <p data-testid="ip-info">
            IP: {userInfo.ip} | ISP: {userInfo.isp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;