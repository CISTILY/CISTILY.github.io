# Hướng dẫn tùy chỉnh hai phiên bản Việt – Anh

Website có nút **VI / EN** trên thanh điều hướng. Hai phiên bản dùng chung giao diện nhưng có nội dung riêng; bạn có thể chỉnh sửa và xuất bản từng ngôn ngữ độc lập.

## 1. Nội dung của mỗi phiên bản nằm ở đâu?

Nội dung tiếng Việt nằm trong `content/vi/`, tiếng Anh trong `content/en/`. Hai thư mục có cùng cấu trúc: `site.json`, `ui.json`, `about/`, `research/`, `gallery/`, `posts/`.

| Phần cần chỉnh | Tiếng Việt | English |
| --- | --- | --- |
| Hồ sơ, liên hệ, ảnh đại diện, CV, mô tả trang | [`content/vi/site.json`](content/vi/site.json) | [`content/en/site.json`](content/en/site.json) |
| Nhãn menu, nút, thông báo, tiêu đề các phần About | [`content/vi/ui.json`](content/vi/ui.json) | [`content/en/ui.json`](content/en/ui.json) |
| Hướng nghiên cứu | [`content/vi/about/research-interests.md`](content/vi/about/research-interests.md) | [`content/en/about/research-interests.md`](content/en/about/research-interests.md) |
| Học vấn và kinh nghiệm | [`content/vi/about/background.md`](content/vi/about/background.md) | [`content/en/about/background.md`](content/en/about/background.md) |
| Nghiên cứu và dự án | [`content/vi/research/`](content/vi/research/) | [`content/en/research/`](content/en/research/) |
| Album ảnh | [`content/vi/gallery/`](content/vi/gallery/) | [`content/en/gallery/`](content/en/gallery/) |
| Bài viết | [`content/vi/posts/`](content/vi/posts/) | [`content/en/posts/`](content/en/posts/) |

Ảnh và tài liệu vẫn dùng chung thư mục `public/images/` và `public/files/`. Hai bản có thể trỏ đến cùng ảnh hoặc dùng ảnh/CV khác nhau. `alt`, chú thích ảnh, tên thẻ và nội dung đều được chỉnh riêng trong từng file.

Thông tin cá nhân đã có được giữ lại. Bản Anh ban đầu dùng cùng tên, đơn vị và thông tin liên hệ; bạn có thể đổi cách trình bày tại `content/en/site.json`. Các nội dung mẫu đã có bản Anh tương ứng. Website **không tự dịch những nội dung bạn thêm hoặc sửa sau này**.

## 2. Đường dẫn và nút chuyển ngôn ngữ

| Trang | Việt | Anh |
| --- | --- | --- |
| Giới thiệu / About | `/` | `/en/` |
| Nghiên cứu / Research | `/research/` | `/en/research/` |
| Thư viện ảnh / Gallery | `/gallery/` | `/en/gallery/` |
| Bài viết / Posts | `/posts/` | `/en/posts/` |
| Một bài cụ thể | `/posts/ten-bai/` | `/en/posts/ten-bai/` |

Website giữ các URL cũ cho bản Việt. Không tự đổi ngôn ngữ theo trình duyệt; URL và lựa chọn VI/EN quyết định phiên bản đang xem.

- Nếu mục có bản dịch được xuất bản, nút ngôn ngữ mở **đúng mục tương ứng**.
- Nếu chưa có bản dịch hoặc bản dịch đang `published: false`, nút dẫn về **trang danh sách của ngôn ngữ đích**. Gợi ý trên nút cho biết bản dịch chưa được xuất bản.
- Không lấy nội dung Việt để thay vào một trang Anh còn thiếu, hoặc ngược lại.
- Hai bản có thể có số lượng card, thứ tự và ngày đăng khác nhau.

## 3. Thêm một cặp bài Việt – Anh

Điều quan trọng nhất: **hai file có cùng tên, đặt trong cùng loại nội dung**.

Ví dụ:

```text
content/vi/posts/my-first-post.md       → /posts/my-first-post/
content/en/posts/my-first-post.md    → /en/posts/my-first-post/
```

Tên hiển thị có thể khác hoàn toàn giữa hai ngôn ngữ. Tên file chung là cách website nhận biết chúng là một cặp; chưa hỗ trợ ghép cặp hai tên file khác nhau.

### Bước 1: Tạo file Việt

Sao chép `content/vi/posts/_template.md` thành `content/vi/posts/my-first-post.md`, rồi điền:

```md
---
title: "Bài viết đầu tiên của mình"
summary: "Một vài điều mình muốn ghi lại và chia sẻ."
published: true
sample: false
date: "2026-09-07"
order: 1
tags: ["Ghi chép"]
---

## Xin chào

Viết nội dung tiếng Việt ở đây.
```

### Bước 2: Tạo file Anh cùng tên

