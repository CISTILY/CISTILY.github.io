# Hướng dẫn tùy chỉnh website cá nhân

Tài liệu này mô tả các phần có thể chỉnh trong **phiên bản hiện tại** của website: thông tin cá nhân, học vấn, project, blog, màu sắc, bố cục, ảnh đại diện và thông tin trên tab trình duyệt.

Hầu hết thay đổi nội dung chỉ cần sửa [`content/portfolio.ts`](content/portfolio.ts). Các ví dụ dưới đây là dữ liệu minh họa, hãy thay bằng thông tin của bạn.

## 1. Bản đồ các phần có thể tùy chỉnh

| Muốn thay đổi | Nơi chỉnh sửa | Mức độ |
| --- | --- | --- |
| Tên, giới thiệu, định hướng, sở thích | `profile` trong `content/portfolio.ts` | Chỉnh nội dung |
| GitHub, email liên hệ | `profile.github`, `profile.email` | Chỉnh nội dung |
| Trường, chuyên ngành, thời gian học | `profile.education` | Chỉnh nội dung |
| Project hiển thị, thứ tự, mô tả, công nghệ, đường dẫn | `projects` trong `content/portfolio.ts` | Chỉnh nội dung |
| Bài blog hiển thị, thứ tự, nội dung, thời gian đọc | `posts` trong `content/portfolio.ts` | Chỉnh nội dung |
| Tiêu đề các phần, chữ trên nút, câu chào, chân trang | `app/page.tsx` | Sửa chữ trong giao diện |
| Menu, thứ tự hoặc ẩn cả một phần | `navigation` và các khối `<section>` trong `app/page.tsx` | Sửa bố cục |
| Màu, font, khoảng cách, số cột project | `app/globals.css` | Sửa CSS |
| Chữ viết tắt hoặc ảnh đại diện | Khối `.monogram` trong `app/page.tsx` | Sửa giao diện |
| Biểu tượng tab trình duyệt | `public/favicon.svg` | Thay tài nguyên |
| Tiêu đề tab, mô tả website, ngôn ngữ khai báo | `app/layout.tsx` | Sửa cấu hình giao diện |
| Cửa sổ đọc project/bài viết | `components/reading-card.tsx` và CSS `.reading-*` | Sửa giao diện |

**Bắt đầu nhanh:** sửa `profile`, thay thông tin học vấn mẫu, giữ những project muốn giới thiệu bằng `published: true`, rồi thay hoặc ẩn các bài blog mẫu.

## 2. Thông tin cá nhân và liên hệ

Mở [`content/portfolio.ts`](content/portfolio.ts), tìm `export const profile`.

| Trường | Hiển thị ở đâu / tác dụng |
| --- | --- |
| `name` | Tên ở đầu trang, câu chào, chân trang và tiêu đề tab |
| `tagline` | Câu ngắn trong thẻ giới thiệu bên phải |
| `intro` | Đoạn mở đầu dưới câu chào; cũng là mô tả website trong metadata |
| `about` | Đoạn giới thiệu dài trong phần “Về mình” |
| `direction` | Nội dung “Điều mình hướng đến” |
| `interests` | Danh sách nhãn sở thích / lĩnh vực quan tâm |
| `github` | Đường dẫn GitHub ở đầu trang và nút kết nối khi chưa có email |
| `email` | Nếu có giá trị, nút kết nối chuyển sang “Gửi lời chào” và mở ứng dụng email |

Ví dụ thay các dòng tương ứng trong `profile`; giữ lại `education` để chỉnh riêng ở phần tiếp theo:

```ts
name: 'Nguyễn An',
tagline: 'Học từ những bài toán thực tế.',
intro: 'Mình quan tâm đến phát triển phần mềm và các ứng dụng của AI.',
about: 'Mình thích tìm hiểu vấn đề, thử nghiệm giải pháp và ghi lại những điều học được qua mỗi project.',
direction: 'Mình hướng đến vai trò kỹ sư phần mềm, tập trung vào các sản phẩm dễ sử dụng và có thể duy trì lâu dài.',
interests: ['Software Engineering', 'AI', 'Python', 'Viết blog'],
github: 'https://github.com/your-username',
email: 'you@example.com',
```

