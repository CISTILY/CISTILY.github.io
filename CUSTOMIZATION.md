# Hướng dẫn điền nội dung và tùy chỉnh website

Website có bốn trang **About, Research, Gallery, Posts**, với hồ sơ cá nhân ở bên trái. Bạn cập nhật bằng file nội dung; không cần sửa React/TypeScript để thêm nghiên cứu, album hay bài viết.

**Hai ngôn ngữ:** các đường dẫn trong hướng dẫn này là bản Việt. Bản Anh dùng cùng cấu trúc bên trong `content/en/`. Xem [BILINGUAL.md](BILINGUAL.md) để ghép cặp bài, dùng nút VI/EN và chỉnh hồ sơ/nhãn giao diện riêng cho từng phiên bản.

## 1. Bắt đầu từ đâu?

| Bạn muốn làm gì? | Nơi thực hiện |
| --- | --- |
| Điền tên, chức danh, cơ quan, địa điểm, email, liên kết | [`content/vi/site.json`](content/vi/site.json) |
| Điền Research Interests | [`content/vi/about/research-interests.md`](content/vi/about/research-interests.md) |
| Viết Background, học vấn, kinh nghiệm | [`content/vi/about/background.md`](content/vi/about/background.md) |
| Thêm nghiên cứu hoặc dự án | Thêm file `.md` trong [`content/vi/research/`](content/vi/research/) |
| Thêm album ảnh | Thêm file `.md` trong [`content/vi/gallery/`](content/vi/gallery/) |
| Thêm bài viết | Thêm file `.md` trong [`content/vi/posts/`](content/vi/posts/) |
| Đưa ảnh lên | Thêm ảnh trong [`public/images/`](public/images/) |
| Đưa CV hoặc tài liệu lên | Thêm file trong [`public/files/`](public/files/) |
| Đổi màu, font hoặc bố cục | Sửa `app/globals.css` — tùy chọn nâng cao |

Các phần About hiện chỉ ghi chờ cập nhật. Bạn có thể thay toàn bộ nội dung của từng file bằng thông tin thật, dùng ví dụ bên dưới làm khung.

## 2. Hồ sơ bên trái và thông tin website

Mở `content/vi/site.json`. Giữ nguyên dấu ngoặc, dấu phẩy và **dấu nháy kép** của JSON; thay các giá trị cần thiết.

| Trường | Công dụng |
| --- | --- |
| `name` | Tên ở đầu trang, sidebar, tiêu đề tab và footer |
| `role` | Chức danh/chuyên ngành dưới tên; `""` để ẩn |
| `affiliation` | Trường/cơ quan; `""` để ẩn |
| `location` | Địa điểm; `""` để ẩn |
| `avatar` | Đường dẫn ảnh đại diện, ví dụ `/images/avatar.jpg`; để trống dùng hai ký tự đầu của tên |
| `avatarAlt` | Mô tả ngắn của ảnh đại diện |
| `email` | Địa chỉ email cho liên kết trong sidebar; không thêm `mailto:` vào giá trị này |
| `cv` | Đường dẫn PDF, ví dụ `/files/cv.pdf`; `""` để ẩn |
| `description` | Mô tả chung dùng trong metadata |
| `socials` | Danh sách liên kết bên ngoài; mỗi mục gồm `label` và `url` |
| `pages.research`, `pages.gallery`, `pages.posts` | Tiêu đề và mô tả của từng trang danh sách |

Ví dụ một mục trong `socials`:

```json
{ "label": "Google Scholar", "url": "https://scholar.google.com/citations?user=YOUR_ID" }
```

Thay URL bằng hồ sơ thật. Thêm các mục khác vào mảng `socials` để hiển thị ORCID iD, LinkedIn hoặc trang cá nhân khác. GitHub, LinkedIn và ORCID tự hiển thị icon tương ứng theo tên miền của URL; các trang khác dùng icon liên kết ngoài. Các mục cách nhau bằng dấu phẩy; mục cuối không có dấu phẩy thừa. Để `socials: []` nếu chưa muốn hiển thị liên kết.

Để dùng ảnh đại diện hoặc CV, thêm file thật vào `public` rồi mới điền đường dẫn. Bước build kiểm tra các tài nguyên nội bộ bị thiếu.

Ví dụ: đặt ảnh ở `public/images/avatar.jpg` và CV ở `public/files/cv.pdf`, rồi điền `"avatar": "/images/avatar.jpg"` và `"cv": "/files/cv.pdf"` trong `content/vi/site.json` và `content/en/site.json`. Đường dẫn trên website bắt đầu bằng `/`, không gồm `public` hoặc đường dẫn trên máy như `C:/Users/...`. Khi cập nhật, bạn có thể thay file cùng tên để giữ nguyên liên kết.

