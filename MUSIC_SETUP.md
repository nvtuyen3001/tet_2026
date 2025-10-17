# 🎵 Hướng dẫn cài đặt File Nhạc Local

## 📁 Cấu trúc Thư mục

Tạo cấu trúc thư mục sau trong `frontend/public/`:

```
frontend/public/
├── background_tet.png          # Background Tết Âm Lịch
├── background_tet2.jpg         # Background Tết Dương Lịch
├── background_noel.jpg         # Background Noel
├── tuyen.jpg                   # Avatar
└── music/
    ├── tet/                    # Nhạc Tết
    │   ├── tet-binh-an.mp3
    │   ├── xuan-da-ve.mp3
    │   ├── ngay-tet-que-em.mp3
    │   ├── tet-nay-con-se-ve.mp3
    │   └── di-ve-nha.mp3
    ├── christmas/              # Nhạc Noel
    │   ├── merry-christmas.mp3
    │   ├── last-christmas.mp3
    │   ├── all-i-want.mp3
    │   ├── santa-tell-me.mp3
    │   └── jingle-bells.mp3
    └── thumbnails/             # Ảnh bìa nhạc
        ├── tet1.jpg
        ├── tet2.jpg
        ├── tet3.jpg
        ├── tet4.jpg
        ├── tet5.jpg
        ├── christmas1.jpg
        ├── christmas2.jpg
        ├── christmas3.jpg
        ├── christmas4.jpg
        └── christmas5.jpg
```

## 🎨 Background Images

### 1. Background Tết Âm Lịch
- File: `background_tet.png`
- Hiển thị khi: Chọn "Tết Âm Lịch"

### 2. Background Tết Dương Lịch
- File: `background_tet2.jpg`
- Hiển thị khi: Chọn "Tết Dương Lịch"

### 3. Background Noel
- File: `background_noel.jpg`
- Hiển thị khi: Chọn "Noel"

## 🎵 File Nhạc

### Định dạng được hỗ trợ:
- MP3 (khuyến nghị)
- OGG
- WAV

### Kích thước khuyến nghị:
- Audio: 3-6 MB mỗi file (quality 192-320 kbps)
- Thumbnail: < 200 KB mỗi ảnh

## 🔄 Thêm Nhạc Mới

### 1. Thêm file vào thư mục phù hợp
```bash
# Ví dụ thêm nhạc Tết
cp your-song.mp3 frontend/public/music/tet/

# Thêm thumbnail
cp thumbnail.jpg frontend/public/music/thumbnails/tet6.jpg
```

### 2. Cập nhật playlist trong `frontend/src/App.js`

**Thêm vào tetPlaylist:**
```javascript
const tetPlaylist = [
  // ... các bài hiện có
  {
    id: 6,
    title: "Tên Bài Hát Mới",
    artist: "Tên Nghệ Sĩ",
    thumbnail: "/music/thumbnails/tet6.jpg",
    audio: "/music/tet/ten-bai-hat-moi.mp3"
  }
];
```

**Thêm vào christmasPlaylist:**
```javascript
const christmasPlaylist = [
  // ... các bài hiện có
  {
    id: 6,
    title: "Tên Bài Noel Mới",
    artist: "Tên Nghệ Sĩ",
    thumbnail: "/music/thumbnails/christmas6.jpg",
    audio: "/music/christmas/bai-noel-moi.mp3"
  }
];
```

## 📥 Tải Nhạc

### Nguồn nhạc miễn phí:
1. **YouTube to MP3**: Sử dụng các công cụ convert hợp pháp
2. **NhacCuaTui**: Tải nhạc Việt Nam
3. **Free Music Archive**: Nhạc miễn phí bản quyền
4. **Pixabay Music**: Nhạc nền miễn phí

### Lưu ý Bản quyền:
⚠️ Chỉ sử dụng nhạc có bản quyền hoặc miễn phí thương mại
⚠️ Đảm bảo tuân thủ luật bản quyền tại quốc gia bạn

## 🎨 Tạo Thumbnail

### Kích thước khuyến nghị:
- 480 x 360 px (4:3 ratio)
- Format: JPG hoặc PNG
- Kích thước file: < 200 KB

### Tool miễn phí:
- Canva
- Photopea
- GIMP

## ✅ Kiểm tra

Sau khi thêm file, kiểm tra:
1. File âm thanh phát được trong browser
2. Thumbnail hiển thị đúng
3. Đường dẫn file chính xác (phân biệt HOA/thường)

## 🚀 Deploy

### Khi deploy lên Netlify/Render:
1. Commit tất cả file nhạc và hình ảnh
2. Push lên GitHub
3. Netlify/Render sẽ tự động copy các file trong `public/` vào build

### Lưu ý:
- File lớn (> 10MB) có thể làm chậm build time
- Nén audio ở 192kbps để cân bằng chất lượng và dung lượng
- Tối ưu hóa hình ảnh trước khi upload

## 🎯 Tối ưu Performance

### 1. Lazy Loading
- Chỉ load audio khi cần thiết (đã implement)
- Preload="metadata" để giảm bandwidth

### 2. CDN (Optional)
Có thể upload nhạc lên CDN như:
- Cloudinary
- AWS S3
- Google Cloud Storage

Sau đó update đường dẫn trong playlist:
```javascript
audio: "https://your-cdn.com/music/tet/song.mp3"
```

## 📞 Support

Nếu có vấn đề về nhạc không phát:
1. Kiểm tra Console log trong DevTools
2. Verify đường dẫn file trong Network tab
3. Test file audio trực tiếp trong browser
4. Kiểm tra format file được hỗ trợ