Để `email: ''` nếu chưa muốn hiển thị kênh email. Nút email dùng `mailto:`, không có biểu mẫu gửi thư hay dịch vụ gửi email tích hợp.

Chữ lớn trên thẻ giới thiệu hiện lấy **hai ký tự đầu** của `profile.name`, không tự lấy chữ cái đầu của từng từ. Tên dài có thể cần giảm cỡ chữ `.hero h1` ở phần giao diện.

## 3. Học vấn

Trong `profile.education`, mỗi cặp `{ ... }` là một mục học vấn:

```ts
education: [
  {
    period: '2022 – 2026',
    school: 'Tên trường đại học',
    major: 'Cử nhân Công nghệ thông tin',
    description: 'Tập trung vào kỹ thuật phần mềm, cơ sở dữ liệu và học máy.',
  },
  {
    period: '2025',
    school: 'Tên chương trình đào tạo',
    major: 'Khóa học chuyên sâu',
    description: 'Những nội dung hoặc kỹ năng nổi bật đã học.',
  },
],
```

- Thêm mục: sao chép một khối `{ ... }` và đổi nội dung.
- Đổi thứ tự: di chuyển nguyên khối trong mảng; website không tự sắp xếp theo thời gian.
- Xóa mục: xóa nguyên khối cùng dấu phẩy đi kèm.
- `education: []` làm danh sách trống nhưng **vẫn giữ tiêu đề Học vấn**. Muốn ẩn cả phần, xem mục 6.

Giao diện hiện dùng `school` làm khóa cho mỗi mục. Nếu có nhiều chương trình cùng một trường, đổi `key={item.school}` trong `app/page.tsx` thành biểu thức dưới đây và đảm bảo bộ ba này không trùng nhau:

```tsx
key={`${item.school}-${item.major}-${item.period}`}
```

## 4. Chọn và quản lý project

### Hiện, ẩn và sắp xếp

Tìm `export const projects: Project[] = [...]` trong [`content/portfolio.ts`](content/portfolio.ts).

```ts
published: true,  // Hiện project
published: false, // Ẩn project
```

Chỉ dùng **một** dòng `published` trong mỗi project. Website hiển thị các project được bật theo đúng thứ tự trong mảng. Đưa nguyên khối project lên đầu mảng để nó xuất hiện trước.

Việc lựa chọn hoàn toàn thủ công; website chưa tự tải danh sách repository từ GitHub. Nếu ẩn hết project, phần Projects hiện thông báo chờ nội dung.

### Thêm một project

Dán khối sau **vào bên trong** mảng `projects`, trước dấu `];` kết thúc mảng:

```ts
{
  id: 'study-planner',
  published: true,
  example: false,
  title: 'Study Planner',
  category: 'WEB APPLICATION',
  coverLabel: 'plan. learn. repeat.',
  description: 'Ứng dụng lên kế hoạch học tập và theo dõi công việc mỗi tuần.',
  tags: ['React', 'TypeScript'],
  content: [
    'Bài toán: giúp người học chia mục tiêu lớn thành các nhiệm vụ nhỏ.',
    'Vai trò: thiết kế giao diện, xây dựng tính năng và kiểm tra trải nghiệm.',
    'Kết quả: mô tả đúng phần đã hoàn thành, kèm giới hạn hoặc bài học nếu có.',
  ],
  url: 'https://github.com/your-username/study-planner',
},
```

