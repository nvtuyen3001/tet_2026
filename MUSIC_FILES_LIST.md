# 📋 Danh Sách File Nhạc

## 📁 Cấu trúc thư mục
```
frontend/public/music/
├── tet/           (18 bài)
└── christmas/     (6 bài)
```

## 🎵 Nhạc Tết (18 bài)

Đường dẫn: `frontend/public/music/tet/`

| STT | Tên bài hát | Tên file |
|-----|-------------|----------|
| 1 | Tết Bình An (Đại Mèo Remix) | `tetbinhan.mp3` |
| 2 | Xuân Đã Về | `xuandave.mp3` |
| 3 | Ngày Tết Quê Em | `ngaytetqueem.mp3` |
| 4 | Tết Này Con Sẽ Về | `tetnayconseve.mp3` |
| 5 | Đi Về Nhà | `divenha.mp3` |
| 6 | Năm Qua Tôi Đã Làm Gì | `namquatoidalamgi.mp3` |
| 7 | Đi Để Trở Về | `didetrave.mp3` |
| 8 | Tết Tết Tết Tết Đến Rồi | `tettettettetdenroi.mp3` |
| 9 | Như Hoa Mùa Xuân | `nhuhoamuaxuan.mp3` |
| 10 | Ngày Xuân Lòng Phụng Sụm Vay | `ngayxuanlongphungsumvay.mp3` |
| 11 | Tết Là Tết | `tetlatet.mp3` |
| 12 | Chuyện Cũ Bỏ Qua | `chuyencuboqua.mp3` |
| 13 | Mùa Xuân Ơi | `muaxuanoi.mp3` |
| 14 | Đoàn Xuân Ca | `doanxuanca.mp3` |
| 15 | Phố Xuân | `phoxuan.mp3` |
| 16 | Con Bướm Xuân | `conbuomxuan.mp3` |
| 17 | Xuân Phát Tài | `xuanphattai.mp3` |
| 18 | Cái Tết Giàu | `caitetgiau.mp3` |

## 🎄 Nhạc Noel (6 bài)

Đường dẫn: `frontend/public/music/christmas/`

| STT | Tên bài hát | Tên file |
|-----|-------------|----------|
| 1 | Merry Christmas Mr Lawrence | `merrychristmasmrlawrence.mp3` |
| 2 | Last Christmas | `lastchristmas.mp3` |
| 3 | All I Want For Christmas Is You | `alliwantforchristmasisyou.mp3` |
| 4 | Santa Tell Me | `santatellme.mp3` |
| 5 | Mistletoe | `mistletoe.mp3` |
| 6 | Sleigh Ride | `sleighride.mp3` |

## ✅ Checklist

### Nhạc Tết
- [ ] tetbinhan.mp3
- [ ] xuandave.mp3
- [ ] ngaytetqueem.mp3
- [ ] tetnayconseve.mp3
- [ ] divenha.mp3
- [ ] namquatoidalamgi.mp3
- [ ] didetrave.mp3
- [ ] tettettettetdenroi.mp3
- [ ] nhuhoamuaxuan.mp3
- [ ] ngayxuanlongphungsumvay.mp3
- [ ] tetlatet.mp3
- [ ] chuyencuboqua.mp3
- [ ] muaxuanoi.mp3
- [ ] doanxuanca.mp3
- [ ] phoxuan.mp3
- [ ] conbuomxuan.mp3
- [ ] xuanphattai.mp3
- [ ] caitetgiau.mp3

### Nhạc Noel
- [ ] merrychristmasmrlawrence.mp3
- [ ] lastchristmas.mp3
- [ ] alliwantforchristmasisyou.mp3
- [ ] santatellme.mp3
- [ ] mistletoe.mp3
- [ ] sleighride.mp3

## 🎨 Background Images

### Đã có:
- ✅ `background_tet.png` - Background Tết Âm Lịch

### Cần thêm:
- ⏳ `background_tet2.jpg` - Background Tết Dương Lịch
- ⏳ `background_noel.jpg` - Background Noel

## 🔧 Kiểm tra File

Chạy lệnh sau để kiểm tra file trong thư mục:

### Windows (PowerShell):
```powershell
# Kiểm tra nhạc Tết
Get-ChildItem frontend\public\music\tet\*.mp3 | Select-Object Name

# Kiểm tra nhạc Noel
Get-ChildItem frontend\public\music\christmas\*.mp3 | Select-Object Name
```

### Mac/Linux (Terminal):
```bash
# Kiểm tra nhạc Tết
ls frontend/public/music/tet/*.mp3

# Kiểm tra nhạc Noel
ls frontend/public/music/christmas/*.mp3
```

## 📝 Lưu ý

1. **Tên file**: 
   - Viết thường toàn bộ
   - Không dấu
   - Không khoảng trắng
   - Không ký tự đặc biệt

2. **Định dạng**: 
   - MP3 (khuyến nghị)
   - Bitrate: 192-320 kbps

3. **Kích thước**:
   - Mỗi file: 3-6 MB
   - Tổng dung lượng: ~100-150 MB

4. **Thumbnail**:
   - Đang sử dụng YouTube thumbnail (không cần file local)
   - Load từ `https://img.youtube.com/vi/{video_id}/hqdefault.jpg`
