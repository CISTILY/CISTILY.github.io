# CISTILY — Academic personal website

Website cá nhân lấy cảm hứng bố cục từ [lexi-jones.github.io](https://lexi-jones.github.io): hồ sơ bên trái, nội dung bên phải, menu **About · Research · Gallery · Posts**. Nội dung và hình ảnh cá nhân của website tham khảo không được sao chép.

## Tự cập nhật mà không sửa code giao diện

Website hỗ trợ **VI / EN**: bản Việt ở `/`, bản Anh ở `/en/`. Xem [BILINGUAL.md](BILINGUAL.md) để chỉnh hồ sơ, nhãn giao diện và các cặp Markdown theo ngôn ngữ. Các đường dẫn nội dung bên dưới là bản Việt; bản Anh nằm trong `content/en/` với cùng cấu trúc.

| Nội dung | File/thư mục cần sửa |
| --- | --- |
| Tên, ảnh đại diện, chức danh, nơi làm việc, liên kết | [`content/vi/site.json`](content/vi/site.json) |
| Research Interests | [`content/vi/about/research-interests.md`](content/vi/about/research-interests.md) |
| Background và học vấn | [`content/vi/about/background.md`](content/vi/about/background.md) |
| Research / dự án | [`content/vi/research/`](content/vi/research/) |
| Gallery / album ảnh | [`content/vi/gallery/`](content/vi/gallery/) |
| Posts / blog | [`content/vi/posts/`](content/vi/posts/) |
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

- `components/site-document.tsx`: khung chung và HTML theo ngôn ngữ.
- `components/content-pages.tsx`: giao diện About, danh sách và trang chi tiết.
- `app/(vi)/`: các route tiếng Việt, giữ URL hiện tại.
- `app/(en)/en/`: các route tiếng Anh dưới `/en/`.
- `content/vi/ui.json`, `content/en/ui.json`: nhãn giao diện có thể chỉnh sửa.
- `components/entry-card.tsx`: card tóm tắt.
- `lib/content.ts`: đọc, kiểm tra và hiển thị nội dung Markdown.
- `app/globals.css`: màu sắc, typography, bố cục desktop/mobile.

Bạn có thể điền Research Interests và Background; thông tin liên hệ nằm trong hồ sơ ở thanh bên. Các mục mẫu có nhãn rõ ràng. Dữ liệu phiên bản trước được giữ trong `content/legacy/portfolio.ts` để tham khảo, **không còn được website đọc**.