| Trường | Cách sử dụng |
| --- | --- |
| `id` | Mã riêng, không trùng với project khác; chưa phải URL của trang chi tiết |
| `published` | Bật/tắt hiển thị |
| `example` | `true` hiện nhãn “Mẫu”; đặt `false` hoặc bỏ trường này khi là project thật |
| `title` | Tên project |
| `category` | Nhãn lĩnh vực trên vùng bìa |
| `coverLabel` | Dòng chữ lớn trên bìa, nên ngắn gọn |
| `description` | Mô tả ngắn trên thẻ và trong cửa sổ chi tiết |
| `tags` | Các nhãn công nghệ; có thể để `[]` |
| `content` | Các đoạn mô tả chi tiết; mỗi chuỗi là một đoạn văn |
| `url` | Không bắt buộc; đường dẫn repository hoặc demo |

Nút “Khám phá project” mở nội dung chi tiết. Trong cửa sổ này, nút “Xem project” chỉ xuất hiện khi `url` bắt đầu bằng `http://` hoặc `https://`. Mỗi project hiện hỗ trợ một đường dẫn ngoài.

`published: false` là lựa chọn hiển thị, không phải quyền truy cập. Không đưa dữ liệu cần giữ kín vào repository chỉ vì đã ẩn mục đó.

## 5. Blog

Tìm `export const posts = [...]` trong [`content/portfolio.ts`](content/portfolio.ts). Thêm khối sau vào mảng:

```ts
{
  id: 'bai-hoc-tu-project-dau-tien',
  published: true,
  example: false,
  title: 'Những điều mình học từ project đầu tiên',
  category: 'Học tập',
  readingTime: '3 phút đọc',
  description: 'Một vài bài học về cách bắt đầu, thử nghiệm và hoàn thiện sản phẩm.',
  content: [
    'Đoạn mở đầu: mình bắt đầu project này vì điều gì?',
    'Đoạn tiếp theo: một khó khăn cụ thể và cách mình xử lý.',
    'Đoạn kết: điều mình sẽ làm khác ở project tiếp theo.',
  ],
},
```

| Trường | Cách sử dụng |
| --- | --- |
| `id` | Mã riêng của bài, không trùng bài khác |
| `published` | `true` để hiện, `false` để ẩn |
| `example` | Đặt `false` để bỏ nhãn “Bài mẫu”; nên giữ trường này vì kiểu dữ liệu hiện được suy ra từ các bài có sẵn |
| `title` | Tiêu đề bài |
| `category` | Chuyên mục hiển thị; chưa có bộ lọc theo chuyên mục |
| `readingTime` | Chuỗi nhập thủ công, không tự tính từ độ dài bài |
| `description` | Đoạn giới thiệu ngắn |
| `content` | Danh sách các đoạn văn của bài |

Đổi thứ tự bằng cách di chuyển các khối bài viết trong mảng. Nếu ẩn hết bài, phần Blog hiện thông báo đang chuẩn bị nội dung.

**Định dạng hiện tại:** bài viết mở trong cửa sổ trên trang chủ, chưa có trang hoặc URL riêng. Nội dung được hiển thị như văn bản thuần: `**chữ đậm**`, Markdown, HTML và code block không được chuyển thành định dạng tương ứng. Muốn thêm ảnh, liên kết trong bài, tiêu đề con hoặc Markdown cần mở rộng `components/reading-card.tsx` và cấu trúc dữ liệu.

## 6. Tiêu đề, nút, menu và thứ tự các phần

Mở [`app/page.tsx`](app/page.tsx). Các câu cố định như “Xin chào”, “Đi từng bước”, “Từ ý tưởng đến thực tế”, “KẾT NỐI” và chữ chân trang được viết trực tiếp trong file này. Tìm đúng câu và thay chữ giữa các thẻ, giữ nguyên cấu trúc JSX.

Menu nằm trong biến `navigation`. Mỗi mục có dạng:

```ts
['projects', 'Projects'],
```

