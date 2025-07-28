Template này được lấy từ tác giả hỏi dân IT

# 🐔 Chicken29 - Ứng dụng đặt đồ ăn trực tuyến

**Chicken29** là một ứng dụng web đặt đồ ăn nhanh được xây dựng bằng **Next.js**, **Material UI**, và **NextAuth**. Người dùng có thể đăng nhập, đặt hàng, thanh toán trực tuyến qua VNPay, trong khi quản trị viên có thể quản lý sản phẩm và đơn hàng.

---

## 🚀 Tính năng nổi bật

### 👥 Người dùng
- ✅ Đăng nhập bằng Google (NextAuth)
- 🛒 Thêm món vào giỏ hàng và đặt hàng
- 💳 Thanh toán qua VNPay
- 📦 Xem lịch sử đơn hàng

### 🛠️ Quản trị viên (Admin)
- 📌 Đăng nhập vào khu vực quản trị
- 🧾 Tạo, chỉnh sửa, xoá sản phẩm
- 🖼️ Upload ảnh sản phẩm (React Dropzone)
- 🔄 Quản lý đơn hàng và cập nhật trạng thái

---

## 🧑‍💻 Công nghệ sử dụng

| Công nghệ       | Vai trò                            |
| --------------- | ---------------------------------- |
| **Next.js 13**  | Framework React hỗ trợ SSR         |
| **React 18**    | Thư viện xây dựng UI               |
| **Material-UI** | Giao diện người dùng hiện đại      |
| **Emotion**     | Styled-components cho MUI          |
| **NextAuth.js** | Xác thực người dùng (Google OAuth) |
| **Axios**       | Giao tiếp với API backend          |
| **VNPay**       | Cổng thanh toán trực tuyến         |
| **TypeScript**  | Tăng độ an toàn và dễ bảo trì      |
| **Day.js**      | Xử lý thời gian, định dạng ngày    |

---

## 📦 Cài đặt và khởi động dự án

```bash
# Cài dependencies
npm install

# Hoặc nếu dùng Yarn
yarn install

# Chạy server dev
npm run dev

