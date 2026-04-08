// ============================================================
// News Listing Page (Enhanced Design)
// ============================================================
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ArrowRight, Clock, User, Sparkles } from 'lucide-react';
import { news, formatDate } from '../data/data';

export default function News() {
  const featured = news[0];
  const rest = news.slice(1);

  const getReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero - Enhanced */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-center gap-2 mb-3">
            <Newspaper className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Blog & Novidades
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-3">
            Fique por dentro do
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60"> universo NeonCast</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-lg leading-relaxed">
            Novidades, bastidores e tudo sobre o mundo das séries em áudio.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Article - Enhanced */}
        {featured && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Destaque</h2>
            </div>
            <Link
              to={`/news/${featured.slug}`}
              className="group block"
            >
              <article className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 group-hover:-translate-y-1">
                <div className="grid sm:grid-cols-2 gap-0">
                  <div className="aspect-video sm:aspect-auto overflow-hidden">
                    <img
                      src={featured.cover}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                      </div>
                      <span className="text-border">·</span>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {featured.author}
                      </div>
                      <span className="text-border">·</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {getReadingTime(featured.content)} min
                      </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors mb-3 leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-6">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                      Ler artigo completo
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Other Articles - Enhanced */}
        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-5 bg-accent rounded-full" />
              <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Mais recentes</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <Link
                  key={article.id}
                  to={`/news/${article.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/50 bg-card/40 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={article.cover}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                      </div>
                      <span className="text-border">·</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {getReadingTime(article.content)} min
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-text-muted/70 leading-relaxed line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:gap-2 transition-all">
                      Ler mais
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Newsletter CTA - New */}
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 p-8 sm:p-10 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
            <div className="relative">
              <Newspaper className="w-8 h-8 text-accent mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                Não perca nenhuma novidade
              </h3>
              <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
                Acompanhe nossas novidades e fique por dentro de todos os lançamentos do NeonCast.
              </p>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 text-accent text-sm font-semibold hover:bg-accent/20 transition-all border border-accent/20"
              >
                Explorar catálogo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