- Phần đầu (`projects`) là đích điều hướng, phải khớp `id="projects"` của section.
- Phần sau (`Projects`) là chữ trên menu, có thể đổi thành `Dự án` mà không đổi đích.
- Thứ tự trong `navigation` chỉ đổi thứ tự menu.
- Muốn đổi thứ tự nội dung, di chuyển cả khối `<section>...</section>` tương ứng trong `<main>`.
- Muốn ẩn cả một phần, bỏ khối section và mục menu tương ứng; cập nhật các nút còn trỏ đến nó. Ví dụ ẩn Blog thì cần xử lý cả nút “Đọc blog” trong phần đầu trang.
- Các số `01 /`, `02 /`… là chữ nhập sẵn, cần sửa lại nếu đổi thứ tự section. Số thứ tự project/bài viết thì được tạo tự động.

Năm ở chân trang lấy từ `new Date().getFullYear()`; với bản xuất tĩnh, xây dựng và triển khai lại để cập nhật nội dung xuất sang năm mới.

## 7. Màu sắc, font và bố cục

### Màu chính

Mở [`app/globals.css`](app/globals.css), tìm khối `:root`. Đây là các giá trị hiện tại:

```css
:root {
  --background: #fcfdfb; /* Nền trang */
  --foreground: #192b22; /* Chữ chính */
  --popover: #fff; /* Nền cửa sổ đọc */
  --primary: #176642; /* Màu chính của nút và một số điểm nhấn */
  --line: #dfe5df; /* Đường viền */
  --muted: #637269; /* Chữ mô tả phụ */
}
```

Đổi các mã màu này trong khối có sẵn. Một số màu đang viết trực tiếp trong CSS nên đổi `--primary` **chưa đổi toàn bộ giao diện**:

| Thành phần | Selector cần tìm |
| --- | --- |
| Màu nút khi rê chuột | `.primary:hover` |
| Chấm sau tên và tiêu đề | `.wordmark > span`, `.green-dot` |
| Chấm trạng thái | `.status-dot` |
| Nền và viền thẻ giới thiệu | `.profile-panel` |
| Bìa project thứ nhất | `.project-cover` |
| Hai tông bìa kế tiếp | `.project-tone-1 .project-cover`, `.project-tone-2 .project-cover` |
| Nền khối kết nối | `.contact` |
| Nền khi bôi chọn chữ | `::selection` |

Bìa project luân phiên ba tông theo thứ tự các project đang hiện (`index % 3`), chưa có trường chọn màu riêng trong dữ liệu. Khi đổi bảng màu, kiểm tra cả chữ trên nền, nút lúc rê chuột và đường viền khi dùng bàn phím. Website hiện có một giao diện sáng, chưa có nút chuyển sáng/tối.

### Font chữ và kích thước

Font chữ chính được đặt trong `body`; các biến `--font-sans` và `--font-heading` nằm trong `@theme inline`. Đổi cả các nơi này để phần trang và cửa sổ đọc thống nhất. Vùng bìa và một số nhãn dùng `monospace` riêng.

Ví dụ dùng font hệ thống hỗ trợ tiếng Việt, không cần tải font ngoài:

```css
/* Thay giá trị tương ứng trong khối @theme inline hiện có. */
--font-sans: 'Segoe UI', Arial, sans-serif;
--font-heading: 'Segoe UI', Arial, sans-serif;
```

```css
/* Thay font-family trong khối body hiện có. */
body {
  font-family: 'Segoe UI', Arial, sans-serif;
}
```

Sửa `.hero h1` để đổi kích thước tên; `h2` cho tiêu đề phần; `h3` cho tiêu đề project/bài. Nếu dùng font riêng, thêm file font vào `public/fonts/`, khai báo `@font-face` và chọn font có ký tự tiếng Việt.

### Khoảng cách và số cột

| Muốn chỉnh | Selector |
| --- | --- |
| Chiều rộng tổng thể, lề ngang | `.header, .section, .footer` |
| Khoảng cách phần đầu và tỷ lệ hai cột | `.hero` |
| Bỏ độ nghiêng của thẻ giới thiệu | Đổi `transform` của `.profile-panel` thành `none`, kiểm tra cả quy tắc mobile |
| Khoảng cách giữa các phần | `padding-top`, `padding-bottom` của các section |
| Số cột và khoảng cách project | `.project-grid` |
| Chiều rộng và khoảng đệm cửa sổ đọc | `.reading-dialog` |

