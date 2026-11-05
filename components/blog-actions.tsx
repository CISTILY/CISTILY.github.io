import fs from 'node:fs';
import path from 'node:path';
import { blogLinks } from '@/lib/blog';
import type { Locale } from '@/lib/locale';

export function BlogActions({ locale, slug }: { locale: Locale; slug?: string }) {
  const en = locale === 'en';
  const template = fs.readFileSync(path.join(process.cwd(), 'content', locale, 'posts', '_template.md'), 'utf8');
  const links = blogLinks(locale, template, slug);
  return (
    <details className="blog-management">
      <summary>{en ? 'Manage blog' : 'Quản lý blog'} <span>GitHub ↗</span></summary>
      <p>{en
        ? 'For the site owner. Sign in to GitHub with repository write access. Changes go live after committing to main and a successful deployment.'
        : 'Dành cho chủ website. Đăng nhập GitHub bằng tài khoản có quyền ghi repository. Thay đổi xuất hiện sau khi commit vào main và triển khai thành công.'}</p>
      <div className="blog-actions">
        <a href={links.create} target="_blank" rel="noreferrer">{en ? '+ Add post' : '+ Thêm bài viết'}</a>
        {links.edit && <a href={links.edit} target="_blank" rel="noreferrer">{en ? 'Edit post' : 'Sửa bài viết'}</a>}
        {links.delete && <a className="blog-delete" href={links.delete} target="_blank" rel="noreferrer">{en ? 'Delete post' : 'Xóa bài viết'}</a>}
        <a href={links.browse} target="_blank" rel="noreferrer">{en ? 'All files & drafts' : 'Tất cả file & bản nháp'}</a>
      </div>
      <p>{en
        ? 'New post: name the file using lowercase letters, digits and hyphens, ending in .md (e.g. my-first-post.md). Fill in the template and set published: true to publish. Deletion must be confirmed on GitHub.'
        : 'Bài mới: đặt tên file bằng chữ thường không dấu, số và dấu gạch ngang, đuôi .md (ví dụ: bai-viet-moi.md). Điền mẫu và đặt published: true để xuất bản. Việc xóa cần được xác nhận trên GitHub.'}</p>
    </details>
  );
}
