// ============================================================
// News Detail Page (Enhanced Design)
// ============================================================
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, Newspaper, ArrowRight } from 'lucide-react';
import { news, formatDate } from '../data/data';
import { useState } from 'react';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = news.find((n) => n.slug === slug);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center mx-auto mb-4">
            <Newspaper className="w-8 h-8 text-accent/30" />
          </div>
          <h1 className="text-xl font-medium text-text-primary mb-2">Artigo não encontrado</h1>
          <Link to="/news" className="text-accent hover:underline text-sm">
            Voltar para News
          </Link>
        </div>
      </div>
    );
  }

  // Estimate reading time (~200 words per minute)
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Get related articles (excluding current)
  const relatedArticles = news.filter(n => n.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg">
      {/* Cover Hero - Enhanced */}
      <div className="relative">
        <div className="aspect-[21/9] sm:aspect-[2.5/1] overflow-hidden">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />

        {/* Back button - Enhanced */}
        <Link
          to="/news"
          className="group absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors z-10 px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm hover:bg-black/40"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          News
        </Link>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all backdrop-blur-sm ${
              isBookmarked
                ? 'bg-accent/90 text-white'
                : 'bg-black/30 text-white/70 hover:bg-black/40 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="w-10 h-10 rounded-xl bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/40 hover:text-white transition-all flex items-center justify-center"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content - Enhanced */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative">
        {/* Article Card */}
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-10 mb-10 shadow-2xl shadow-black/20">
          {/* Meta - Enhanced */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border/50">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                <Calendar className="h-3.5 w-3.5 text-accent" />
              </div>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-accent" />
              </div>
              {article.author}
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="h-3.5 w-3.5 text-accent" />
              </div>
              {readingTime} min de leitura
            </div>
          </div>

          {/* Title - Enhanced */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Accent Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-accent rounded-full" />
            <span className="text-xs text-text-muted">Artigo</span>
          </div>

          {/* Body - Enhanced */}
          <div className="space-y-5">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="text-base sm:text-[1.05rem] leading-[1.85] text-text-secondary"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Share & Actions */}
        <div className="flex items-center justify-between p-5 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl mb-10">
          <div>
            <p className="text-sm font-medium text-text-primary">Gostou deste artigo?</p>
            <p className="text-xs text-text-muted">Compartilhe com seus amigos</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-all border border-accent/20"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>

        {/* Related Articles - New */}
        {relatedArticles.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 bg-accent rounded-full" />
              <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Artigos relacionados</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/news/${related.slug}`}
                  className="group overflow-hidden rounded-xl border border-border/50 bg-card/40 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={related.cover}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted mb-2">
                      <Calendar className="h-3 w-3" />
                      <time dateTime={related.date}>{formatDate(related.date)}</time>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent group-hover:gap-1.5 transition-all">
                      Ler artigo
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA - Enhanced */}
        <div className="py-8 border-t border-border/50 text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Newspaper className="w-6 h-6 text-accent" />
          </div>
          <p className="text-base font-medium text-text-primary mb-2">Explore mais conteúdo</p>
          <p className="text-sm text-text-muted mb-6">Descubra mais artigos e novidades do NeonCast</p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:-translate-y-0.5"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}
