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
    heading: "Happy New Year CountDown",
    title: "🎉 Năm Mới đang đến gần!",
    subtitle: "Hãy cùng đếm ngược tới khoảnh khắc giao thừa năm mới.",
    type: "solar-new-year",
    bgClass: "solar-new-year"
  },
  lunarNewYear: {
    name: "Tết Âm Lịch",
    date: "2026-02-17T00:00:00",
    heading: "Happy New Year CountDown",
    title: "🌸Tết kề bên!",
    subtitle: "Cùng nhau đếm ngược để chào đón khoảnh khắc giao thừa thiêng liêng!",
    type: "lunar-new-year",
    bgClass: "lunar-new-year"
  },
  christmas: {
    name: "Noel",
    date: "2025-12-25T00:00:00",
    heading: "Christmas CountDown",
    title: "🎄 Giáng Sinh đang đến gần!",
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
    audio: "/music/tet/namquadalamgi.mp3"
  },
  {
    id: 7,
    title: "Đi Để Trở Về",
    artist: "Nhạc Xuân",
    thumbnail: "https://img.youtube.com/vi/Qc1GxHNRRn4/hqdefault.jpg",
    audio: "/music/tet/didetrove.mp3"
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
    title: "Ngày Xuân Lòng Phụng Sum Vầy",
    artist: "Nhạc Tết",
    thumbnail: "https://img.youtube.com/vi/QLfzXiKREFM/hqdefault.jpg",
    audio: "/music/tet/ngayxuanlongphungxumvay.mp3"
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
  },
  {
    id: 19,
    title: "Tết Đong Đầy",
    artist: "Nhạc Xuân",
    thumbnail: "https://i.ytimg.com/vi/gOtfJ151ue4/maxresdefault.jpg",
    audio: "/music/tet/tetdongday.mp3"
  },
  {
    id: 20,
    title: "Một Năm Mới Bình An",
    artist: "Nhạc Tết",
    thumbnail: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/2/7/7/e/277ef3a66a67413690578905dbb85451.jpg",
    audio: "/music/tet/motnammoibinhan.mp3"
  }
];

