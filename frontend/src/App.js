import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import YouTube from "react-youtube";
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
    type: "tet"
  },
  lunarNewYear: {
    name: "Tết Âm Lịch",
    date: "2026-02-17T00:00:00",
    title: "🌸 Tết đang đến rất gần!",
    subtitle: "Hãy cùng đếm ngược tới khoảnh khắc giao thừa năm mới.",
    type: "tet"
  },
  christmas: {
    name: "Noel",
    date: "2025-12-25T00:00:00",
    title: "🎄 Giáng Sinh đang đến rất gần!",
    subtitle: "Hãy cùng đếm ngược tới đêm Noel đầm ấm.",
    type: "christmas"
  }
};

// Danh sách nhạc Tết
const tetPlaylist = [
  {
    id: "gOtfJ151ue4",
    title: "Tết Bình An (Đại Mèo Remix)",
    artist: "Hana Cẩm Tiên",
    thumbnail: "https://img.youtube.com/vi/gOtfJ151ue4/hqdefault.jpg"
  },
  {
    id: "i6QjJwGOGe0",
    title: "Xuân Đã Về",
    artist: "Nhạc Tết 2025",
    thumbnail: "https://img.youtube.com/vi/i6QjJwGOGe0/hqdefault.jpg"
  },
  {
    id: "Thf6-faRGI4",
    title: "Ngày Tết Quê Em",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/Thf6-faRGI4/hqdefault.jpg"
  },
  {
    id: "YGhE2HZ8g8M",
    title: "Tết Này Con Sẽ Về",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/YGhE2HZ8g8M/hqdefault.jpg"
  },
  {
    id: "vTJdVE_gjI0",
    title: "Đi Về Nhà",
    artist: "Nhạc Xuân 2025",
    thumbnail: "https://img.youtube.com/vi/vTJdVE_gjI0/hqdefault.jpg"
  }
];

// Danh sách nhạc Noel
const christmasPlaylist = [
  {
    id: "LGs_vGt0MY8",
    title: "Merry Christmas Mr Lawrence",
    artist: "Christmas Song",
    thumbnail: "https://img.youtube.com/vi/LGs_vGt0MY8/hqdefault.jpg"
  },
  {
    id: "KhqNTjbQ71A",
    title: "Last Christmas",
    artist: "Wham!",
    thumbnail: "https://img.youtube.com/vi/KhqNTjbQ71A/hqdefault.jpg"
  },
  {
    id: "aAkMkVFwAoo",
    title: "All I Want For Christmas Is You",
    artist: "Mariah Carey",
    thumbnail: "https://img.youtube.com/vi/aAkMkVFwAoo/hqdefault.jpg"
  },
  {
    id: "nlR0MkrRklg",
    title: "Santa Tell Me",
    artist: "Ariana Grande",
    thumbnail: "https://img.youtube.com/vi/nlR0MkrRklg/hqdefault.jpg"
  },
  {
    id: "LUjn3RpkcKY",
    title: "Mistletoe",
    artist: "Justin Bieber",
    thumbnail: "https://img.youtube.com/vi/LUjn3RpkcKY/hqdefault.jpg"
  },
  {
    id: "DkXIJe8CaIc",
    title: "Sleigh Ride",
    artist: "Christmas Classic",
    thumbnail: "https://img.youtube.com/vi/DkXIJe8CaIc/hqdefault.jpg"
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
  const [player, setPlayer] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState("lunarNewYear");
  
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

  // YouTube player ready
  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  // Handle track change
  const changeTrack = (index) => {
    setCurrentTrack(index);
    setShowPlaylist(false);
    setIsPlaying(true);
  };

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
  
  // Handle holiday change
  const handleHolidayChange = (holidayKey) => {
    setSelectedHoliday(holidayKey);
    setShowMenu(false);
    setCurrentTrack(0);
    setIsPlaying(false);
    if (player) {
      player.stopVideo();
    }
  };

  // YouTube player options
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="App">
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

          {/* Hidden YouTube Player */}
          <YouTube
            videoId={currentPlaylist[currentTrack].id}
            opts={opts}
            onReady={onPlayerReady}
            onEnd={nextTrack}
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