Ví dụ thay quy tắc `.project-grid` để desktop có ba cột:

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 25px;
}
```

Nên thêm hoặc cập nhật quy tắc trong các khối `@media` hiện có để tablet có hai cột, điện thoại một cột:

```css
@media (max-width: 900px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
```

CSS hiện có các mốc `1400px`, `900px`, `640px`. Quy tắc mobile có thể ghi đè thay đổi desktop. Giữ hỗ trợ `:focus-visible` và `prefers-reduced-motion` khi sửa hiệu ứng.

## 8. Chữ viết tắt, ảnh đại diện và favicon

### Chữ trên thẻ giới thiệu

Trong `app/page.tsx`, thay `{profile.name.slice(0, 2)}` bằng chữ mong muốn nếu không muốn dùng hai ký tự đầu. Ví dụ:

```tsx
<div className="monogram" aria-hidden="true">
  NA
  <span>↗</span>
</div>
```

### Thay chữ bằng ảnh đại diện — cần sửa giao diện

Hiện chưa có trường `avatar` trong dữ liệu. Để bổ sung ảnh:

1. Đặt ảnh vào `public/images/avatar.jpg` (tạo thư mục `images` nếu chưa có).
2. Thay **toàn bộ khối** `<div className="monogram" ...>...</div>` trong `app/page.tsx` bằng đoạn sau, không đặt ảnh vào khối còn `aria-hidden="true"`.
3. Thêm CSS bên dưới vào `app/globals.css`.

```tsx
<img
  className="profile-avatar"
  src="/images/avatar.jpg"
  alt={`Ảnh đại diện của ${profile.name}`}
  width={220}
  height={220}
/>
```

```css
.profile-avatar {
  display: block;
  width: min(220px, 100%);
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  align-self: center;
  margin: 24px 0;
}
```

Các đoạn bổ sung ảnh trong tài liệu này là hướng dẫn mở rộng, chưa được áp dụng vào website. Thêm riêng file ảnh mà chưa sửa JSX sẽ không làm ảnh xuất hiện. Bìa project hiện cũng dùng chữ, chưa có trường ảnh bìa.

### Favicon

Thay [`public/favicon.svg`](public/favicon.svg) để đổi biểu tượng trên tab. Nếu dùng `public/favicon.png`, đổi `icons.icon` trong `app/layout.tsx` thành `/favicon.png`. Thay ảnh không tự đổi tên hiển thị trên website.

## 9. Tiêu đề tab, mô tả và ngôn ngữ

Trong [`app/layout.tsx`](app/layout.tsx), metadata hiện dùng:

```ts
export const metadata: Metadata = {
  title: `${profile.name} — Portfolio & Blog`,
  description: profile.intro,
  icons: { icon: '/favicon.svg' },
};
```

Có thể thay `title` và `description` bằng chuỗi riêng nếu muốn khác phần giới thiệu. `lang="vi"` khai báo nội dung tiếng Việt; đổi thành `en` chỉ khi nội dung thực tế chuyển sang tiếng Anh. Đổi `lang` không tự dịch website.

Metadata hiện chưa cấu hình ảnh xem trước khi chia sẻ mạng xã hội. Muốn có ảnh đó cần thêm tài nguyên và cấu hình Open Graph tương ứng.

## 10. Lưu, xem thử và đưa thay đổi lên website

Chạy các lệnh trong thư mục repo. Dùng Node.js đáp ứng trường `engines` trong `package.json` (hiện yêu cầu từ `22.13.0`).

**Lần đầu hoặc khi cần cài lại thư viện:**

```sh
npm ci
```

**Xem thử trong lúc chỉnh:**

```sh
npm run dev
```

Mở địa chỉ mà lệnh in ra. Lưu file rồi xem thay đổi; dừng máy chủ bằng `Ctrl+C` khi xong.

**Kiểm tra trước khi triển khai:**

```sh
npx tsc --noEmit --incremental false
npm run build
```

Bản website tĩnh được tạo trong `dist/client`. Không chỉnh nội dung trực tiếp trong thư mục này vì lần build tiếp theo sẽ ghi đè. Với cấu hình tĩnh hiện tại, dùng `npm run dev` để xem thử; script `npm start` còn trỏ đến cấu hình Worker và không phải lệnh xem bản xuất tĩnh.

Kiểm tra các phần vừa thay: tên không tràn, liên kết mở đúng địa chỉ, project đã ẩn không còn trên trang, nội dung cửa sổ đọc đầy đủ, menu hoạt động và bố cục điện thoại đọc được.

**Cập nhật bản trực tuyến:**

- **GitHub Pages:** workflow hiện tại ở `.github/workflows/deploy.yml` chạy khi đẩy lên `main` hoặc kích hoạt thủ công. Cần cấu hình Pages sử dụng GitHub Actions trong repo. Workflow build và lấy `dist/client` làm nội dung triển khai; không cần đẩy thư mục này lên Git.
- **Sites:** bản đang trực tuyến chỉ thay đổi khi lưu và triển khai một phiên bản mới. Lưu file trên máy hoặc đẩy lên GitHub không tự cập nhật bản Sites.

Hướng dẫn đường dẫn ảnh bắt đầu bằng `/` dành cho website ở gốc tên miền như repo hiện tại. Nếu chuyển sang website trong thư mục con, cần điều chỉnh đường dẫn nền và tài nguyên tương ứng.

## 11. Lỗi thường gặp và giới hạn hiện tại

| Hiện tượng | Cách kiểm tra |
| --- | --- |
| Project/bài viết không xuất hiện | Kiểm tra `published: true`, lưu file và đúng mảng dữ liệu |
| Project xuất hiện sai vị trí | Kiểm tra thứ tự trong mảng, kể cả các mục đang ẩn |
| Đã sửa nhưng trang trực tuyến vẫn cũ | Build và triển khai lại đúng nơi đang xem |
| Vẫn còn nhãn “Mẫu” | Đặt `example: false` |
| Không thấy nút mở demo/repository | Kiểm tra `url` có `http://` hoặc `https://` |
| Website báo lỗi sau khi thêm nội dung | Kiểm tra dấu phẩy giữa các mục, dấu nháy và dấu `]`/`}`; chạy kiểm tra TypeScript |
| Có dấu nháy đơn trong câu | Dùng chuỗi nháy kép, ví dụ `"Mình đang đọc Developer's Guide."` |
| Tiêu đề quá dài trên điện thoại | Rút gọn chữ hoặc chỉnh kích thước và ngắt dòng trong CSS mobile |
| Chữ Markdown hiện nguyên dấu `**` | Nội dung bài hiện là văn bản thuần, chưa có trình đọc Markdown |
| Ảnh không xuất hiện | Kiểm tra ảnh trong `public`, đúng chữ hoa/thường, và JSX đã dùng đường dẫn tương ứng |
| Menu bấm vào không đến nội dung | Kiểm tra đích `href="#..."` khớp với `id` của section |

Trong file TypeScript, dùng dấu nháy thẳng `'` hoặc `"`, không dùng dấu nháy cong để bao chuỗi. `true`/`false` là giá trị boolean, không viết thành `'true'`/`'false'`. Không đặt trùng `id` giữa các mục trong cùng danh sách.

Website hiện chưa có trang quản trị, đăng nhập để viết bài, tải repository tự động, ảnh bìa theo project, Markdown/MDX, URL riêng từng bài, tìm kiếm hoặc bình luận. Những phần đó cần thêm chức năng; không thể bật chỉ bằng một trường cấu hình đang có.
