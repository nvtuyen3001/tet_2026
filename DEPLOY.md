# 🚀 Hướng dẫn Deploy Ứng dụng Tết 2026

## 📋 Tổng quan
Ứng dụng được chia thành 2 phần:
- **Backend**: Deploy trên Render (Python FastAPI)
- **Frontend**: Deploy trên Netlify (React)

## 🔧 Chuẩn bị trước khi deploy

### 1. MongoDB Atlas
- Tạo tài khoản MongoDB Atlas (miễn phí)
- Tạo cluster mới
- Lấy connection string
- Cập nhật `MONGO_URL` trong render.yaml

### 2. GitHub Repository
- Push code lên GitHub repository
- Đảm bảo có file `render.yaml` và `netlify.toml`

## 🖥️ Deploy Backend trên Render

### Bước 1: Tạo Web Service
1. Đăng nhập vào [Render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Chọn branch `main`

### Bước 2: Cấu hình Service
```yaml
Name: tet-2026-backend
Environment: Python
Region: Singapore
Branch: main
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
```

### Bước 3: Environment Variables
Thêm các biến môi trường:
```
MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/tet_2026?retryWrites=true&w=majority
DB_NAME=tet_2026
CORS_ORIGINS=https://tet-2026.netlify.app,http://localhost:3000
```

### Bước 4: Deploy
- Click "Create Web Service"
- Đợi quá trình build và deploy hoàn thành
- Lưu lại URL backend (ví dụ: `https://tet-2026-backend.onrender.com`)

## 🌐 Deploy Frontend trên Netlify

### Bước 1: Tạo Site
1. Đăng nhập vào [Netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Chọn branch `main`

### Bước 2: Cấu hình Build
```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/build
```

### Bước 3: Environment Variables
Thêm biến môi trường:
```
REACT_APP_API_URL=https://tet-2026-backend.onrender.com
```

### Bước 4: Deploy
- Click "Deploy site"
- Đợi quá trình build hoàn thành
- Lưu lại URL frontend (ví dụ: `https://tet-2026.netlify.app`)

## 🔄 Cập nhật CORS
Sau khi có URL frontend, cập nhật lại `CORS_ORIGINS` trong Render:
```
CORS_ORIGINS=https://your-actual-netlify-url.netlify.app,http://localhost:3000
```

## ✅ Kiểm tra Deploy

### Backend Health Check
```bash
curl https://tet-2026-backend.onrender.com/api/
# Response: {"message": "Hello World"}
```

### Frontend
- Truy cập URL Netlify
- Kiểm tra countdown timer hoạt động
- Kiểm tra music player có thể phát nhạc
- Kiểm tra responsive trên mobile

## 🐛 Troubleshooting

### Backend Issues
- Kiểm tra logs trên Render Dashboard
- Đảm bảo MongoDB connection string đúng
- Kiểm tra CORS settings

### Frontend Issues
- Kiểm tra build logs trên Netlify
- Đảm bảo `REACT_APP_API_URL` đúng
- Kiểm tra Network tab trong DevTools

### Mobile Audio Issues
- Đảm bảo user interaction trước khi play
- Kiểm tra `playsinline` attribute
- Test trên nhiều device khác nhau

## 📱 Features
- ✅ Countdown timer cho Tết 2026
- ✅ Music player với YouTube integration
- ✅ Progress bar và seek functionality
- ✅ Mobile responsive
- ✅ Touch support cho mobile
- ✅ Holiday menu (Tết, Noel, Năm mới)

## 🎯 URLs
- **Frontend**: https://tet-2026.netlify.app
- **Backend**: https://tet-2026-backend.onrender.com
- **API Docs**: https://tet-2026-backend.onrender.com/docs
