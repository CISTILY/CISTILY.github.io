# CISTILY — Portfolio & Blog

Website cá nhân tiếng Việt, dùng React + TypeScript, xuất thành website tĩnh để chạy trên GitHub Pages hoặc Sites. Có giới thiệu, định hướng, học vấn, project và bài viết; hỗ trợ điện thoại, bàn phím và chế độ giảm chuyển động.

## Chọn project để đưa lên

Mở `content/portfolio.ts`, tìm danh sách `projects`:

- Đặt `published: true` để hiển thị project.
- Đặt `published: false` để ẩn project.
- Kéo/di chuyển nguyên mục lên xuống trong mảng để đổi thứ tự.
- Sao chép một mục để thêm project. Đặt `id` riêng, thay tiêu đề, mô tả, tags, các đoạn `content` và `url` (repository hoặc demo).
- Xóa `example: true` sau khi thay nội dung mẫu bằng project thật.

```ts
{
  id: 'ten-project',
  published: true,
  title: 'Tên project của bạn',
  category: 'WEB DEVELOPMENT',
  coverLabel: 'my project_',
  description: 'Project giải quyết vấn đề gì?',
  tags: ['Python', 'React'],
  content: [
    'Bối cảnh và mục tiêu của project.',
    'Vai trò, cách thực hiện và kết quả của bạn.',
  ],
  url: 'https://github.com/CISTILY/ten-repository',
},
```

Đây là cách chọn bằng tệp nội dung, chưa có trang quản trị trực tuyến. Thay đổi có hiệu lực sau khi xây dựng và triển khai lại. `published: false` chỉ ẩn khỏi giao diện, không phải cơ chế bảo mật: không lưu bí mật hoặc nội dung nhạy cảm vào mã nguồn.

## Thông tin cá nhân và blog

Cùng trong `content/portfolio.ts`:

- `profile`: tên, giới thiệu, định hướng, sở thích, GitHub, email và danh sách học vấn.
- `posts`: thêm bài viết bằng các đoạn trong `content`; dùng `published` để bật/tắt và sắp xếp mảng để đổi thứ tự.
- Để `email` trống thì nút kết nối dẫn tới GitHub.

Tên CISTILY và GitHub lấy theo repo hiện tại. Giới thiệu/định hướng là nội dung khởi đầu; trường, chuyên ngành, project mẫu và bài mẫu cần thay bằng thông tin thực tế trước khi công khai.

## Chạy và kiểm tra

Yêu cầu Node.js 22.13+.

```sh
npm ci
npm run dev
npm run build
npx tsc --noEmit --incremental false
```

Lệnh chạy thử in địa chỉ xem website. Bản xuất nằm trong `dist/client`. `scripts/build.mjs` cho Windows đóng các worker tự nhiên sau build thành công để tránh lỗi libuv của CLI; các lỗi build vẫn trả mã lỗi như bình thường.

## GitHub Pages

Repo đã có workflow `.github/workflows/deploy.yml`. Trong GitHub, vào **Settings → Pages → Source → GitHub Actions**. Sau khi đẩy thay đổi lên nhánh `main`, workflow sẽ kiểm tra TypeScript, build và triển khai. Có thể chạy bằng **Actions → Deploy portfolio → Run workflow**.

Workflow dành cho website gốc `CISTILY.github.io`; đổi sang repo con cần bổ sung cấu hình đường dẫn nền. Việc tạo workflow ở đây chưa đẩy mã hoặc bật Pages trên GitHub.

## Cấu trúc

- `app/page.tsx`: bố cục trang.
- `app/globals.css`: màu sắc, khoảng cách và giao diện điện thoại.
- `components/reading-card.tsx`: cửa sổ đọc project/bài viết.
- `content/portfolio.ts`: toàn bộ nội dung có thể chỉnh sửa.

Blog hiện đọc trong cửa sổ trên trang chủ, chưa có URL riêng cho từng bài hay trình soạn thảo trực tuyến.
