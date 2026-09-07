import type { Metadata } from "next";
import { SiteFrame } from "../components/site-frame";
import { news } from "../site-data";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <SiteFrame active="news">
      <main className="route-main watermark-page">
        <section className="news-hub section-pad" aria-label="News">
          <div className="publication-list news-list">
            {news.map((item) => (
              <a className="publication news-item" data-reveal href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                <time className="publication-year" dateTime={item.date}>{item.date.replaceAll("-", ".")}</time>
                <span className="publication-main">
                  <strong>{item.title}</strong>
                  <em className="zh-copy" lang="zh-CN">{item.titleZh}</em>
                  <small>{item.source}</small>
                </span>
                <span className="publication-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
