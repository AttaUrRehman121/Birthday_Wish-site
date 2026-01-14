/* eslint-disable react/no-unknown-property */
'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export type DiaryPage = {
  id: string;
  title: string;
  quote: string;
  /** Put your image in /public and pass like `/memories/1.jpg` */
  image: string | null;
};

type DiaryFlipbookProps = {
  pages: DiaryPage[];
  coverTitle?: string;
  coverSubtitle?: string;
};

export default function DiaryFlipbook({
  pages,
  coverTitle = 'Secret Diary',
  coverSubtitle = 'Click the cover to open',
}: DiaryFlipbookProps) {
  const safePages = useMemo(() => {
    const cover: DiaryPage = {
      id: '__cover__',
      title: coverTitle,
      quote: coverSubtitle,
      image: null,
    };
    // cover is a real first sheet, so it flips like a page (right -> left)
    return [cover, ...pages].slice(0, Math.max(11, pages.length + 1));
  }, [coverSubtitle, coverTitle, pages]);
  const [flipIndex, setFlipIndex] = useState(0); // how many pages have been flipped (0..n)

  const total = safePages.length;
  const contentTotal = Math.max(0, total - 1); // ignore cover in page count

  function next() {
    setFlipIndex((i) => Math.min(i + 1, total));
  }

  function prev() {
    setFlipIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <div className="diary-wrap">
      <div className="diary-book diary-perspective">
        {/* hard cover behind pages */}
        <div className="diary-cover" />
        <div className="diary-cover-edge diary-cover-edge-top" />
        <div className="diary-cover-edge diary-cover-edge-bottom" />
        <div className="diary-spine" />

        {/* Left page (current) */}
        <div className="diary-left" onClick={prev} role="button" aria-label="Previous page">
          {flipIndex === 0 ? (
            <LeftInsideCover />
          ) : (
            <PageFace page={safePages[Math.max(0, flipIndex - 1)]} side="left" pageNo={flipIndex} />
          )}
          <div className="diary-corner diary-corner-left" />
        </div>

        {/* Right stack: pages that can flip */}
        <div className="diary-right">
          {safePages.map((p, idx) => {
            const isFlipped = idx < flipIndex;
            const z = total - idx;
            const isCover = p.id === '__cover__';
            const isLastSheet = idx === total - 1;
            return (
              <motion.div
                key={p.id}
                className={`diary-sheet ${isFlipped ? 'diary-sheet-flipped' : 'diary-sheet-unflipped'}`}
                style={{ zIndex: z }}
                initial={false}
                animate={{
                  // cover opens like a real book cover (~155deg), pages flip fully
                  rotateY: isFlipped ? (isCover ? -155 : -180) : 0,
                }}
                transition={{
                  // match the HTML demo feel: slower, smooth hinge
                  duration: isCover ? 1.6 : 1.15,
                  ease: isCover ? [0.4, 0, 0.2, 1] : [0.2, 0.8, 0.2, 1],
                }}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (!isFlipped) next();
                }}
              >
                <div className="diary-face diary-face-front">
                  <PageFace page={p} side="right" pageNo={idx + 1} />
                </div>
                <div className="diary-face diary-face-back">
                  {/* Back side becomes the left page content once flipped */}
                  <PageBack page={p} isLast={isLastSheet} />
                </div>
              </motion.div>
            );
          })}
          <div className="diary-corner diary-corner-right" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
          onClick={prev}
          disabled={flipIndex === 0}
        >
          ← Prev
        </button>
        <div className="text-sm text-gray-600">
          {flipIndex === 0 ? (
            <span className="font-semibold text-purple-700">Cover</span>
          ) : (
            <>
              Page{' '}
              <span className="font-semibold">
                {Math.min(flipIndex, contentTotal)}
              </span>{' '}
              / {contentTotal}
            </>
          )}
        </div>
        <button
          className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
          onClick={next}
          disabled={flipIndex >= total}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function PageFace({ page, side, pageNo }: { page?: DiaryPage; side: 'left' | 'right'; pageNo: number }) {
  const isCover = page?.id === '__cover__';
  return (
    <div className={`diary-page diary-page-${side} ${isCover ? 'diary-front-cover' : ''}`}>
      <div className="diary-page-header">
        <div className="diary-page-title">{page?.title ?? '—'}</div>
        <div className="diary-page-no">{isCover ? '★' : pageNo}</div>
      </div>

      {isCover ? (
        <FrontCoverBody subtitle={page?.quote ?? ''} />
      ) : (
        <>
          <div className="diary-photo diary-photo-frame">
            <div className="diary-tape diary-tape-left" />
            <div className="diary-tape diary-tape-right" />
            {page?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={page.image} alt={page.title} className="diary-photo-img" />
            ) : (
              <div className="diary-photo-ph">
                <div className="text-5xl">📸</div>
                <div className="mt-2 text-xs text-gray-600">Drop an image in /public and set page.image</div>
              </div>
            )}
          </div>

          <div className="diary-quote diary-quote-card">“{page?.quote ?? ''}”</div>
        </>
      )}
    </div>
  );
}