Thông tin liên hệ hiển thị trong sidebar, lấy từ `email` và `socials` trong `site.json`.

## 3. Điền trang About

Hai file About là Markdown thuần, **không cần phần thông tin YAML** ở đầu.

### Research Interests

Thay nội dung `content/vi/about/research-interests.md`, ví dụ:

```md
Mình quan tâm đến các bài toán tại giao điểm của công nghệ và ứng dụng thực tế.

- Lĩnh vực nghiên cứu thứ nhất.
- Lĩnh vực nghiên cứu thứ hai.
- Câu hỏi hoặc hướng tiếp cận muốn tìm hiểu thêm.
```

### Background và học vấn

Thay nội dung `content/vi/about/background.md`, ví dụ:

```md
Mình đang theo học/làm việc tại **[Tên trường hoặc đơn vị]**, tập trung vào [lĩnh vực của bạn].

### Education

- **[Thời gian] — [Tên trường]**: [Bằng cấp/chuyên ngành].
- **[Thời gian] — [Chương trình khác]**: [Nội dung liên quan].

### Experience

Viết về kinh nghiệm, những dự án đã tham gia và định hướng tiếp theo.
```

Thay các chỗ trong ngoặc bằng thông tin thật. Không cần giữ các mục chưa sử dụng. Khi để một file trống, tiêu đề của phần đó vẫn hiện.

## 4. Thêm mục mới: chỉ cần một file Markdown

### Cách dùng mẫu có sẵn

1. Mở thư mục cần thêm: `content/vi/research`, `content/vi/gallery` hoặc `content/vi/posts`.
2. Sao chép file `_template.md` ngay trong thư mục đó.
3. Đổi tên bản sao, ví dụ `ten-de-tai.md`, `hoi-thao-2026.md`, `ghi-chep-dau-tien.md`.
4. Điền các trường đầu file và viết nội dung ở bên dưới.
5. Khi sẵn sàng, đổi `published: false` thành `published: true`.
6. Lưu file, xem thử rồi triển khai bản mới.

Tên file dùng **chữ thường không dấu, số và dấu gạch ngang**. Không dùng khoảng trắng hoặc ký tự đặc biệt. Tên file quyết định URL:

| File mới | Trang chi tiết tự tạo |
| --- | --- |
| `content/vi/research/ten-de-tai.md` | `/research/ten-de-tai/` |
| `content/vi/gallery/hoi-thao-2026.md` | `/gallery/hoi-thao-2026/` |
| `content/vi/posts/ghi-chep-dau-tien.md` | `/posts/ghi-chep-dau-tien/` |

Không phải thêm vào danh sách nào khác. Các file bắt đầu bằng `_` hoặc `.` được bỏ qua; vì vậy cần **sao chép và đổi tên** mẫu, không chỉ đổi `published` trong `_template.md`. Website đọc file `.md` trực tiếp trong mỗi thư mục, chưa đọc thư mục con chứa bài.

### Cách tạo bản nháp bằng lệnh — tùy chọn

Trong thư mục repo:

```sh
npm run new:research -- ten-de-tai
npm run new:gallery -- hoi-thao-2026
npm run new:post -- ghi-chep-dau-tien
```

Mỗi lệnh sao chép đúng mẫu và tạo bản nháp. Lệnh sẽ từ chối nếu tên đã tồn tại, không ghi đè nội dung cũ. Sau đó bạn chỉ cần mở file vừa tạo và điền nội dung.

## 5. Các trường chung ở đầu file

Mỗi mục Research, Gallery hoặc Posts có phần đầu nằm giữa **hai dòng `---`**. Phần này gọi là front matter, chứa thông tin để tạo card và trang chi tiết.

```yaml
---
title: "Tiêu đề của bạn"
summary: "Một đến hai câu tóm tắt hiển thị trên card."
published: false
sample: false
date: "2026-09-07"
order: 100
tags: ["Chủ đề A", "Chủ đề B"]
cover: ""
coverAlt: ""
---
```

