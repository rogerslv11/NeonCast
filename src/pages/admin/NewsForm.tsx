import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Trash2,
  X,
  Image,
  Type,
  AlignLeft,
  FileText,
  Check,
  Eye,
  Sparkles,
  AlertCircle,
  Link2,
  Calendar,
  User,
  Newspaper,
  Pencil,
  Globe,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { news, type NewsArticle } from '../../data/data';

export default function NewsForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingNews = isEdit ? news.find((n: NewsArticle) => n.id === id) : null;

  const [activeTab, setActiveTab] = useState<'content' | 'preview'>('content');
  const [title, setTitle] = useState(existingNews?.title || '');
  const [excerpt, setExcerpt] = useState(existingNews?.excerpt || '');
  const [content, setContent] = useState(existingNews?.content || '');
  const [coverUrl, setCoverUrl] = useState(existingNews?.cover || '');
  const [author, setAuthor] = useState(existingNews?.author || '');
  const [date, setDate] = useState(existingNews?.date || new Date().toISOString().split('T')[0]);
  const [slug, setSlug] = useState(existingNews?.slug || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && title) {
      const generatedSlug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  }, [title, isEdit]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formErrors = [];
  if (!title.trim()) formErrors.push('Título é obrigatório');
  if (excerpt.length < 10) formErrors.push('Resumo deve ter pelo menos 10 caracteres');
  if (content.length < 50) formErrors.push('Conteúdo deve ter pelo menos 50 caracteres');
  if (!author.trim()) formErrors.push('Autor é obrigatório');

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <AdminLayout>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px -5px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 30px 0px rgba(245, 158, 11, 0.5); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
        }
        .input-focus {
          transition: all 0.2s ease;
        }
        .input-focus:focus {
          transform: translateY(-1px);
        }
        .glass-effect {
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
      `}</style>

      <div className="space-y-4 sm:space-y-6">
        {/* ==================== HEADER ==================== */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-card/30 glass-effect border border-border/50 p-4 sm:p-6 card-hover">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/8 to-orange-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-32 h-32 bg-amber-500/3 rounded-full blur-xl pointer-events-none animate-pulse" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/admin/news')}
                className="group w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-text-muted/70 hover:text-text-primary hover:border-amber-500/40 hover:bg-amber-500/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center shadow-xl ring-2 ring-white/10 flex-shrink-0">
                    <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                    <div className="absolute inset-0 rounded-xl bg-white/5 animate-shimmer" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                      {isEdit ? 'Editar Notícia' : 'Nova Notícia'}
                    </h1>
                    <p className="text-xs sm:text-sm text-text-muted/70 flex items-center gap-1.5 flex-wrap">
                      {isEdit ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                          Editando: <span className="text-amber-400 font-semibold truncate">{existingNews?.title}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-400/60 flex-shrink-0" />
                          <span className="hidden sm:inline">Preencha os dados para criar uma nova notícia</span>
                          <span className="sm:hidden">Criar nova notícia</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {isEdit && (
                <button className="group inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/15 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/10">
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline ml-2">Excluir</span>
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={formErrors.length > 0}
                className={`group inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg hover:shadow-xl w-full sm:w-auto ${
                  saved
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 text-green-400 hover:shadow-green-500/20'
                    : 'bg-gradient-to-r from-accent to-pink-500 text-white shadow-accent/25 hover:shadow-accent/40 hover:scale-105'
                }`}
              >
                {saved ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                      <Check className="w-3 h-3" />
                    </div>
                    Salvo com sucesso!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform mr-2" />
                    <span className="sm:hidden">Salvar</span>
                    <span className="hidden sm:inline">Salvar Notícia</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Form Validation Errors */}
        {formErrors.length > 0 && (
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/8 to-red-500/3 p-4 sm:p-5 flex items-start gap-3 sm:gap-4 animate-fade-in-up">
            <div className="absolute inset-0 animate-shimmer" />
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-red-400 mb-1.5 sm:mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0"></span>
                <span className="hidden sm:inline">Campos obrigatórios</span>
                <span className="sm:hidden">Erros</span>
              </p>
              <ul className="text-[10px] sm:text-xs text-red-400/80 space-y-1 sm:space-y-1.5">
                {formErrors.map((err, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></span>
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ==================== TAB NAVIGATION ==================== */}
        <div className="relative overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 sm:gap-2 bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl p-1.5 w-fit sm:w-auto shadow-lg min-w-max sm:min-w-0">
            {[
              { value: 'content' as const, label: 'Conteúdo', labelShort: 'Conteúdo', icon: Pencil, color: 'from-amber-500 to-orange-500' },
              { value: 'preview' as const, label: 'Pré-visualizar', labelShort: 'Preview', icon: Eye, color: 'from-emerald-500 to-green-500' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 ${
                  activeTab === tab.value
                    ? 'text-white shadow-xl'
                    : 'text-text-muted/60 hover:text-text-primary hover:bg-card/60'
                }`}
              >
                {activeTab === tab.value && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-lg sm:rounded-xl shadow-lg`} />
                )}
                <tab.icon className={`w-4 h-4 relative z-10 ${activeTab === tab.value ? 'scale-110' : 'group-hover:scale-110'} transition-transform flex-shrink-0`} />
                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                <span className="relative z-10 sm:hidden">{tab.labelShort}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ==================== CONTENT TAB ==================== */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
            {/* Left - Main Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Title & Excerpt */}
              <div className="group rounded-xl sm:rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl overflow-hidden card-hover shadow-lg hover:shadow-2xl">
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border/40 flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Type className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-amber-500/5 animate-shimmer" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm sm:text-base font-bold text-text-primary truncate">Título e Resumo</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Informações principais da notícia</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  {/* Title */}
                  <div className="group/input">
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Type className="w-4 h-4 text-amber-400" />
                      </div>
                      Título da Notícia
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: NeonCast lança novas séries exclusivas"
                      className="w-full px-4 py-3.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all input-focus shadow-lg focus:shadow-xl"
                    />
                  </div>

                  {/* Slug */}
                  <div className="group/input">
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-400" />
                      </div>
                      Slug (URL amigável)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs text-text-muted/40 flex-shrink-0">/news/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="titulo-da-noticia"
                        className="flex-1 px-4 py-3.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all input-focus shadow-lg focus:shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="group/input">
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <AlignLeft className="w-4 h-4 text-orange-400" />
                      </div>
                      Resumo / Excerpt
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Breve descrição que aparecerá nos cards e listagens..."
                      rows={3}
                      className="w-full px-4 py-3.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all resize-none input-focus shadow-lg focus:shadow-xl"
                    />
                    <div className="flex items-center justify-between mt-2.5 px-1">
                      <p className={`text-xs ${excerpt.length < 10 ? 'text-red-400 font-medium' : 'text-text-muted/50'} flex items-center gap-1.5`}>
                        {excerpt.length < 10 && <AlertCircle className="w-3.5 h-3.5" />}
                        Mínimo 10 caracteres
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-border/30 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${excerpt.length < 10 ? 'bg-red-400' : 'bg-amber-400'}`}
                            style={{ width: `${Math.min(100, (excerpt.length / 200) * 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-text-muted/50 font-medium">{excerpt.length}/200</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="group rounded-xl sm:rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl overflow-hidden card-hover shadow-lg hover:shadow-2xl">
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border/40 flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-blue-500/5 animate-shimmer" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm sm:text-base font-bold text-text-primary truncate">Conteúdo</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Texto completo da notícia</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva o conteúdo completo da notícia aqui..."
                    rows={12}
                    className="w-full px-4 py-3.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all resize-none input-focus shadow-lg focus:shadow-xl leading-relaxed"
                  />
                  <div className="flex items-center justify-between mt-2.5 px-1">
                    <p className={`text-xs ${content.length < 50 ? 'text-red-400 font-medium' : 'text-text-muted/50'} flex items-center gap-1.5`}>
                      {content.length < 50 && <AlertCircle className="w-3.5 h-3.5" />}
                      Mínimo 50 caracteres
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted/50">
                      <span>{content.length} caracteres</span>
                      <span>•</span>
                      <span>{wordCount} palavras</span>
                      <span>•</span>
                      <span>~{readTime} min de leitura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Cover Image */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Image className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-primary">Capa</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Imagem de destaque</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                  <div className="relative">
                    <Link2 className="absolute left-3 top-3 w-4 h-4 text-text-muted/40" />
                    <input
                      type="url"
                      value={coverUrl}
                      onChange={(e) => setCoverUrl(e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all"
                    />
                  </div>

                  {/* Preview */}
                  <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-border/40 bg-bg/30">
                    {coverUrl ? (
                      <img src={coverUrl} alt="Preview" className="w-full aspect-video object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div className="w-full aspect-video flex items-center justify-center">
                        <Image className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted/20" />
                      </div>
                    )}
                    {coverUrl && (
                      <button
                        onClick={() => setCoverUrl('')}
                        className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-red-500/90 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                      >
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Author & Date */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-primary">Publicação</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Autor e data</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                  {/* Author */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-1.5 sm:mb-2">Autor</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/40" />
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Nome do autor"
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-sm bg-bg/50 border border-border/40 rounded-xl focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-1.5 sm:mb-2">Data</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/40" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-sm bg-bg/50 border border-border/40 rounded-xl focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-primary">Live Preview</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Como ficará a notícia</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  {/* Card Preview */}
                  <div className="rounded-lg sm:rounded-xl overflow-hidden border border-border/40 bg-gradient-to-br from-card/80 to-card/40">
                    {/* Cover */}
                    <div className="relative">
                      {coverUrl ? (
                        <img src={coverUrl} alt="Preview" className="w-full aspect-video object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div className="w-full aspect-video bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center">
                          <Newspaper className="w-8 h-8 sm:w-12 sm:h-12 text-text-muted/15" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm font-bold text-text-primary line-clamp-2">{title || 'Título da notícia'}</p>
                      <p className="text-[10px] sm:text-xs text-text-muted/60 mt-1 sm:mt-1.5 line-clamp-2">{excerpt || 'O resumo aparecerá aqui...'}</p>
                      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-border/30">
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-text-muted/50">
                          <User className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>{author || 'Autor'}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-text-muted/50">
                          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>{date ? new Date(date).toLocaleDateString('pt-BR') : 'Data'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PREVIEW TAB ==================== */}
        {activeTab === 'preview' && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-text-primary">Pré-visualização Final</h2>
                  <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Como os usuários verão a notícia</p>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Hero */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-border/40">
                  {coverUrl ? (
                    <img src={coverUrl} alt="Preview" className="w-full aspect-video object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-accent/10 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 sm:w-20 sm:h-20 text-text-muted/15" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <h3 className="text-lg sm:text-2xl font-black text-white mb-1 sm:mb-2">{title || 'Título da Notícia'}</h3>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm text-white/60 flex-wrap">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>{author || 'Autor'}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>{date ? new Date(date).toLocaleDateString('pt-BR') : 'Data'}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>~{readTime} min</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                {excerpt && (
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-accent/5 border border-accent/20 mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed">{excerpt}</p>
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                  {content ? (
                    content.split('\n').map((paragraph, i) => (
                      paragraph.trim() && (
                        <p key={i} className="text-xs sm:text-sm text-text-secondary/80 leading-relaxed mb-3 sm:mb-4">
                          {paragraph}
                        </p>
                      )
                    ))
                  ) : (
                    <p className="text-text-muted/40 text-center py-6 sm:py-8 text-xs sm:text-sm">O conteúdo aparecerá aqui...</p>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                  <div className="text-[10px] sm:text-xs text-text-muted/40">
                    {wordCount} palavras • ~{readTime} min de leitura
                  </div>
                  <div className="text-[10px] sm:text-xs text-text-muted/40">
                    Slug: <span className="text-accent/60">/news/{slug || '...'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
