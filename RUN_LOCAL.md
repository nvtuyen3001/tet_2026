# Hướng dẫn chạy localhost

## Yêu cầu
- Python 3.8+
- Node.js 14+
- MongoDB (nếu cần database)

## Cách chạy

### Terminal 1 - Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Backend: http://localhost:8000

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm start
```

Frontend: http://localhost:3000

## Lưu ý
- File `.env.local` trong frontend đã config sẵn backend URL
- File `.env` trong backend đã config sẵn MongoDB và CORS
- Mỗi lần sửa code sẽ tự động reload (không cần restart)
- Chỉ cần deploy khi đã test xong trên localhost

## Troubleshooting
- Nếu port 3000 hoặc 8000 bị chiếm: đổi port khác
- Nếu không có MongoDB: backend vẫn chạy nhưng API database sẽ lỗi