| Trường | Quy tắc |
| --- | --- |
| `title` | Bắt buộc khi xuất bản; tiêu đề card, trang chi tiết và tab trình duyệt |
| `summary` | Bắt buộc khi xuất bản; tóm tắt card, đoạn mở đầu và mô tả trang |
| `published` | Chỉ `true` mới xuất bản; `false` hoặc bỏ trường này giữ mục ở trạng thái ẩn |
| `sample` | `true` hiện nhãn “Nội dung mẫu”; `false` hoặc bỏ trường này để bỏ nhãn |
| `date` | Không bắt buộc; dùng `"YYYY-MM-DD"` hoặc `""` để không hiện ngày |
| `order` | Không bắt buộc, mặc định `100`; số nhỏ hơn đứng trước |
| `tags` | Danh sách nhãn; `[]` hoặc bỏ trường này để không hiện nhãn |
| `cover` | Ảnh bìa; dùng đường dẫn `/images/...` hoặc URL ảnh HTTP(S); để trống nếu không dùng |
| `coverAlt` | Mô tả nội dung ảnh bìa |
| `images` | Danh sách ảnh có `src`, `alt`, `caption`; dùng chủ yếu cho Gallery |

**Thứ tự tự động:** `order` tăng dần → ngày mới hơn trước → tên file theo thứ tự chữ cái. Muốn ghim một mục lên đầu, đặt `order: 1`. Nếu muốn sắp theo ngày, để các mục cùng `order`.

`published` và `sample` phải là `true`/`false` **không có dấu nháy**. Đặt chuỗi trong dấu nháy kép giúp tránh lỗi khi tiêu đề chứa dấu `:` hoặc `#`. Mỗi tên trường chỉ xuất hiện một lần trong phần đầu.

Đổi tên file sẽ đổi URL. Nếu đã chia sẻ URL cũ, nên giữ nguyên tên file và chỉ sửa `title`. `published: false` loại bỏ card và trang chi tiết khỏi bản build mới, nhưng không xóa file trong Git hoặc thu hồi bản đã được người khác lưu.

## 6. Mẫu Research hoàn chỉnh

Tạo `content/vi/research/ten-de-tai.md`:

````md
---
title: "Tên đề tài nghiên cứu"
summary: "Câu hỏi nghiên cứu, cách tiếp cận và đóng góp chính trong một đoạn ngắn."
published: true
sample: false
order: 1
tags: ["Research", "Python"]
cover: ""
---

## Tổng quan

Trình bày bối cảnh, mục tiêu và phạm vi của đề tài.

## Phương pháp

- Dữ liệu và công cụ sử dụng.
- Cách tiếp cận chính.
- Vai trò của bạn.

## Kết quả

Mô tả kết quả đã kiểm chứng và những giới hạn.

| Hạng mục | Mô tả |
| --- | --- |
| Sản phẩm | Điền sản phẩm hoặc đầu ra của đề tài |
| Bài học | Điền điều rút ra |

## Liên kết

