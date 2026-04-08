import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  Mic2,
  Image,
  Type,
  AlignLeft,
  BookOpen,
  Check,
  Eye,
  Sparkles,
  AlertCircle,
  Link2,
  User,
  Headphones,
  Music,
  TrendingUp,
  Users,
  Play,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { narrators, series, type Narrator, type Series as SeriesType } from '../../data/data';

export default function NarratorForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingNarrator = isEdit ? narrators.find((n: Narrator) => n.id === id) : null;

  const [activeTab, setActiveTab] = useState<'info' | 'series' | 'preview'>('info');
  const [name, setName] = useState(existingNarrator?.name || '');
  const [bio, setBio] = useState(existingNarrator?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(existingNarrator?.avatar || '');
  const [selectedSeries, setSelectedSeries] = useState<string[]>(existingNarrator?.seriesIds || []);
  const [saved, setSaved] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleSeries = (id: string) => {
    setSelectedSeries((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalEpisodes = selectedSeries.reduce((acc, sid) => {
    const s = series.find((x: SeriesType) => x.id === sid);
    return acc + (s?.seasons.reduce((a, season) => a + season.episodes.length, 0) || 0);
  }, 0);

  const totalDuration = selectedSeries.reduce((acc, sid) => {
    const s = series.find((x: SeriesType) => x.id === sid);
    return acc + (s?.seasons.reduce((a, season) =>
      a + season.episodes.reduce((epAcc, ep) => epAcc + ep.duration, 0), 0) || 0);
  }, 0);

  const formatHours = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  };

  const genres = [...new Set(selectedSeries.map(sid => {
    const s = series.find((x: SeriesType) => x.id === sid);
    return s?.genre;
  }).filter(Boolean))];

  const formErrors = [];
  if (!name.trim()) formErrors.push('Nome é obrigatório');
  if (bio.length < 20) formErrors.push('Bio deve ter pelo menos 20 caracteres');

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
          0%, 100% { box-shadow: 0 0 20px -5px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px 0px rgba(59, 130, 246, 0.5); }
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
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-card/30 glass-effect border border-border/50 p-4 sm:p-6 card-hover">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500/3 rounded-full blur-xl pointer-events-none animate-pulse" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/admin/narrators')}
                className="group w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-text-muted/70 hover:text-text-primary hover:border-blue-500/40 hover:bg-blue-500/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center shadow-xl ring-2 ring-white/10">
                    <Mic2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/5 animate-shimmer" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                      {isEdit ? 'Editar Narrador' : 'Novo Narrador'}
                    </h1>
                    <p className="text-xs sm:text-sm text-text-muted/70 flex items-center gap-1.5">
                      {isEdit ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Editando: <span className="text-blue-400 font-semibold">{existingNarrator?.name}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-blue-400/60" />
                          <span className="hidden sm:inline">Preencha os dados para criar um novo narrador</span>
                          <span className="sm:hidden">Criar novo narrador</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {isEdit && (
                <button className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold hover:bg-red-500/15 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/10">
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Excluir</span>
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={formErrors.length > 0}
                className={`group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center ${
                  saved
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 text-green-400 hover:shadow-green-500/20'
                    : 'bg-gradient-to-r from-accent to-pink-500 text-white shadow-accent/25 hover:shadow-accent/40 hover:scale-105'
                }`}
              >
                {saved ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="hidden sm:inline">Salvo com sucesso!</span>
                    <span className="sm:hidden">Salvo!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Salvar Narrador</span>
                    <span className="sm:hidden">Salvar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Form Validation Errors */}
        {formErrors.length > 0 && (
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl sm:rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/8 to-red-500/3 p-4 sm:p-5 flex items-start gap-3 sm:gap-4 animate-fade-in-up">
            <div className="absolute inset-0 animate-shimmer" />
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                <span className="hidden sm:inline">Campos obrigatórios</span>
                <span className="sm:hidden">Obrigatório</span>
              </p>
              <ul className="text-[10px] sm:text-xs text-red-400/80 space-y-1.5">
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
        <div className="relative">
          <div className="flex gap-1.5 sm:gap-2 bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 w-fit shadow-lg overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { value: 'info' as const, label: 'Informações', labelShort: 'Info', icon: Type, color: 'from-blue-500 to-cyan-500' },
              { value: 'series' as const, label: `Séries (${selectedSeries.length})`, labelShort: `Séries (${selectedSeries.length})`, icon: BookOpen, color: 'from-purple-500 to-pink-500' },
              { value: 'preview' as const, label: 'Pré-visualizar', labelShort: 'Preview', icon: Eye, color: 'from-emerald-500 to-green-500' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 min-w-max sm:min-w-0 ${
                  activeTab === tab.value
                    ? 'text-white shadow-xl'
                    : 'text-text-muted/60 hover:text-text-primary hover:bg-card/60'
                }`}
              >
                {activeTab === tab.value && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-lg sm:rounded-xl shadow-lg`} />
                )}
                <tab.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 ${activeTab === tab.value ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                <span className="relative z-10 sm:hidden">{tab.labelShort}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ==================== INFO TAB ==================== */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
            {/* Left - Main Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Basic Info Card */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-primary">Informações Pessoais</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60">Dados do narrador</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2">
                      <Type className="w-3.5 h-3.5 text-text-muted/40" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Helena Torres"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2">
                      <AlignLeft className="w-3.5 h-3.5 text-text-muted/40" />
                      Biografia
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Descreva a experiência, estilo e características do narrador..."
                      rows={5}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all resize-none"
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      <p className={`text-[10px] sm:text-[10px] ${bio.length < 20 ? 'text-red-400/60' : 'text-text-muted/40'}`}>
                        {bio.length < 20 && <AlertCircle className="w-3 h-3 inline mr-1" />}
                        <span className="hidden sm:inline">Mínimo 20 caracteres</span>
                        <span className="sm:hidden">Mín. 20 caracteres</span>
                      </p>
                      <p className="text-[10px] sm:text-[10px] text-text-muted/40">{bio.length}/500</p>
                    </div>
                  </div>

                  {/* Avatar URL */}
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2">
                      <Image className="w-3.5 h-3.5 text-text-muted/40" />
                      URL do Avatar
                    </label>
                    <div className="flex gap-2 sm:gap-3">
                      <div className="relative flex-1">
                        <Link2 className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/40" />
                        <input
                          type="url"
                          value={avatarUrl}
                          onChange={(e) => setAvatarUrl(e.target.value)}
                          placeholder="https://exemplo.com/avatar.jpg"
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all"
                        />
                      </div>
                      {avatarUrl && (
                        <div className="relative group">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border border-border/50 ring-1 ring-white/5">
                            <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          </div>
                          <button
                            onClick={() => setAvatarUrl('')}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Series Selection Card */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-text-primary">Séries Vinculadas</h2>
                      <p className="text-[10px] sm:text-xs text-text-muted/60">Selecione as séries narradas</p>
                    </div>
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${
                    selectedSeries.length > 0
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {selectedSeries.length} série{selectedSeries.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {series.map((s: SeriesType) => {
                      const selected = selectedSeries.includes(s.id);
                      const totalEps = s.seasons.reduce((a, season) => a + season.episodes.length, 0);
                      return (
                        <button
                          key={s.id}
                          onClick={() => toggleSeries(s.id)}
                          className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border transition-all text-left ${
                            selected
                              ? 'border-accent/40 bg-accent/5 ring-1 ring-accent/20'
                              : 'border-border/40 bg-white/[0.02] hover:border-border/60'
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <img src={s.cover} alt={s.title} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover ring-1 ring-white/5" />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md flex items-center justify-center ring-2 ring-card ${
                              selected ? 'bg-accent' : 'bg-white/10'
                            }`}>
                              {selected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-semibold truncate ${selected ? 'text-accent' : 'text-text-primary'}`}>
                              {s.title}
                            </p>
                            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-text-muted/50">
                              <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>{totalEps} eps</span>
                              <span className="text-text-muted/30">•</span>
                              <span>{s.genre}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Live Preview Card */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-primary">Live Preview</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60">Como ficará o perfil</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  {/* Profile Card Preview */}
                  <div className="rounded-lg sm:rounded-xl overflow-hidden border border-border/40 bg-gradient-to-br from-card/80 to-card/40">
                    {/* Avatar */}
                    <div className="relative p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                      <div className="relative flex-shrink-0">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Preview" className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover ring-2 ring-white/5 shadow-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        ) : (
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center ring-2 ring-white/5">
                            <Mic2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400/40" />
                          </div>
                        )}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-green-500 ring-2 ring-card" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-text-primary truncate">{name || 'Nome do narrador'}</p>
                        <div className="flex items-center gap-1 sm:gap-1.5 mt-1">
                          <Headphones className="w-3 h-3 text-accent/60" />
                          <span className="text-[10px] sm:text-xs text-text-muted/50">{selectedSeries.length} séries</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-text-muted/50">
                          <Music className="w-3 h-3 text-accent/60" />
                          <span>{totalEpisodes} episódios</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio preview */}
                    {bio && (
                      <div className="px-4 sm:px-5 pb-3 sm:pb-4">
                        <p className="text-[10px] sm:text-xs text-text-muted/60 leading-relaxed line-clamp-3">{bio}</p>
                      </div>
                    )}

                    {/* Genres */}
                    {genres.length > 0 && (
                      <div className="px-4 sm:px-5 pb-3 sm:pb-4">
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {genres.map((g, i) => (
                            <span key={i} className="text-[8px] sm:text-[9px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 px-4 sm:px-5 pb-4 sm:pb-5">
                      <div className="text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] border border-border/30">
                        <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent/60 mx-auto mb-0.5 sm:mb-1" />
                        <p className="text-[10px] sm:text-xs font-bold text-text-primary">{selectedSeries.length}</p>
                        <p className="text-[8px] sm:text-[9px] text-text-muted/50">séries</p>
                      </div>
                      <div className="text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] border border-border/30">
                        <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent/60 mx-auto mb-0.5 sm:mb-1" />
                        <p className="text-[10px] sm:text-xs font-bold text-text-primary">{totalEpisodes}</p>
                        <p className="text-[8px] sm:text-[9px] text-text-muted/50">eps</p>
                      </div>
                      <div className="text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] border border-border/30">
                        <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent/60 mx-auto mb-0.5 sm:mb-1" />
                        <p className="text-[10px] sm:text-xs font-bold text-text-primary">{formatHours(totalDuration)}</p>
                        <p className="text-[8px] sm:text-[9px] text-text-muted/50">total</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SERIES TAB ==================== */}
        {activeTab === 'series' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-text-primary">{selectedSeries.length}</p>
                    <p className="text-[10px] sm:text-xs text-text-muted/60">Séries vinculadas</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-text-primary">{totalEpisodes}</p>
                    <p className="text-[10px] sm:text-xs text-text-muted/60">Episódios totais</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-text-primary">{formatHours(totalDuration)}</p>
                    <p className="text-[10px] sm:text-xs text-text-muted/60">Duração total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Series List */}
            {selectedSeries.length > 0 ? (
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center justify-between bg-gradient-to-r from-accent/5 to-transparent">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-text-primary">Séries Selecionadas</h2>
                      <p className="text-[10px] sm:text-xs text-text-muted/60">Detalhamento por série</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-border/30">
                  {selectedSeries.map((sid, index) => {
                    const s = series.find((x: SeriesType) => x.id === sid);
                    if (!s) return null;
                    const totalEps = s.seasons.reduce((a, season) => a + season.episodes.length, 0);
                    const totalDur = s.seasons.reduce((a, season) =>
                      a + season.episodes.reduce((epAcc, ep) => epAcc + ep.duration, 0), 0);

                    return (
                      <div key={sid} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-white/[0.02] transition-colors group">
                        {/* Number */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-accent flex-shrink-0">
                          {index + 1}
                        </div>

                        {/* Cover */}
                        <img src={s.cover} alt={s.title} className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover shadow-md ring-1 ring-white/5 flex-shrink-0" />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-text-primary truncate">{s.title}</p>
                          <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
                            <span className="text-[10px] sm:text-xs text-text-muted/50">{s.genre}</span>
                            <span className="text-text-muted/30">•</span>
                            <span className="text-[10px] sm:text-xs text-text-muted/50">{s.year}</span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-text-muted/50">
                            <Play className="w-3 h-3" />
                            <span>{totalEps} eps</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] text-text-muted/40">
                            <TrendingUp className="w-3 h-3" />
                            <span>{formatHours(totalDur)}</span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => toggleSeries(sid)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-8 sm:p-16 text-center">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-text-muted/20 mx-auto mb-3 sm:mb-4" />
                <p className="text-text-muted/60 text-sm sm:text-lg font-medium mb-1">Nenhuma série selecionada</p>
                <p className="text-xs sm:text-sm text-text-muted/40">Vá para a aba "Informações" para vincular séries</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== PREVIEW TAB ==================== */}
        {activeTab === 'preview' && (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-text-primary">Pré-visualização Final</h2>
                  <p className="text-[10px] sm:text-xs text-text-muted/60">Como os usuários verão o narrador</p>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Profile Hero */}
                <div className="relative rounded-lg sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-border/40">
                  <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-accent/10 flex items-center justify-center">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Preview" className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover shadow-2xl ring-4 ring-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shadow-2xl ring-4 ring-white/10">
                        <Mic2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400/40" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-1">{name || 'Nome do Narrador'}</h3>
                    <p className="text-xs sm:text-sm text-white/60 line-clamp-2">{bio || 'A biografia aparecerá aqui...'}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {[
                    { icon: BookOpen, label: 'Séries', value: selectedSeries.length.toString() },
                    { icon: Play, label: 'Episódios', value: totalEpisodes.toString() },
                    { icon: TrendingUp, label: 'Duração', value: formatHours(totalDuration) },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.02] border border-border/30">
                      <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent/60 mx-auto mb-1 sm:mb-1.5" />
                      <p className="text-xs sm:text-sm font-bold text-text-primary">{stat.value}</p>
                      <p className="text-[8px] sm:text-[9px] text-text-muted/50">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Genres */}
                {genres.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-bold text-text-primary mb-2 sm:mb-3">Gêneros</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {genres.map((g, i) => (
                        <span key={i} className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Series List */}
                {selectedSeries.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-text-primary mb-2 sm:mb-3">Séries Narradas</h4>
                    <div className="space-y-2">
                      {selectedSeries.map((sid) => {
                        const s = series.find((x: SeriesType) => x.id === sid);
                        if (!s) return null;
                        return (
                          <div key={sid} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.02] border border-border/30">
                            <img src={s.cover} alt={s.title} className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-text-primary truncate">{s.title}</p>
                              <p className="text-[10px] sm:text-xs text-text-muted/50">{s.genre} • {s.year}</p>
                            </div>
                            {s.isFree ? (
                              <span className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">GRÁTIS</span>
                            ) : (
                              <span className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">PREMIUM</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