Sao chép `content/en/posts/_template.md` thành `content/en/posts/my-first-post.md`, rồi điền:

```md
---
title: "My first post"
summary: "A few things I would like to record and share."
published: true
sample: false
date: "2026-09-07"
order: 1
tags: ["Notes"]
---

## Hello

Write your English content here.
```

### Bước 3: Xem thử và triển khai lại

Sau khi lưu, bản xem thử tự tải lại. Khi đưa lên hosting, chạy build và triển khai như trước. Card và trang chi tiết của mỗi ngôn ngữ tự được tạo; không sửa code giao diện hoặc danh sách route.

Research và Gallery dùng cách tương tự: đổi `posts` thành `research` hoặc `gallery` ở cả hai đường dẫn.

## 4. Tạo file bằng lệnh — tùy chọn

```sh
# Mặc định là tiếng Việt; lệnh cũ vẫn sử dụng được.
npm run new:post -- my-first-post

# Thêm bản Anh có cùng tên.
npm run new:post -- my-first-post en

# Research
npm run new:research -- my-project vi
npm run new:research -- my-project en

# Gallery
npm run new:gallery -- my-album vi
npm run new:gallery -- my-album en
```

Lệnh chọn mẫu theo ngôn ngữ, luôn tạo bản nháp `published: false` và từ chối ghi đè file đã tồn tại. Điền nội dung rồi đổi thành `true` khi sẵn sàng.

Muốn bài chỉ xuất hiện bằng một ngôn ngữ, chỉ tạo file ở thư mục đó hoặc giữ bản còn lại là bản nháp. Không bắt buộc phải có đủ hai bản để xuất bản.

## 5. Đổi nhãn giao diện và hồ sơ

- Đổi nhãn menu tại `nav` trong `content/vi/ui.json` hoặc `content/en/ui.json`.
- Đổi tiêu đề Hướng nghiên cứu/Background/Contact tại `sections` trong cùng file.
- Đổi nhãn card tại `actions`, thông báo trống tại `emptyTitle`/`emptyDescription`, nút quay lại tại `back`.
- Đổi tiêu đề và mô tả trang danh sách tại `pages` trong `site.json` của ngôn ngữ tương ứng. Nhãn menu và tiêu đề trang là hai trường riêng.
- Đổi tên, chức danh, cơ quan, địa điểm, email, CV và mạng xã hội trong từng `site.json`.

Giữ nguyên **tên các khóa JSON** và chỉ thay giá trị. Hai file UI cần có cùng bộ khóa để giao diện đầy đủ ở cả hai ngôn ngữ. Dùng dấu nháy kép, không thêm comment hoặc dấu phẩy thừa vào JSON.

Hồ sơ hai bản độc lập: đổi email hoặc ảnh trong một file không tự đổi file còn lại. Tương tự, nội dung email trong Markdown Contact cũng cần được cập nhật nếu bạn hiển thị nó tại đó.

## 6. Ảnh, liên kết, ngày và thời gian đọc

- Đường dẫn ảnh dùng `/images/...`, không thêm `/en` phía trước. Ví dụ cả hai bản cùng dùng `/images/avatar.jpg`.
- Tài liệu dùng `/files/...`; có thể đặt `cv-vi.pdf` và `cv-en.pdf`, rồi chọn file tương ứng trong mỗi hồ sơ.
- Liên kết **trong thân Markdown** được giữ đúng như bạn viết. Để dẫn đến trang Anh, viết `[Research](/en/research/)`; đến trang Việt, viết `[Nghiên cứu](/research/)`.
- Ngày trong YAML vẫn nhập theo dạng `"YYYY-MM-DD"`; cách hiển thị ngày trên giao diện theo ngôn ngữ đang xem.
- Thời gian đọc được ước tính riêng từ nội dung từng bản. Nhãn “phút đọc”/“min read” cũng tự đổi.
- Tiêu đề tab, mô tả trang và thuộc tính `lang` của HTML sử dụng đúng ngôn ngữ của URL.

## 7. Kiểm tra trước khi đưa lên website

```sh
npx tsc --noEmit --incremental false
npm run test:content
npm run build
```

Quy trình build xuất cả hai phiên bản trong cùng `dist/client`; không phải triển khai hai website riêng. URL thư mục và tài nguyên nội bộ được kiểm tra sau build. GitHub Pages workflow hiện có cũng chạy các kiểm tra này.

Khi thử một cặp bài, kiểm tra nút VI/EN mở đúng bài, tên và tóm tắt đúng ngôn ngữ, ảnh/chú thích đầy đủ. Nếu bản dịch đang nháp, nút chuyển ngôn ngữ sẽ về danh sách thay vì mở trang lỗi.

Xem [CUSTOMIZATION.md](CUSTOMIZATION.md) để biết thêm về cấu trúc Markdown, album, sắp xếp và tùy chỉnh màu sắc.
