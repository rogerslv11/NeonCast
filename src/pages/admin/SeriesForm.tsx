import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  BookOpen,
  Image,
  Tag,
  Users,
  Calendar,
  Crown,
  Gift,
  Film,
  Check,
  Eye,
  Sparkles,
  AlertCircle,
  Link2,
  Type,
  AlignLeft,
  Mic2,
  Clock,
  Star,
  TrendingUp,
  Layers,
  ChevronDown,
  Upload,
  Trash,
  GripVertical,
  FileUp,
  FileText,
  Play,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { series, narrators, type Series, type Narrator, type Episode } from '../../data/data';

const genres = [
  { value: 'Ficção Científica', color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { value: 'Thriller', color: 'from-red-500 to-orange-500', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  { value: 'Mistério', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  { value: 'Pós-Apocalíptico', color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  { value: 'Tech Thriller', color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { value: 'Drama', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  { value: 'Terror', color: 'from-gray-500 to-slate-500', bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-300' },
  { value: 'Fantasia', color: 'from-indigo-500 to-violet-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
];

interface SeasonForm {
  number: number;
  episodes: { title: string; duration: number; isFree: boolean; audioUrl: string }[];
}

export default function SeriesForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingSeries = isEdit ? series.find((s: Series) => s.id === id) : null;

  const [activeTab, setActiveTab] = useState<'info' | 'episodes' | 'preview'>('info');
  const [title, setTitle] = useState(existingSeries?.title || '');
  const [description, setDescription] = useState(existingSeries?.description || '');
  const [coverUrl, setCoverUrl] = useState(existingSeries?.cover || '');
  const [genre, setGenre] = useState(existingSeries?.genre || genres[0].value);
  const [year, setYear] = useState(existingSeries?.year?.toString() || '2025');
  const [isFree, setIsFree] = useState(existingSeries?.isFree || false);
  const [selectedNarrators, setSelectedNarrators] = useState<string[]>(existingSeries?.narratorIds || []);
  const [saved, setSaved] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [seasons, setSeasons] = useState<SeasonForm[]>(
    existingSeries
      ? existingSeries.seasons.map((s) => ({
          number: s.number,
          episodes: s.episodes.map((e) => ({ title: e.title, duration: e.duration, isFree: e.isFree, audioUrl: e.audioUrl })),
        }))
      : [
          { number: 1, episodes: [{ title: '', duration: 1800, isFree: true, audioUrl: '' }] },
        ]
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileContent, setUploadedFileContent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNarrator = (id: string) => {
    setSelectedNarrators((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const addSeason = () => {
    setSeasons((prev) => [...prev, { number: prev.length + 1, episodes: [{ title: '', duration: 1800, isFree: true, audioUrl: '' }] }]);
  };

  const removeSeason = (index: number) => {
    if (seasons.length > 1) {
      setSeasons((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const addEpisode = (seasonIndex: number) => {
    setSeasons((prev) => {
      const updated = [...prev];
      updated[seasonIndex] = {
        ...updated[seasonIndex],
        episodes: [...updated[seasonIndex].episodes, { title: '', duration: 1800, isFree: true, audioUrl: '' }],
      };
      return updated;
    });
  };

  const removeEpisode = (seasonIndex: number, episodeIndex: number) => {
    setSeasons((prev) => {
      const updated = [...prev];
      updated[seasonIndex] = {
        ...updated[seasonIndex],
        episodes: updated[seasonIndex].episodes.filter((_, i) => i !== episodeIndex),
      };
      return updated;
    });
  };

  const updateEpisode = (seasonIndex: number, episodeIndex: number, field: string, value: string | number | boolean) => {
    setSeasons((prev) => {
      const updated = [...prev];
      const episodes = [...updated[seasonIndex].episodes];
      episodes[episodeIndex] = { ...episodes[episodeIndex], [field]: value };
      updated[seasonIndex] = { ...updated[seasonIndex], episodes };
      return updated;
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const fileExt = fileName.split('.').pop()?.toLowerCase();

    if (fileExt !== 'csv' && fileExt !== 'json' && fileExt !== 'txt') {
      alert('Formato inválido. Use CSV, JSON ou TXT');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUploadedFileName(fileName);
      setUploadedFileContent(content);
    };
    reader.readAsText(file);
  };

  const processUploadedFile = () => {
    if (!uploadedFileContent) return;

    const fileName = uploadedFileName?.toLowerCase() || '';
    let episodesToAdd: { title: string; duration: number; isFree: boolean; audioUrl: string }[] = [];

    if (fileName.endsWith('.csv') || fileName.endsWith('.txt')) {
      // CSV/TXT format: titulo,duracao_segundos,gratuito,audio_url
      const lines = uploadedFileContent.split('\n').filter(line => line.trim());
      // Skip header if exists
      const startIndex = lines[0]?.toLowerCase().includes('titulo') || lines[0]?.toLowerCase().includes('title') ? 1 : 0;
      
      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const parts = line.split(/[;,]/).map(p => p.trim());
        if (parts.length >= 2) {
          const title = parts[0];
          const duration = parseInt(parts[1]) || 1800;
          const isFree = parts[2]?.toLowerCase() === 'sim' || parts[2]?.toLowerCase() === 'true' || parts[2]?.toLowerCase() === 'gratuito';
          const audioUrl = parts[3] || '';
          episodesToAdd.push({ title, duration, isFree, audioUrl });
        }
      }
    } else if (fileName.endsWith('.json')) {
      try {
        const data = JSON.parse(uploadedFileContent);
        if (Array.isArray(data)) {
          episodesToAdd = data.map((item: any) => ({
            title: item.title || item.titulo || item.nome || 'Episódio sem título',
            duration: item.duration || item.duracao || 1800,
            isFree: item.isFree || item.gratuito || false,
            audioUrl: item.audioUrl || item.audio_url || '',
          }));
        }
      } catch (err) {
        alert('Erro ao processar arquivo JSON');
        return;
      }
    }

    if (episodesToAdd.length === 0) {
      alert('Nenhum episódio encontrado no arquivo');
      return;
    }

    // Add episodes to the last season
    setSeasons((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      updated[lastIndex] = {
        ...updated[lastIndex],
        episodes: [...updated[lastIndex].episodes, ...episodesToAdd],
      };
      return updated;
    });

    // Reset upload state
    setShowUploadModal(false);
    setUploadedFileName(null);
    setUploadedFileContent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearUpload = () => {
    setShowUploadModal(false);
    setUploadedFileName(null);
    setUploadedFileContent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const totalEpisodes = seasons.reduce((acc, s) => acc + s.episodes.length, 0);
  const totalDuration = seasons.reduce(
    (acc, s) => acc + s.episodes.reduce((a, e) => a + (e.duration || 0), 0),
    0
  );
  const formatHours = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  };

  const selectedGenre = genres.find((g) => g.value === genre) || genres[0];

  const formErrors = [];
  if (!title.trim()) formErrors.push('Título é obrigatório');
  if (description.length < 20) formErrors.push('Descrição deve ter pelo menos 20 caracteres');
  if (selectedNarrators.length === 0) formErrors.push('Selecione pelo menos 1 narrador');

  return (
    <AdminLayout>
      {/* CSS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.5; }
          50% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(0.9); opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px -5px rgba(var(--accent-rgb), 0.3); }
          50% { box-shadow: 0 0 30px 0px rgba(var(--accent-rgb), 0.5); }
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
        .gradient-border {
          position: relative;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.5), transparent, rgba(var(--accent-rgb), 0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      <div className="space-y-4 sm:space-y-6">
        {/* ==================== HEADER ==================== */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-card/30 glass-effect border border-border/50 p-4 sm:p-6 card-hover">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/8 to-purple-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-32 h-32 bg-accent/3 rounded-full blur-xl pointer-events-none animate-pulse" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/admin/series')}
                className="group w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-text-muted/70 hover:text-text-primary hover:border-accent/40 hover:bg-accent/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${selectedGenre.color} flex items-center justify-center shadow-xl ring-2 ring-white/10 flex-shrink-0`}>
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 rounded-xl bg-white/10 animate-shimmer" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight truncate">
                      {isEdit ? 'Editar Série' : 'Nova Série'}
                    </h1>
                    <p className="text-xs sm:text-sm text-text-muted/70 flex items-center gap-1.5 flex-wrap">
                      {isEdit ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                          Editando: <span className="text-accent font-semibold truncate">{existingSeries?.title}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-accent/60 flex-shrink-0" />
                          <span className="hidden sm:inline">Preencha os dados para criar uma nova série</span>
                          <span className="sm:hidden">Criar nova série</span>
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
                    : 'bg-gradient-to-r from-accent via-accent to-pink-500 text-white shadow-accent/25 hover:shadow-accent/40 hover:scale-105'
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
                    <span className="hidden sm:inline">Salvar Série</span>
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
              { value: 'info' as const, label: 'Informações', labelShort: 'Info', icon: Type, color: 'from-blue-500 to-cyan-500' },
              { value: 'episodes' as const, label: `Episódios (${totalEpisodes})`, labelShort: `Eps (${totalEpisodes})`, icon: Film, color: 'from-purple-500 to-pink-500' },
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

        {/* ==================== INFO TAB ==================== */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
            {/* Left - Main Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Basic Info Card */}
              <div className="group rounded-xl sm:rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl overflow-hidden card-hover shadow-lg hover:shadow-2xl">
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border/40 flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-accent/5 via-transparent to-transparent">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-accent/5 animate-shimmer" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm sm:text-base font-bold text-text-primary truncate">Informações Básicas</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Dados principais da série</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Title */}
                  <div className="group/input">
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Type className="w-4 h-4 text-accent" />
                      </div>
                      Título da Série
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Ecos do Amanhã"
                      className="w-full px-4 py-3.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all input-focus shadow-lg focus:shadow-xl"
                    />
                  </div>

                  {/* Description */}
                  <div className="group/input">
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <AlignLeft className="w-4 h-4 text-purple-400" />
                      </div>
                      Sinopse
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva a história, o enredo e o que torna esta série especial..."
                      rows={5}
                      className="w-full px-4 py-3.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all resize-none input-focus shadow-lg focus:shadow-xl leading-relaxed"
                    />
                    <div className="flex items-center justify-between mt-2.5 px-1">
                      <p className={`text-xs ${description.length < 20 ? 'text-red-400 font-medium' : 'text-text-muted/50'} flex items-center gap-1.5`}>
                        {description.length < 20 && <AlertCircle className="w-3.5 h-3.5" />}
                        Mínimo 20 caracteres
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-border/30 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${description.length < 20 ? 'bg-red-400' : 'bg-accent'}`}
                            style={{ width: `${Math.min(100, (description.length / 500) * 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-text-muted/50 font-medium">{description.length}/500</p>
                      </div>
                    </div>
                  </div>

                  {/* Cover URL */}
                  <div className="group/input">
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Image className="w-4 h-4 text-emerald-400" />
                      </div>
                      URL da Capa
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/40" />
                        <input
                          type="url"
                          value={coverUrl}
                          onChange={(e) => setCoverUrl(e.target.value)}
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="w-full pl-11 pr-4 py-3.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all input-focus shadow-lg focus:shadow-xl"
                        />
                      </div>
                      {coverUrl && (
                        <div className="relative group/img">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-border/50 ring-2 ring-white/10 shadow-xl group-hover/img:ring-accent/30 transition-all">
                            <img src={coverUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          </div>
                          <button
                            onClick={() => setCoverUrl('')}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all shadow-lg hover:scale-110 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrators Card */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-4 sm:py-4 border-b border-border/40 flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-text-primary">Narradores</h2>
                      <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Selecione exatamente 2 narradores</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${
                    selectedNarrators.length === 2
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {selectedNarrators.length}/2
                  </span>
                </div>

                <div className="p-3 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {narrators.map((n: Narrator) => {
                      const selected = selectedNarrators.includes(n.id);
                      const canSelect = selected || selectedNarrators.length < 2;
                      return (
                        <button
                          key={n.id}
                          onClick={() => canSelect && toggleNarrator(n.id)}
                          disabled={!canSelect}
                          className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border transition-all text-left disabled:opacity-40 disabled:cursor-not-allowed ${
                            selected
                              ? 'border-accent/40 bg-accent/5 ring-1 ring-accent/20'
                              : 'border-border/40 bg-white/[0.02] hover:border-border/60'
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <img src={n.avatar} alt={n.name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover ring-1 ring-white/5" />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md flex items-center justify-center ring-2 ring-card ${
                              selected ? 'bg-accent' : 'bg-white/10'
                            }`}>
                              {selected && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-semibold truncate ${selected ? 'text-accent' : 'text-text-primary'}`}>
                              {n.name}
                            </p>
                            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-text-muted/50">
                              <Mic2 className="w-3 h-3 flex-shrink-0" />
                              <span>{n.seriesIds.length} séries</span>
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
              {/* Details Card */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-primary">Detalhes</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60">Configurações da série</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
                  {/* Genre */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-1.5 sm:mb-2">Gênero</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                        className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all text-xs sm:text-sm ${
                          showGenreDropdown ? 'border-accent/50 ring-2 ring-accent/20' : 'border-border/40'
                        } bg-bg/50`}
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br ${selectedGenre.color} flex items-center justify-center`}>
                            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-text-primary">{genre}</span>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/50 transition-transform ${showGenreDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {showGenreDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowGenreDropdown(false)} />
                          <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-2xl shadow-black/40 overflow-hidden">
                            {genres.map((g) => (
                              <button
                                key={g.value}
                                onClick={() => { setGenre(g.value); setShowGenreDropdown(false); }}
                                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/5 transition-colors text-xs sm:text-sm ${
                                  genre === g.value ? 'bg-accent/5' : ''
                                }`}
                              >
                                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br ${g.color} flex items-center justify-center flex-shrink-0`}>
                                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-text-primary">{g.value}</span>
                                {genre === g.value && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent ml-auto" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-1.5 sm:mb-2">Ano de Lançamento</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/40" />
                      <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        min="2020"
                        max="2030"
                        className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-xl focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-1.5 sm:mb-2">Tipo de Acesso</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setIsFree(true)}
                        className={`flex flex-col items-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-xl border transition-all text-xs sm:text-sm ${
                          isFree
                            ? 'border-green-500/40 bg-green-500/10 ring-1 ring-green-500/20'
                            : 'border-border/40 bg-white/[0.02] hover:border-border/60'
                        }`}
                      >
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${isFree ? 'bg-green-500/20' : 'bg-white/5'}`}>
                          <Gift className={`w-4 h-4 sm:w-5 sm:h-5 ${isFree ? 'text-green-400' : 'text-text-muted/40'}`} />
                        </div>
                        <span className={`text-xs sm:text-sm font-bold ${isFree ? 'text-green-400' : 'text-text-muted/60'}`}>Grátis</span>
                      </button>
                      <button
                        onClick={() => setIsFree(false)}
                        className={`flex flex-col items-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-xl border transition-all text-xs sm:text-sm ${
                          !isFree
                            ? 'border-amber-500/40 bg-amber-500/10 ring-1 ring-amber-500/20'
                            : 'border-border/40 bg-white/[0.02] hover:border-border/60'
                        }`}
                      >
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${!isFree ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                          <Crown className={`w-4 h-4 sm:w-5 sm:h-5 ${!isFree ? 'text-amber-400' : 'text-text-muted/40'}`} />
                        </div>
                        <span className={`text-xs sm:text-sm font-bold ${!isFree ? 'text-amber-400' : 'text-text-muted/60'}`}>Premium</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-primary">Live Preview</h2>
                    <p className="text-[10px] sm:text-xs text-text-muted/60">Como ficará a série</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  {/* Card Preview */}
                  <div className="rounded-xl overflow-hidden border border-border/40 bg-gradient-to-br from-card/80 to-card/40">
                    <div className="relative">
                      {coverUrl ? (
                        <img src={coverUrl} alt="Preview" className="w-full aspect-square object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-accent/10 to-purple-500/10 flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-text-muted/20" />
                        </div>
                      )}
                      {/* Badge overlay */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        {isFree ? (
                          <span className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-green-500/90 text-white backdrop-blur-sm shadow-lg">GRÁTIS</span>
                        ) : (
                          <span className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-black/70 text-accent backdrop-blur-sm border border-accent/30 shadow-lg">PREMIUM</span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm font-bold text-text-primary truncate">{title || 'Título da série'}</p>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-gradient-to-br ${selectedGenre.color} flex items-center justify-center`}>
                          <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                        </div>
                        <span className="text-[10px] sm:text-xs text-text-muted/60">{genre}</span>
                        <span className="text-text-muted/30">•</span>
                        <span className="text-[10px] sm:text-xs text-text-muted/60">{year}</span>
                      </div>
                      {selectedNarrators.length > 0 && (
                        <div className="flex items-center gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-border/30">
                          <div className="flex -space-x-2">
                            {selectedNarrators.map((nid) => {
                              const n = narrators.find((x: Narrator) => x.id === nid);
                              return n ? (
                                <img key={nid} src={n.avatar} alt={n.name} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-card" />
                              ) : null;
                            })}
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-text-muted/50">{selectedNarrators.length} narradores</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    <div className="text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] border border-border/30">
                      <Film className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent/60 mx-auto mb-0.5 sm:mb-1" />
                      <p className="text-[10px] sm:text-xs font-bold text-text-primary">{totalEpisodes}</p>
                      <p className="text-[8px] sm:text-[9px] text-text-muted/50">eps</p>
                    </div>
                    <div className="text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] border border-border/30">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent/60 mx-auto mb-0.5 sm:mb-1" />
                      <p className="text-[10px] sm:text-xs font-bold text-text-primary">{formatHours(totalDuration)}</p>
                      <p className="text-[8px] sm:text-[9px] text-text-muted/50">total</p>
                    </div>
                    <div className="text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] border border-border/30">
                      <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent/60 mx-auto mb-0.5 sm:mb-1" />
                      <p className="text-[10px] sm:text-xs font-bold text-text-primary">{seasons.length}</p>
                      <p className="text-[8px] sm:text-[9px] text-text-muted/50">temp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== EPISODES TAB ==================== */}
        {activeTab === 'episodes' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
            {seasons.map((season, seasonIndex) => (
              <div key={seasonIndex} className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                {/* Season Header */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-accent/5 to-transparent">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-text-primary">Temporada {season.number}</h3>
                      <p className="text-[10px] sm:text-xs text-text-muted/60">{season.episodes.length} episódios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all flex-1 sm:flex-none"
                    >
                      <FileUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                    <button
                      onClick={() => addEpisode(seasonIndex)}
                      className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all flex-1 sm:flex-none"
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Episódio</span>
                      <span className="sm:hidden">+Ep</span>
                    </button>
                    {seasons.length > 1 && (
                      <button
                        onClick={() => removeSeason(seasonIndex)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Episodes */}
                <div className="divide-y divide-border/30">
                  {season.episodes.map((ep, epIndex) => (
                    <div key={epIndex} className="p-3 sm:p-4 hover:bg-white/[0.01] transition-colors">
                      {/* Row 1: Title + Duration + Actions */}
                      <div className="flex flex-col gap-2 sm:gap-3">
                        {/* Number + Title */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-accent flex-shrink-0">
                            {epIndex + 1}
                          </div>
                          <input
                            type="text"
                            value={ep.title}
                            onChange={(e) => updateEpisode(seasonIndex, epIndex, 'title', e.target.value)}
                            placeholder="Título do episódio"
                            className="flex-1 px-2.5 sm:px-3 py-2 text-xs sm:text-sm bg-bg/30 border border-border/30 rounded-lg placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 text-text-primary transition-all"
                          />
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Duration */}
                          <div className="relative flex-1 sm:flex-none sm:w-28">
                            <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-muted/40" />
                            <input
                              type="number"
                              value={ep.duration}
                              onChange={(e) => updateEpisode(seasonIndex, epIndex, 'duration', Number(e.target.value))}
                              placeholder="seg"
                              className="w-full pl-8 pr-2 py-2 text-xs sm:text-sm bg-bg/30 border border-border/30 rounded-lg placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 text-text-primary transition-all"
                            />
                          </div>

                          {/* Free Toggle */}
                          <button
                            onClick={() => updateEpisode(seasonIndex, epIndex, 'isFree', !ep.isFree)}
                            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold border transition-all flex-1 sm:flex-none ${
                              ep.isFree
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}
                          >
                            {ep.isFree ? 'Grátis' : 'Premium'}
                          </button>

                          {/* Remove */}
                          <button
                            onClick={() => removeEpisode(seasonIndex, epIndex)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Row 2: Audio URL */}
                      <div className="mt-2 sm:mt-3 flex items-center gap-2">
                        <div className="relative flex-1">
                          <Mic2 className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/40" />
                          <input
                            type="url"
                            value={ep.audioUrl}
                            onChange={(e) => updateEpisode(seasonIndex, epIndex, 'audioUrl', e.target.value)}
                            placeholder="URL do áudio"
                            className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 text-[10px] sm:text-xs bg-bg/30 border border-border/30 rounded-lg placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 text-text-primary transition-all"
                          />
                        </div>
                        {ep.audioUrl && (
                          <a
                            href={ep.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-accent hover:bg-accent/10 transition-all flex-shrink-0"
                            title="Testar áudio"
                          >
                            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add Season */}
            <button
              onClick={addSeason}
              className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-dashed border-border/40 text-text-muted/50 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Adicionar Temporada</span>
              <span className="sm:hidden">+ Temporada</span>
            </button>
          </div>
        )}

        {/* ==================== PREVIEW TAB ==================== */}
        {activeTab === 'preview' && (
          <div className="max-w-2xl mx-auto animate-fade-in-up px-2 sm:px-0">
            <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-text-primary">Pré-visualização Final</h2>
                  <p className="text-[10px] sm:text-xs text-text-muted/60 hidden sm:block">Como os usuários verão a série</p>
                </div>
              </div>

              <div className="p-6">
                {/* Hero Preview */}
                <div className="relative rounded-2xl overflow-hidden mb-6 border border-border/40">
                  {coverUrl ? (
                    <img src={coverUrl} alt="Preview" className="w-full aspect-video object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-accent/15 via-purple-500/10 to-transparent flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-text-muted/15" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3">
                      {isFree ? (
                        <span className="text-xs font-bold px-3 py-1 rounded-lg bg-green-500/90 text-white backdrop-blur-sm">GRÁTIS</span>
                      ) : (
                        <span className="text-xs font-bold px-3 py-1 rounded-lg bg-accent/90 text-white backdrop-blur-sm">PREMIUM</span>
                      )}
                      <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${selectedGenre.color} text-white text-xs font-bold`}>
                        {genre}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{title || 'Título da Série'}</h3>
                    <p className="text-sm text-white/70 line-clamp-2">{description || 'A descrição da série aparecerá aqui...'}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { icon: Film, label: 'Episódios', value: totalEpisodes.toString() },
                    { icon: Clock, label: 'Duração', value: formatHours(totalDuration) },
                    { icon: Layers, label: 'Temporadas', value: seasons.length.toString() },
                    { icon: Users, label: 'Narradores', value: selectedNarrators.length.toString() },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white/[0.02] border border-border/30">
                      <stat.icon className="w-4 h-4 text-accent/60 mx-auto mb-1.5" />
                      <p className="text-sm font-bold text-text-primary">{stat.value}</p>
                      <p className="text-[9px] text-text-muted/50">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Narrators */}
                {selectedNarrators.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-3">Narradores</h4>
                    <div className="flex gap-3">
                      {selectedNarrators.map((nid) => {
                        const n = narrators.find((x: Narrator) => x.id === nid);
                        return n ? (
                          <div key={nid} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-border/30">
                            <img src={n.avatar} alt={n.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-xs font-bold text-text-primary">{n.name}</p>
                              <p className="text-[10px] text-text-muted/50">{n.seriesIds.length} séries</p>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== UPLOAD MODAL ==================== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={clearUpload} />
          <div className="relative w-full max-w-lg bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <FileUp className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Upload de Episódios</h3>
                  <p className="text-xs text-text-muted/60">Importe episódios de um arquivo</p>
                </div>
              </div>
              <button
                onClick={clearUpload}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* File Input */}
              <div>
                <label className="block text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-2">
                  Arquivo de Episódios
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="episode-file-input"
                />
                <label
                  htmlFor="episode-file-input"
                  className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 rounded-xl border-2 border-dashed border-border/40 cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group"
                >
                  <FileText className="w-8 h-8 text-text-muted/40 group-hover:text-blue-400 mb-2 transition-colors" />
                  <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                    {uploadedFileName || 'Clique para selecionar um arquivo'}
                  </p>
                  <p className="text-xs text-text-muted/50 mt-1">CSV, JSON ou TXT</p>
                </label>
              </div>

              {/* Format Info */}
              <div className="rounded-xl border border-border/40 bg-white/[0.02] p-4">
                <h4 className="text-xs font-bold text-text-primary mb-2">Formatos suportados:</h4>
                <div className="space-y-2 text-xs text-text-muted/70">
                  <div>
                    <span className="font-mono text-blue-400">CSV/TXT:</span>
                    <p className="mt-0.5 font-mono text-[10px]">titulo,duracao_segundos,gratuito,audio_url</p>
                    <p className="font-mono text-[10px] text-text-muted/50">Ex: Episódio 1,1800,sim,https://exemplo.com/ep1.mp3</p>
                  </div>
                  <div className="pt-2 border-t border-border/30">
                    <span className="font-mono text-blue-400">JSON:</span>
                    <p className="mt-0.5 font-mono text-[10px]">[{"{"}"title": "...", "duration": 1800, "isFree": true, "audioUrl": "url"{"}"}]</p>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {uploadedFileContent && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-text-primary">Pré-visualização:</h4>
                    <span className="text-[10px] text-text-muted/50">
                      {uploadedFileContent.split('\n').filter(l => l.trim()).length - 1} episódios detectados
                    </span>
                  </div>
                  <div className="max-h-32 overflow-y-auto rounded-lg bg-bg/50 border border-border/30 p-3">
                    <pre className="text-[10px] font-mono text-text-muted/70 whitespace-pre-wrap">
                      {uploadedFileContent.slice(0, 500)}
                      {uploadedFileContent.length > 500 ? '...' : ''}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/40 flex items-center justify-end gap-3">
              <button
                onClick={clearUpload}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={processUploadedFile}
                disabled={!uploadedFileContent}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <Upload className="w-4 h-4" />
                Importar Episódios
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