// Danh sách nhạc Noel - Sử dụng file local MP3 trong public/music/noel/
const christmasPlaylist = [
  {
    id: 1,
    title: "Merry Christmas Mr Lawrence",
    artist: "Christmas Song",
    thumbnail: "https://img.youtube.com/vi/LGs_vGt0MY8/hqdefault.jpg",
    audio: "/music/noel/merrychristmas.mp3"
  },
  {
    id: 2,
    title: "Last Christmas",
    artist: "Wham!",
    thumbnail: "https://img.youtube.com/vi/KhqNTjbQ71A/hqdefault.jpg",
    audio: "/music/noel/lastchristmas.mp3"
  },
  {
    id: 3,
    title: "All I Want For Christmas Is You",
    artist: "Mariah Carey",
    thumbnail: "https://img.youtube.com/vi/aAkMkVFwAoo/hqdefault.jpg",
    audio: "/music/noel/alliwantforchristmasisyou.mp3"
  },
  {
    id: 4,
    title: "Santa Tell Me",
    artist: "Ariana Grande",
    thumbnail: "https://img.youtube.com/vi/nlR0MkrRklg/hqdefault.jpg",
    audio: "/music/noel/santatellme.mp3"
  },
  {
    id: 5,
    title: "Mistletoe",
    artist: "Justin Bieber",
    thumbnail: "https://img.youtube.com/vi/LUjn3RpkcKY/hqdefault.jpg",
    audio: "/music/noel/mistletoe.mp3"
  },
  {
    id: 6,
    title: "Sleigh Ride",
    artist: "Christmas Classic",
    thumbnail: "https://img.youtube.com/vi/DkXIJe8CaIc/hqdefault.jpg",
    audio: "/music/noel/sleighride.mp3"
  }
];

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  // eslint-disable-next-line no-unused-vars
  const [currentDateInfo, setCurrentDateInfo] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    period: "AM",
    day: "01",
    month: "01",
    monthLabel: "Tháng 01",
    weekday: "Thứ hai"
  });
  // eslint-disable-next-line no-unused-vars
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
  const [activeTab, setActiveTab] = useState("music"); // music or calendar
  
  // Audio player ref
  const audioRef = useRef(null);
  const playerContainerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
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

  // Falling flowers animation
  useEffect(() => {
    const createFlower = () => {
      const flower = document.createElement('div');
      flower.className = 'falling-flower';
      
      const img = document.createElement('img');
      img.src = '/art/hoadao.png';
      img.alt = 'Peach Blossom';
      flower.appendChild(img);
            
      const startX = Math.random() * window.innerWidth;
      flower.style.left = `${startX}px`;
      
      const duration = 8 + Math.random() * 8;
      flower.style.animationDuration = `${duration}s`;
      
      const delay = Math.random() * 3;
      flower.style.animationDelay = `${delay}s`;
      
      const windIntensity = 0.5 + Math.random() * 1;
      flower.style.setProperty('--wind-intensity', windIntensity);
      
      const rotationSpeed = 2 + Math.random() * 4;
      img.style.animationDuration = `${rotationSpeed}s`;
      
      document.body.appendChild(flower);
      
      setTimeout(() => {
        flower.remove();
      }, (duration + delay) * 1000);
    };
    
    const interval = setInterval(createFlower, 1600);
    
    for (let i = 0; i < 3; i++) {
      setTimeout(createFlower, i * 400);
    }
    
    return () => clearInterval(interval);
  }, []);

  // Falling snowflakes animation
  useEffect(() => {
    const createSnow = () => {
      const snow = document.createElement('div');
      snow.className = 'falling-snow';
      
      const img = document.createElement('img');
      img.src = '/art/tuyet.png';
      img.alt = 'Snowflake';
      snow.appendChild(img);
      
      const startX = Math.random() * window.innerWidth;
      snow.style.left = `${startX}px`;
      
      const duration = 10 + Math.random() * 10;
      snow.style.animationDuration = `${duration}s`;
      
      const delay = Math.random() * 4;
      snow.style.animationDelay = `${delay}s`;
      
      const rotationSpeed = 3 + Math.random() * 5;
      img.style.animationDuration = `${rotationSpeed}s`;
      
      document.body.appendChild(snow);
      
      setTimeout(() => {
        snow.remove();
      }, (duration + delay) * 1000);
    };
    
    const interval = setInterval(createSnow, 1200);
    
    for (let i = 0; i < 3; i++) {
      setTimeout(createSnow, i * 300);
    }
    
    return () => clearInterval(interval);
  }, []);

  // Live clock info for side widgets
  useEffect(() => {
    const updateDateInfo = () => {
      const now = new Date();
      const formatLabel = (label) => {
        if (!label) return "";
        return label.charAt(0).toUpperCase() + label.slice(1);
      };
      const hours24 = now.getHours();
      const period = hours24 >= 12 ? "PM" : "AM";
      const hours = hours24 % 12 || 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const monthLabel = formatLabel(now.toLocaleString("vi-VN", { month: "long" }));
      const weekday = formatLabel(now.toLocaleString("vi-VN", { weekday: "long" }));

      setCurrentDateInfo({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        period,
        day: day.toString().padStart(2, "0"),
        month: month.toString().padStart(2, "0"),
        monthLabel,
        weekday
      });
    };

    updateDateInfo();
    const interval = setInterval(updateDateInfo, 1000);
    return () => clearInterval(interval);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, currentPlaylist, isPlaying]);

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

  // Swipe handlers
  const handleTouchStart = (e) => {
    // Don't trigger swipe if touching interactive elements
    const target = e.target;
    if (target.closest('button') || 
        target.closest('.progress-bar-container') || 
        target.closest('.volume-slider') ||
        target.closest('input')) {
      touchStartX.current = null;
      return;
    }
    
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 80; // Increased from 50 to 80

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - go to calendar
        setActiveTab("calendar");
      } else {
        // Swipe right - go to music
        setActiveTab("music");
      }
    }
    
    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Lunar calendar conversion - Vietnamese timezone
  const jdFromDate = (dd, mm, yy) => {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
    }
    return jd;
  };

  const getNewMoonDay = (k, timeZone) => {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    const deltat = 0;
    const JdNew = Jd1 + C1 - deltat / 86400;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
  };

  const getSunLongitude = (jdn, timeZone) => {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = Math.PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - Math.PI * 2 * (Math.floor(L / (Math.PI * 2)));
    return Math.floor(L / Math.PI * 6);
  };

  const getLunarMonth11 = (yy, timeZone) => {
    const off = jdFromDate(31, 12, yy) - 2415021;
    const k = Math.floor(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  };

  const getLeapMonthOffset = (a11, timeZone) => {
    const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  };

  const solarToLunar = (dd, mm, yy, timeZone = 7) => {
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
  };

  // Get calendar data for February 2026
  const getCalendarData = () => {
    const year = 2026;
    const month = 1; // February (0-indexed)
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    const now = new Date();
    
    const days = [];
    // Empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    // Days of the month with lunar dates
    for (let day = 1; day <= daysInMonth; day++) {
      const lunar = solarToLunar(day, month + 1, year);
      days.push({
        solar: day,
        lunar: lunar[0],
        lunarMonth: lunar[1]
      });
    }
    
    return { 
      year, 
      month, 
      days, 
      currentDay: now.getFullYear() === year && now.getMonth() === month ? now.getDate() : null 
    };
  };

  const calendarData = getCalendarData();
  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", 
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

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
          <div className="main-heading" data-testid="main-heading">{holidays[selectedHoliday].heading}</div>
          <h1 data-testid="main-title">{holidays[selectedHoliday].title}</h1>
          <p data-testid="subtitle">{holidays[selectedHoliday].subtitle}</p>
          <div className="realtime-clock" data-testid="realtime-clock">
            {currentDateInfo.hours}:{currentDateInfo.minutes}:{currentDateInfo.seconds} {currentDateInfo.period}
          </div>
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

        {/* Music Player / Calendar Container */}
        <div 
          className="music-player" 
          data-testid="music-player"
          ref={playerContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Tab Bar */}
          <div className="tab-bar">
            <button 
              className={`tab-btn ${activeTab === "music" ? "active" : ""}`}
              onClick={() => setActiveTab("music")}
            >
              Âm nhạc
            </button>
            <button 
              className={`tab-btn ${activeTab === "calendar" ? "active" : ""}`}
              onClick={() => setActiveTab("calendar")}
            >
              Lịch Tết
            </button>
          </div>

          {/* Music Player View */}
          {activeTab === "music" && (
            <div className="tab-content music-content">
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
            </div>
          )}

          {/* Calendar View */}
          {activeTab === "calendar" && (
            <div className="tab-content calendar-content">
              <div className="calendar-header">
                <h3>{monthNames[calendarData.month]} {calendarData.year}</h3>
              </div>
              <div className="calendar-grid">
                <div className="calendar-weekdays">
                  {weekDays.map((day, index) => (
                    <div key={index} className="calendar-weekday">
                      {day}
                    </div>
                  ))}
                </div>
                 <div className="calendar-days">
                   {calendarData.days.map((day, index) => {
                     const isTetPeriod = day && day.solar >= 12 && day.solar <= 22;
                     const isTetDay = day && day.solar === 17;
                     return (
                       <div 
                         key={index} 
                         className={`calendar-day ${day && day.solar === calendarData.currentDay ? 'current' : ''} ${!day ? 'empty' : ''} ${isTetPeriod ? 'tet-period' : ''} ${isTetDay ? 'tet-day' : ''}`}
                       >
                         {day && (
                           <>
                             <div className="solar-date">{day.solar}</div>
                             <div className="lunar-date">{day.lunar}/{day.lunarMonth}</div>
                           </>
                         )}
                       </div>
                     );
                   })}
                 </div>
              </div>
            </div>
          )}

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
          <p>neyuT_03 🇻🇳</p>
        </div>
      </div>
    </div>
  );
}

export default App;
