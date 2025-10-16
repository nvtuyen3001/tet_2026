# Web Application với React Frontend và FastAPI Backend

Đây là một ứng dụng web full-stack với React frontend và FastAPI backend, sử dụng MongoDB làm database.

## 🚀 Cấu trúc dự án

```
├── backend/                 # FastAPI backend
│   ├── server.py           # Main server file
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/               # Source code
│   ├── public/            # Public assets
│   ├── package.json       # Node.js dependencies
│   └── tailwind.config.js # Tailwind CSS config
└── tests/                 # Test files
```

## 🛠️ Công nghệ sử dụng

### Backend
- **FastAPI**: Web framework hiện đại cho Python
- **MongoDB**: NoSQL database
- **Motor**: Async MongoDB driver
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

### Frontend
- **React**: JavaScript library cho UI
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Create React App**: Build tool

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống
- Python 3.8+
- Node.js 16+
- MongoDB

### Backend Setup

1. Di chuyển vào thư mục backend:
```bash
cd backend
```

2. Tạo virtual environment:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. Cài đặt dependencies:
```bash
pip install -r requirements.txt
```

4. Tạo file `.env` trong thư mục backend:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=your_database_name
CORS_ORIGINS=http://localhost:3000
```

5. Chạy server:
```bash
uvicorn server:app --reload
```

Backend sẽ chạy tại: `http://localhost:8000`

### Frontend Setup

1. Di chuyển vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm start
```

Frontend sẽ chạy tại: `http://localhost:3000`

## 🔧 API Endpoints

### Base URL: `http://localhost:8000/api`

- `GET /` - Health check
- `POST /status` - Tạo status check mới
- `GET /status` - Lấy danh sách status checks
- `GET /user-info` - Lấy thông tin IP và ISP của user

## 🚀 Deploy

### GitHub Pages
1. Build frontend:
```bash
cd frontend
npm run build
```

2. Deploy thư mục `build` lên GitHub Pages

### Heroku
1. Tạo `Procfile` trong root:
```
web: uvicorn backend.server:app --host 0.0.0.0 --port $PORT
```

2. Deploy lên Heroku

### VPS/Domain
1. Setup Nginx reverse proxy
2. Deploy backend với Gunicorn
3. Serve frontend build files với Nginx

## 📝 Scripts

### Backend
```bash
# Chạy server development
uvicorn server:app --reload

# Chạy server production
uvicorn server:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Development
npm start

# Build production
npm run build

# Test
npm test
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

Project Link: [https://github.com/your-username/your-project](https://github.com/your-username/your-project)
