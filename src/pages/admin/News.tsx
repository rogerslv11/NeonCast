import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Grid3X3,
  List,
  Eye,
  Pencil,
  Trash2,
  FileText,
  Users,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { news, type NewsArticle } from '../../data/data';
import AdminLayout from '../../components/AdminLayout';

type ViewMode = 'grid' | 'table';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '...';
}

export default function News() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const filtered = useMemo(() => {
    if (!search.trim()) return news;
    const q = search.toLowerCase();
    return news.filter(
      (article: NewsArticle) =>
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q)
    );
  }, [search]);

  const authorStats = useMemo(() => {
    const map: Record<string, number> = {};
    news.forEach((a: NewsArticle) => {
      map[a.author] = (map[a.author] || 0) + 1;
    });
    return Object.entries(map)
      .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
      .map(([author, count]: [string, number]) => ({ author, count }));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              Gerenciar Not&iacute;cias
            </h1>
            <p className="text-text-secondary mt-1">
              Crie, edite e organize os artigos do blog NeonCast.
            </p>
          </div>
          <Link
            to="/admin/news/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20 font-semibold text-sm hover:bg-accent/20 hover:border-accent/30 transition-all duration-200 shadow-lg shadow-accent/5 self-start"
          >
            <Plus className="w-4 h-4" />
            Add New Article
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total */}
          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-5 group hover:border-accent/30 transition-all duration-300">
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300" />
            <div className="relative">
              <div className="flex items-center gap-2 text-text-muted text-xs font-semibold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                Total Artigos
              </div>
              <p className="text-3xl font-bold text-text-primary mt-2">{news.length}</p>
              <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>Publicados</span>
              </div>
            </div>
          </div>

          {authorStats.slice(0, 3).map(({ author, count }, i) => {
            const icons = [Users, Users, Users];
            const accents = [
              'text-violet-400',
              'text-sky-400',
              'text-amber-400',
            ];
            const bgAccents = [
              'bg-violet-500/5 group-hover:bg-violet-500/10',
              'bg-sky-500/5 group-hover:bg-sky-500/10',
              'bg-amber-500/5 group-hover:bg-amber-500/10',
            ];
            const borderAccents = [
              'hover:border-violet-400/30',
              'hover:border-sky-400/30',
              'hover:border-amber-400/30',
            ];
            const Icon = icons[i] ?? Users;
            return (
              <div
                key={author}
                className={`relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-5 group ${borderAccents[i]} transition-all duration-300`}
              >
                <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${bgAccents[i]} transition-colors duration-300`} />
                <div className="relative">
                  <div className={`flex items-center gap-2 ${accents[i]} text-xs font-semibold uppercase tracking-wider`}>
                    <Icon className="w-3.5 h-3.5" />
                    {author}
                  </div>
                  <p className="text-3xl font-bold text-text-primary mt-2">{count}</p>
                  <div className="flex items-center gap-1 mt-1 text-text-muted text-xs font-medium">
                    <FileText className="w-3 h-3" />
                    <span>artigo{count > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search + view toggle */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por t&iacute;tulo, conte&uacute;do ou autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/60 border border-border/40 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-1 bg-card/60 border border-border/40 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              Tabela
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              Grid
            </button>
          </div>
        </div>

        {/* Results count */}
        {search && (
          <p className="text-xs text-text-muted">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &ldquo;{search}&rdquo;
          </p>
        )}

        {/* LIST */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="w-12 h-12 text-text-muted/30 mb-4" />
            <p className="text-text-secondary font-medium">Nenhum artigo encontrado</p>
            <p className="text-text-muted text-sm mt-1">Tente ajustar sua busca.</p>
          </div>
        ) : viewMode === 'table' ? (
          /* TABLE VIEW */
          <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Capa</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">T&iacute;tulo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden xl:table-cell">Resumo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Autor</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:table-cell">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Data</span>
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">A&ccedil;&otilde;es</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((article, idx) => (
                    <tr
                      key={article.id}
                      className="border-b border-border/20 hover:bg-white/[0.02] transition-colors duration-150 last:border-b-0"
                    >
                      <td className="px-4 py-3">
                        <div className="w-14 h-9 rounded-lg overflow-hidden bg-white/5 border border-border/20 flex-shrink-0">
                          <img
                            src={article.cover}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-text-primary line-clamp-1 max-w-xs">{article.title}</p>
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        <p className="text-text-muted text-xs line-clamp-2 max-w-sm">{truncate(article.excerpt, 90)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 text-text-secondary text-xs font-medium">
                          {article.author}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-text-muted text-xs">{formatDate(article.date)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/news/${article.slug}`}
                            target="_blank"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                            title="Ver artigo"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to={`/admin/news/${article.id}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                            title="Editar"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((article) => (
              <div
                key={article.id}
                className="group relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Cover image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                  {/* Overlay actions */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link
                      to={`/news/${article.slug}`}
                      target="_blank"
                      className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-sky-400 hover:bg-black/70 transition-all"
                      title="Ver artigo"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/admin/news/${article.id}`}
                      className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-amber-400 hover:bg-black/70 transition-all"
                      title="Editar"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-red-400 hover:bg-black/70 transition-all"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-text-primary text-sm line-clamp-2 group-hover:text-accent transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-text-muted text-xs line-clamp-2 leading-relaxed">
                    {truncate(article.excerpt, 100)}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/20">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 text-text-secondary text-[11px] font-medium">
                      {article.author}
                    </span>
                    <span className="text-text-muted text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