function PageBack({ page, isLast }: { page: DiaryPage; isLast: boolean }) {
  if (page.id === '__cover__') {
    return (
      <div className="diary-page diary-page-left diary-inside-cover">
        <div className="diary-inside-cover-top">
          <div className="text-5xl">✨</div>
          <div className="mt-2 text-xl font-extrabold text-purple-900">Welcome inside</div>
          <div className="mt-1 text-sm text-gray-600">Now the memories begin…</div>
        </div>
        <div className="diary-inside-cover-body">
          <div className="diary-stamp">OPENED</div>
          <div className="diary-lines" />
        </div>
        <div className="diary-inside-cover-bottom text-sm text-gray-500">Turn pages →</div>
      </div>
    );
  }
  return (
    <div className="diary-page diary-page-left">
      <div className="diary-page-header">
        <div className="diary-page-title">{isLast ? 'Thank You' : page.title}</div>
        <div className="diary-page-no">{isLast ? '♥' : '✦'}</div>
      </div>
      <div className={`diary-back-pattern ${isLast ? 'diary-back-thankyou' : ''}`}>
        {isLast ? (
          <>
            <div className="text-5xl mb-2">🙏</div>
            <div className="text-center text-gray-800 font-semibold text-lg">
              Thank you for being part of these memories.
            </div>
            <div className="mt-2 text-center text-gray-500 text-sm">
              You make every chapter of life more special. 💖
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl">💌</div>
            <div className="mt-4 text-center text-gray-700 font-semibold">A memory worth keeping</div>
            <div className="mt-2 text-center text-gray-500 text-sm">Turn the page…</div>
          </>
        )}
      </div>
    </div>
  );
}

function LeftInsideCover() {
  return (
    <div className="diary-page diary-page-left diary-inside-cover">
      <div className="diary-inside-cover-top">
        <div className="text-5xl">📖</div>
        <div className="mt-2 text-xl font-extrabold text-purple-900">Secret Diary</div>
        <div className="mt-1 text-xs text-gray-500">Tap the right page to begin →</div>
      </div>
      <div className="diary-inside-cover-body">
        <div className="diary-stamp">PRIVATE</div>
        <div className="diary-lines" />
        <div className="diary-note-body">
          <p className="diary-note-main">
            For the most amazing friend and brother — this little book is all about you.
          </p>
          <p className="diary-note-sub">Every page holds a moment I never want to forget. 💖</p>
        </div>
      </div>
      <div className="diary-inside-cover-bottom text-sm text-gray-500">
        Made with ❤️
      </div>
    </div>
  );
}

function FrontCoverBody({ subtitle }: { subtitle: string }) {
  return (
    <div className="diary-cover-body">
      <div className="diary-cover-bunting">
        {['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'].map((c, i) => (
          <div
            key={i}
            className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent"
            style={{ borderTopColor: c }}
          />
        ))}
      </div>
      <div className="diary-cover-title">HAPPY</div>
      <div className="diary-cover-title2">BIRTHDAY</div>
      <div className="diary-cover-sub">{subtitle}</div>
      <div className="diary-cover-icons">
        <div className="diary-cover-icon">🎈</div>
        <div className="diary-cover-icon">🎂</div>
        <div className="diary-cover-icon">🎁</div>
      </div>
      <div className="diary-cover-hint">Click this cover to open →</div>
    </div>
  );
}


