'use client';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
export function ReadingCard({
  title,
  description,
  paragraphs,
  url,
  label,
  compact = false,
}: {
  title: string;
  description: string;
  paragraphs: string[];
  url?: string;
  label: string;
  compact?: boolean;
}) {
  const safeUrl = url && /^https?:\/\//i.test(url) ? url : undefined;
  return (
    <Dialog>
      <DialogTrigger
        className={compact ? 'read-button' : 'project-read'}
        aria-label={`${label}: ${title}`}
      >
        {!compact && label}
        {compact ? <ArrowUpRight size={23} /> : <ArrowRight size={17} />}
      </DialogTrigger>
      <DialogContent className="reading-dialog" showCloseButton={false}>
        <DialogClose className="dialog-close" aria-label="Đóng">
          <X size={21} />
        </DialogClose>
        <span className="eyebrow">GÓC CHIA SẺ</span>
        <DialogTitle className="reading-title">{title}</DialogTitle>
        <DialogDescription className="reading-description">
          {description}
        </DialogDescription>
        <div className="article-body">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {safeUrl && (
          <a
            className="button primary"
            href={safeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Xem project <ArrowUpRight size={18} />
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
