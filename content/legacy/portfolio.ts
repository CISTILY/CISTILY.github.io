// Lưu lại dữ liệu phiên bản trước; website mới KHÔNG đọc file này.
// Chỉnh hồ sơ trong content/site.json và các file content/about/*.md.
// Thêm nội dung trong content/research, content/gallery hoặc content/posts.
export const profile = {
  name: 'CISTILY',
  tagline: 'Không ngừng tò mò. Không ngừng xây dựng.',
  intro:
    'Chào mừng đến với không gian của mình — nơi lưu lại những điều đang học, những thứ đang làm và những ý tưởng muốn chia sẻ.',
  about:
    'Mình yêu thích việc khám phá cách mọi thứ hoạt động và biến những điều học được thành sản phẩm có thể sử dụng. Website này là nơi mình ghi lại hành trình ấy, từng project và từng bài viết một.',
  direction:
    'Phát triển nền tảng chuyên môn vững chắc, học qua những bài toán thực tế và tạo ra các sản phẩm hữu ích. Đây là phần định hướng mẫu; hãy thay bằng mục tiêu của bạn.',
  interests: ['Công nghệ', 'Xây dựng sản phẩm', 'Tự học', 'Chia sẻ kiến thức'],
  github: 'https://github.com/CISTILY',
  email: '',
  education: [
    {
      period: 'THỜI GIAN HỌC · CẦN CẬP NHẬT',
      school: 'Tên trường của bạn',
      major: 'Chuyên ngành / Chương trình học',
      description:
        'Thêm môn học yêu thích, hoạt động hoặc dấu mốc đáng nhớ trong hành trình học tập.',
    },
  ],
};
export type Project = {
  id: string;
  published: boolean;
  example?: boolean;
  title: string;
  category: string;
  coverLabel: string;
  description: string;
  tags: string[];
  content: string[];
  url?: string;
};
export const projects: Project[] = [
  {
    id: 'personal-website',
    published: true,
    title: 'Không gian cá nhân',
    category: 'WEB DEVELOPMENT',
    coverLabel: 'hello, world_',
    description:
      'Một ngôi nhà trên internet cho những project, bài viết và hành trình phát triển của mình.',
    tags: ['React', 'TypeScript', 'Portfolio'],
    content: [
      'Website này tập hợp giới thiệu cá nhân, định hướng, học vấn, project và blog trong một giao diện thống nhất.',
      'Nội dung được tách khỏi giao diện để dễ cập nhật. Mỗi project có mô tả, công nghệ sử dụng, nội dung chi tiết và liên kết đến mã nguồn hoặc bản demo.',
      'Các project và bài viết có thể được bật hoặc ẩn độc lập. Giao diện thích ứng với màn hình điện thoại và máy tính.',
    ],
    url: 'https://github.com/CISTILY/CISTILY.github.io',
  },
  {
    id: 'your-next-project',
    published: true,
    example: true,
    title: 'Project tiếp theo của bạn',
    category: 'YOUR NEXT IDEA',
    coverLabel: 'work in progress.',
    description:
      'Dành chỗ cho một bài toán thú vị, một thử nghiệm mới hoặc một sản phẩm bạn muốn giới thiệu.',
    tags: ['Ý tưởng', 'Thử nghiệm'],
    content: [
      'Đây là project mẫu, không phải một thành tích đã thực hiện. Bạn có thể thay thế hoặc ẩn mục này.',
      'Một mô tả project tốt thường trả lời ba câu hỏi: bạn giải quyết vấn đề gì, bạn đã làm gì và kết quả ra sao?',
      'Thêm liên kết đến repository hoặc bản demo khi project sẵn sàng để mọi người khám phá.',
    ],
  },
  {
    id: 'hidden-example',
    published: false,
    example: true,
    title: 'Project đang ẩn',
    category: 'EXPERIMENT',
    coverLabel: 'next chapter_',
    description: 'Đổi published thành true để hiện project này.',
    tags: ['Demo'],
    content: ['Thay nội dung trước khi đưa project lên website.'],
  },
];
export const posts = [
  {
    id: 'first-note',
    published: true,
    example: true,
    title: 'Bắt đầu từ một góc nhỏ trên internet',
    category: 'Ghi chép',
    readingTime: '2 phút đọc',
    description:
      'Một nơi để lưu lại hành trình, thay vì chờ đến khi mọi thứ hoàn hảo.',
    content: [
      'Đây là bài viết mẫu để minh họa cách blog hiển thị. Hãy thay bằng câu chuyện của riêng bạn khi sẵn sàng.',
      'Một website cá nhân có thể bắt đầu rất đơn giản: vài dòng giới thiệu, một project đã làm và một điều vừa học được. Giá trị của nó lớn dần theo những ghi chép được bổ sung.',
      'Bạn không cần đợi một thành tựu lớn mới viết. Một lỗi vừa tìm ra nguyên nhân, một cách giải quyết dễ hiểu hơn hay một câu hỏi còn bỏ ngỏ đều có thể là khởi đầu.',
    ],
  },
  {
    id: 'learn-by-building',
    published: true,
    example: true,
    title: 'Học bằng cách làm: từ ý tưởng đến project đầu tiên',
    category: 'Học tập',
    readingTime: '3 phút đọc',
    description:
      'Chia một ý tưởng lớn thành những bước đủ nhỏ để bắt đầu ngay hôm nay.',
    content: [
      'Đây là bài viết mẫu. Bạn có thể chỉnh sửa, thay thế hoặc ẩn bài này trong tệp nội dung.',
      'Bắt đầu bằng một vấn đề cụ thể. Ai sẽ sử dụng sản phẩm? Họ cần hoàn thành điều gì? Một câu trả lời rõ ràng sẽ giúp bạn chọn tính năng đầu tiên.',
      'Xây dựng phiên bản nhỏ nhất có thể sử dụng, rồi thử nó với dữ liệu thực tế. Ghi lại những điều chưa tốt và cải thiện từng phần.',
      'Khi kết thúc, dành thời gian viết lại những quyết định, khó khăn và bài học. Phần ghi chép đó vừa giúp bạn nhìn lại, vừa giúp người khác hiểu project hơn.',
    ],
  },
];
