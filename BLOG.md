# Quản lý blog bằng Markdown

Menu **Blog** trên website dẫn đến `/blog/` (tiếng Việt) hoặc `/en/blog/`
(tiếng Anh). Mỗi bài có trang riêng `/blog/ten-bai/`. Các URL `/posts/` cũ
vẫn hoạt động; cả hai cùng đọc một nguồn nội dung, không cần sao chép file.

## Thêm bài

1. Mở Blog → **Quản lý blog** → **Thêm bài viết**.
2. Đăng nhập GitHub bằng tài khoản có quyền ghi `CISTILY/CISTILY.github.io`.
3. Đặt tên file, ví dụ `ghi-chep-nghien-cuu.md`. Mẫu Markdown đã được điền sẵn.
4. Điền `title`, `summary`, nội dung và ngày `date: "YYYY-MM-DD"` (hoặc để trống).
5. Đặt `published: true` để xuất bản; giữ `false` để lưu bản nháp.
6. Chọn **Commit changes** vào `main`, hoặc tạo pull request rồi merge vào `main`.
7. Chờ workflow **Deploy portfolio** hoàn thành. Nếu thất bại, xem lỗi ở GitHub Actions;
   website vẫn giữ phiên bản triển khai thành công trước đó.

## Sửa và xóa

- Mở một bài → **Quản lý blog** → **Sửa bài viết**, sửa Markdown rồi commit.
- Chọn **Xóa bài viết** để mở màn hình xóa trên GitHub. Chỉ khi xác nhận commit
  việc xóa mới được lưu. Sau triển khai, URL bài đã xóa trả về trang 404;
  hãy sửa các liên kết nội bộ trỏ tới bài đó để bước kiểm tra build không thất bại.
- **Tất cả file & bản nháp** mở thư mục nguồn, bao gồm bài chưa xuất bản.
- Có thể ẩn bài bằng `published: false` thay vì xóa file.

Nguồn tiếng Việt: `content/vi/posts/*.md`; tiếng Anh: `content/en/posts/*.md`.
Hai bản dịch dùng cùng tên file để nút đổi ngôn ngữ mở đúng bài. Mỗi bản được
thêm/sửa/xóa độc lập. File `_template.md` không được hiển thị trong blog.
Không đặt thông tin bí mật trong bản nháp: `published: false` chỉ ẩn trên website,
file vẫn có thể được đọc trong repository công khai.

Các nút quản lý mở GitHub trong tab mới; website không lưu token hay mật khẩu.
GitHub kiểm soát quyền ghi và xác nhận commit/xóa. Đây là quản lý qua trình sửa
Markdown của GitHub, không phải trình soạn thảo lưu trực tiếp trong website.

## Làm việc trên máy

```sh
npm run new:post -- ten-bai-viet
# Sửa file Markdown được tạo, đặt published: true khi sẵn sàng.
npm run test:content
npm run build
```

Commit và push lên `main` để GitHub Pages cập nhật. Bản Sites, nếu dùng, cần
triển khai riêng. Khi chuyển repository hoặc nhánh, cập nhật `lib/blog.ts`.
