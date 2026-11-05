# Blog trên GitHub Pages

Blog nằm tại `/blog/` và `/en/blog/`, truy cập từ menu **Blog** của website cá nhân.
Các URL `/posts/` trước đây vẫn hoạt động và dùng chung nguồn Markdown.

## Dành cho người đọc

- Danh sách một cột: tiêu đề liên kết trực tiếp đến bài, tóm tắt, ngày đăng, thời gian đọc và chủ đề.
- Tìm theo tiêu đề, tóm tắt hoặc chủ đề; hỗ trợ tiếng Việt không dấu.
- Lọc theo chủ đề bằng các nút phía trên hoặc nhãn chủ đề của mỗi bài.
- Sắp xếp mới nhất, cũ nhất hoặc tiêu đề A–Z. Bài chưa có ngày nằm cuối khi sắp xếp theo ngày.
- Hiển thị số kết quả và nút đặt lại bộ lọc khi cần.
- Không có chức năng thêm/sửa/xóa trên giao diện blog.

## Cập nhật nội dung

Sửa file Markdown trong `content/vi/posts/` (tiếng Việt) hoặc `content/en/posts/`
(tiếng Anh), sau đó commit/push lên `main`. Workflow GitHub Pages sẽ kiểm tra
và triển khai. Không cần Vercel, Supabase hoặc cơ sở dữ liệu.

Tạo bài bằng `npm run new:post -- ten-bai`, hoặc sao chép `_template.md`.
Điền `title`, `summary`, `tags`, `date: "YYYY-MM-DD"` và đặt `published: true`.
Ngày có thể để trống; giao diện sẽ hiển thị “Chưa ghi ngày”. `order` vẫn dùng
cho các collection khác; danh sách blog sắp xếp theo lựa chọn của người đọc.

Bản nháp (`published: false`) và `_template.md` không xuất hiện trên website.
Mỗi bản dịch dùng cùng tên file để chuyển đổi ngôn ngữ đúng bài. Xóa file
Markdown để gỡ bài, đồng thời cập nhật các liên kết nội bộ đang trỏ đến bài đó.

```sh
npx tsc --noEmit --incremental false
npm run test:content
npm run build
```

Kết quả tĩnh nằm trong `dist/client`; tìm kiếm và bộ lọc chạy trong trình duyệt.
Các liên kết và danh sách ban đầu có trong HTML xuất sẵn; tương tác lọc cần JavaScript.