[Mã nguồn](https://github.com/your-username/your-repository)
````

Bạn có thể thêm nhiều đường dẫn trong Markdown: mã nguồn, bài báo, DOI, demo, dataset, slide hoặc PDF. Không giới hạn một đường dẫn như phiên bản trước.

## 7. Mẫu Gallery và cách thêm ảnh

1. Tạo thư mục ảnh, ví dụ `public/images/hoi-thao/`.
2. Chép các ảnh của bạn vào đó, ví dụ `anh-01.jpg`, `anh-02.jpg`.
3. Tạo `content/vi/gallery/hoi-thao.md` và điền mẫu dưới đây.

```md
---
title: "Tên sự kiện hoặc bộ sưu tập"
summary: "Một vài khoảnh khắc và câu chuyện từ bộ sưu tập."
published: true
sample: false
tags: ["Sự kiện"]
cover: ""
images:
  - src: "/images/hoi-thao/anh-01.jpg"
    alt: "Mô tả những gì xuất hiện trong ảnh thứ nhất"
    caption: "Chú thích ảnh thứ nhất"
  - src: "/images/hoi-thao/anh-02.jpg"
    alt: "Mô tả những gì xuất hiện trong ảnh thứ hai"
    caption: "Chú thích ảnh thứ hai"
---

## Về bộ sưu tập này

Viết vài dòng về bối cảnh và câu chuyện phía sau những bức ảnh.
```

- Không điền `cover`: ảnh đầu tiên trong `images` tự trở thành bìa card.
- Có `cover` riêng: website dùng ảnh đó; nếu ảnh đã nằm trong `images`, trang chi tiết không lặp lại ảnh bìa ở đầu.
- Không có ảnh: card dùng biểu tượng album. Mục mẫu hiện tại chưa chứa ảnh của bạn.
- `alt` là mô tả ảnh, bắt buộc với mỗi mục trong `images`; `caption` không bắt buộc.
- Bấm card để mở album; bấm ảnh trong album để mở ảnh đầy đủ ở tab mới.
- Thêm ảnh bằng cách thêm mục `- src: ...` vào danh sách. Giữ thụt đầu dòng bằng dấu cách giống mẫu, không dùng tab.

Ảnh có đường dẫn bắt đầu bằng `/images/`, **không viết `/public/images/`**. Dùng tên file khớp cả chữ hoa/chữ thường để chạy đúng trên hosting. Nếu ảnh lớn, nên thu nhỏ/nén trước khi đưa lên để trang tải nhanh hơn.

## 8. Mẫu Posts hoàn chỉnh

Tạo `content/vi/posts/bai-viet-dau-tien.md`:

````md
---
title: "Bài viết đầu tiên của mình"
summary: "Một đoạn giới thiệu ngắn để người đọc biết bài viết nói về điều gì."
published: true
sample: false
date: "2026-09-07"
tags: ["Ghi chép"]
---

Viết đoạn mở đầu của bạn tại đây.

## Ý đầu tiên

Bạn có thể dùng **chữ đậm**, *chữ nghiêng* và [liên kết](https://example.com).

- Ý chính thứ nhất.
- Ý chính thứ hai.

## Một ví dụ

```python
print("Hello, world!")
```

## Điều rút ra

Viết điều bạn muốn ghi nhớ hoặc chia sẻ cùng người đọc.
````

Thời gian đọc được ước tính tự động theo độ dài nội dung; không cần điền `readingTime`. Bài có URL riêng để gửi cho người khác. Thay nội dung mẫu rồi đặt `sample: false` để bỏ nhãn mẫu.

## 9. Markdown hỗ trợ những gì?

| Nội dung | Cách viết |
| --- | --- |
| Tiêu đề phần | `## Tên phần` |
| Tiêu đề nhỏ | `### Tên mục` |
| In đậm | `**nội dung**` |
| In nghiêng | `*nội dung*` |
| Danh sách | Mỗi dòng bắt đầu bằng `- ` |
| Danh sách đánh số | Mỗi dòng bắt đầu bằng `1. `, `2. `… |
| Liên kết | `[Chữ hiển thị](https://example.com)` |
| Email | `[Gửi email](mailto:you@example.com)` |
| Ảnh trong nội dung | `![Mô tả ảnh](/images/anh.jpg)` |
| PDF nội bộ | `[Tải tài liệu](/files/tai-lieu.pdf)` |
| Trích dẫn | Dòng bắt đầu bằng `> ` |
| Đường phân cách | Một dòng `---` ở phần thân bài |

Bảng và khối mã cũng được hỗ trợ như các mẫu ở trên. Nên bắt đầu tiêu đề phần trong thân bài bằng `##`, vì tên bài đã là tiêu đề chính của trang.

HTML thô và script không được thực thi; website chưa hỗ trợ MDX, công thức LaTeX hoặc nhúng iframe. Code block hiển thị được với font monospace, chưa có tô màu cú pháp chuyên biệt. Dùng đường dẫn bắt đầu bằng `/` cho tài nguyên nội bộ để chúng không bị hiểu tương đối theo trang chi tiết.

## 10. Hiện/ẩn và cập nhật nội dung cũ

| Thao tác | Cách làm |
| --- | --- |
| Hiện mục | `published: true` |
| Ẩn mục, giữ nội dung để sửa tiếp | `published: false` |
| Bỏ nhãn mẫu | `sample: false` |
| Đẩy mục lên trước | Giảm `order` |
| Đổi tên hiển thị, giữ URL | Sửa `title`, giữ tên file |
| Xóa mục | Xóa file `.md`, rồi build và triển khai lại |
| Ẩn toàn bộ nội dung một trang | Đặt tất cả mục thành `published: false`; trang danh sách vẫn hiện trạng thái chờ nội dung |

Dữ liệu cũ trong `content/legacy/portfolio.ts` chỉ được giữ lại để tham khảo. Website mới không đọc file này; sửa nó sẽ không thay đổi giao diện.

## 11. Xem thử và cập nhật bản trực tuyến

Trong thư mục repo, cài thư viện một lần hoặc sau khi thay đổi dependencies:

```sh
npm ci
```

Xem thử:

```sh
npm run dev
```

Mở địa chỉ được in ra. Thêm, sửa hoặc xóa Markdown sẽ làm bản xem thử tải lại. Dừng bằng `Ctrl+C` khi xong.

Kiểm tra trước khi triển khai:

```sh
npx tsc --noEmit --incremental false
npm run test:content
npm run build
```

Bản tĩnh nằm trong `dist/client`. Lệnh build tự chạy bước hoàn tất đường dẫn và kiểm tra ảnh/tài liệu/liên kết nội bộ bị thiếu. Không sửa trực tiếp file trong `dist`.

- **GitHub Pages:** sau khi repo đã bật Pages dùng GitHub Actions, mỗi lần đẩy thay đổi lên `main`, workflow hiện có sẽ kiểm tra và tạo lại website. Bạn chỉ cần thêm/sửa Markdown và tải ảnh vào đúng thư mục trong repo; không phải lập trình lại giao diện.
- **Sites:** cần lưu và triển khai phiên bản mới của cùng website. Lưu file trên máy hoặc đẩy lên GitHub không tự cập nhật bản Sites.

Website tĩnh không lưu nội dung mới từ một biểu mẫu trên trang. Quy trình bạn đã chọn là **file Markdown + mẫu điền sẵn**, chưa có trang quản trị trực tuyến.

## 12. Tùy chỉnh giao diện — nếu cần

Việc cập nhật nội dung thường ngày không cần phần này.

| Phần muốn đổi | Nơi chỉnh |
| --- | --- |
| Màu nền, chữ, liên kết, viền | Các biến trong `:root` của `app/globals.css` |
| Font chính | `body`, `--font-sans`, `--font-heading` |
| Chiều rộng toàn trang | `--content-width` |
| Độ rộng sidebar/khoảng cách hai cột | `.site-layout` |
| Kích thước ảnh đại diện | `.profile-photo`, `.profile-initials` và các quy tắc mobile |
| Số cột card | `.collection-grid` và các khối `@media` |
| Nền bìa Gallery khi chưa có ảnh | `.entry-cover` |
| Nhãn menu About/Research/Gallery/Posts | `nav` trong `content/vi/ui.json` hoặc `content/en/ui.json` |
| Tiêu đề Research Interests/Background/Contact | `sections` trong các file UI theo ngôn ngữ |
| Khung footer | `components/site-document.tsx`; nhãn dùng các file UI |
| Favicon | `public/favicon.svg` |

Màu chính hiện tại:

```css
:root {
  --background: #fff;
  --foreground: #343b43;
  --muted: #65707d;
  --accent: #286780;
  --border: #e5e8ec;
  --surface: #f5f7f9;
  --content-width: 1240px;
}
```

Một số màu hover, viền card và nền ảnh được đặt trực tiếp trong CSS; muốn thay toàn bộ bảng màu cần chỉnh cả các quy tắc tương ứng. Website hiện chỉ có giao diện sáng.

Các mục menu là liên kết đến trang riêng. Nếu đổi chữ trên menu, giữ nguyên các đường dẫn `/`, `/research/`, `/gallery/`, `/posts/` để khớp cơ chế tạo trang. Việc thêm một **collection mới ngoài ba loại đang có** cần sửa cấu trúc; thêm mục trong ba collection hiện có thì không.

## 13. Lỗi thường gặp

| Hiện tượng | Cách xử lý |
| --- | --- |
| Thêm file nhưng không thấy card | Kiểm tra đúng thư mục, đuôi `.md`, tên không bắt đầu `_`, và `published: true` |
| Báo thiếu YAML | Giữ phần thông tin giữa hai dòng `---` ở đầu file collection |
| Báo lỗi `title` hoặc `summary` | Hai trường này cần có giá trị không rỗng khi xuất bản |
| Báo lỗi `date` | Dùng ngày thực dạng `"YYYY-MM-DD"`, hoặc để `""` |
| Báo lỗi `published` | Viết `true`/`false` không có dấu nháy |
| Báo YAML không hợp lệ | Kiểm tra thụt dòng, dấu nháy và tên trường trùng; chú ý các giá trị có dấu `:` |
| Ảnh không hiện / build báo thiếu tài nguyên | Chép ảnh vào `public/images`, dùng `/images/...`, kiểm tra chính xác tên file |
| Card đã có nhưng thứ tự chưa đúng | So sánh `order`; chỉ khi bằng nhau mới xét ngày |
| URL cũ không mở được | Kiểm tra đã đổi tên file, xóa mục hoặc chuyển `published` thành `false` chưa |
| Sửa trên máy nhưng bản online chưa đổi | Build và triển khai lại đúng nơi đang xem |
| JSON báo lỗi sau khi sửa hồ sơ | Dùng nháy kép, không thêm comment hoặc dấu phẩy ở cuối mục cuối cùng |

Giữ lại bản sao hoặc lịch sử Git khi chỉnh nội dung. `published: false` không phải cơ chế giữ bí mật cho file nằm trong repository công khai.
