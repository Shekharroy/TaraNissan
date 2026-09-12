import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { NEWS_ITEMS } from '../data/nissanData';

export const NewsSection: React.FC = () => {
  return (
    <section 
      id="latest-news-section"
      className="py-16 sm:py-20 bg-white dark:bg-[#121212] border-b border-[#e5e5e5] dark:border-[#222222] transition-colors duration-200"
      aria-label="Nissan Latest News"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="nissan-strapline text-[#c3002f] mb-2">
              MEDIA & ANNOUNCEMENTS
            </div>
            <h2 className="nissan-section-title text-[#111111] dark:text-white">
              LATEST NEWS FROM NISSAN INDIA
            </h2>
          </div>
          <a
            href="https://www.nissan.in/latest-news.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 text-[13px] font-nissan-bold text-[#c3002f] hover:underline uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Visit Newsroom</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item) => (
            <article
              key={item.id}
              className="border border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] flex flex-col justify-between group hover:border-black dark:hover:border-neutral-500 transition-colors"
            >
              <div>
                <div className="h-48 overflow-hidden bg-black">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[12px] text-[#888888] dark:text-[#a0a0a0] mb-3">
                    <span className="font-nissan-bold text-[#c3002f] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-nissan-bold text-[#111111] dark:text-white mb-3 leading-snug group-hover:text-[#c3002f] dark:group-hover:text-[#ff3b5c] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#555555] dark:text-[#a8a8a8] font-nissan-regular leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-[12px] font-nissan-bold text-[#111111] dark:text-white group-hover:text-[#c3002f] dark:group-hover:text-[#ff3b5c] uppercase tracking-wider inline-flex items-center gap-1">
                  Read Full Press Release &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
