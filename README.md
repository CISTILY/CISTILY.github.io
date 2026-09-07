# CISTILY — Academic personal website

Website cá nhân lấy cảm hứng bố cục từ [lexi-jones.github.io](https://lexi-jones.github.io): hồ sơ bên trái, nội dung bên phải, menu **About · Research · Gallery · Posts**. Nội dung và hình ảnh cá nhân của website tham khảo không được sao chép.

## Tự cập nhật mà không sửa code giao diện

| Nội dung | File/thư mục cần sửa |
| --- | --- |
| Tên, ảnh đại diện, chức danh, nơi làm việc, liên kết | [`content/site.json`](content/site.json) |
| Research Interests | [`content/about/research-interests.md`](content/about/research-interests.md) |
| Background và học vấn | [`content/about/background.md`](content/about/background.md) |
| Contact | [`content/about/contact.md`](content/about/contact.md) |
| Research / dự án | [`content/research/`](content/research/) |
| Gallery / album ảnh | [`content/gallery/`](content/gallery/) |
| Posts / blog | [`content/posts/`](content/posts/) |
| Ảnh, CV hoặc tài liệu | [`public/images/`](public/images/), [`public/files/`](public/files/) |

**Mỗi file Markdown là một card và một trang chi tiết.** Sao chép `_template.md` trong thư mục tương ứng, đổi tên, điền nội dung rồi đặt `published: true`. Không cần khai báo thêm route hay sửa danh sách trong TypeScript.

Xem [CUSTOMIZATION.md — hướng dẫn đầy đủ và ví dụ điền sẵn](CUSTOMIZATION.md).

## Chạy website

Yêu cầu Node.js 22.13+.

```sh
npm ci
npm run dev
```

Mở địa chỉ được in ra. Chỉnh Markdown rồi lưu; bản xem thử tự tải lại khi thêm, sửa hoặc xóa file.

Có thể tạo bản nháp từ mẫu bằng lệnh tùy chọn:

```sh
npm run new:research -- ten-de-tai
npm run new:gallery -- ten-album
npm run new:post -- ten-bai-viet
```

## Kiểm tra và xuất website

```sh
npx tsc --noEmit --incremental false
npm run test:content
npm run build
```

`npm run build` tự chạy bước `postbuild`. Bản tĩnh hoàn chỉnh nằm trong `dist/client`, gồm trang chủ, ba trang danh sách, các trang chi tiết được xuất bản và trang 404. Bước hoàn tất kiểm tra tài nguyên/đường dẫn nội bộ và tạo các file `index.html` để mở trực tiếp URL thư mục trên GitHub Pages.

Script build giữ giải pháp đóng worker tự nhiên trên Windows; lỗi build vẫn làm quy trình thất bại. Cấu hình `trailingSlash: false` tránh lỗi chuyển hướng của trình xuất route động; bước `postbuild` bổ sung URL dạng `/posts/ten-bai/` cho static hosting.

## Triển khai

Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) kiểm tra TypeScript, nội dung, build và triển khai GitHub Pages khi đẩy lên `main` hoặc chạy thủ công. Repo cần được cấu hình Pages sử dụng GitHub Actions. Mỗi lần thêm Markdown hoặc ảnh, workflow sẽ tạo lại website; không đẩy `dist` lên Git.

Bản Sites được cập nhật bằng một lần lưu và triển khai phiên bản mới riêng. Đẩy lên GitHub không tự cập nhật Sites.

## Cấu trúc giao diện

- `app/layout.tsx`: khung chung, thanh menu, hồ sơ, footer.
- `app/page.tsx`: About.
- `app/[collection]/page.tsx`: trang danh sách Research, Gallery, Posts.
- `app/[collection]/[slug]/page.tsx`: trang chi tiết tự sinh từ Markdown.
- `components/entry-card.tsx`: card tóm tắt.
- `lib/content.ts`: đọc, kiểm tra và hiển thị nội dung Markdown.
- `app/globals.css`: màu sắc, typography, bố cục desktop/mobile.

Thông tin Research Interests, Background và Contact được để chờ bạn điền. Các mục mẫu có nhãn rõ ràng. Dữ liệu phiên bản trước được giữ trong `content/legacy/portfolio.ts` để tham khảo, **không còn được website đọc**.
