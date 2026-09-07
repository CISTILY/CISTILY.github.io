import fs from 'node:fs';
import path from 'node:path';
const [collection, slug, locale = 'vi', extra] = process.argv.slice(2);
if (
  !['research', 'gallery', 'posts'].includes(collection) ||
  !slug ||
  !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
  !['vi', 'en'].includes(locale) ||
  extra
) {
  console.error(
    'Dùng: npm run new:research -- ten-muc [vi|en] (hoặc new:gallery / new:post). Tên chỉ gồm chữ thường không dấu, số và dấu gạch ngang.',
  );
  process.exit(1);
}
const directory = path.resolve('content', locale, collection);
const target = path.join(directory, `${slug}.md`);
try {
  fs.writeFileSync(
    target,
    fs.readFileSync(path.join(directory, '_template.md'), 'utf8'),
    { flag: 'wx' },
  );
  console.log(
    `Đã tạo ${path.relative(process.cwd(), target)}. Điền nội dung rồi đổi published: false thành true khi sẵn sàng.`,
  );
} catch (error) {
  if (error.code === 'EEXIST')
    console.error(
      'Mục này đã tồn tại. Chọn một tên khác; file cũ được giữ nguyên.',
    );
  else console.error(error.message);
  process.exitCode = 1;
}
