import { useState, useEffect } from 'react';
import {
  BookOpen,
  Mic2,
  Film,
  Newspaper,
  TrendingUp,
  Plus,
  Settings,
  Eye,
  Clock,
  Sparkles,
  Zap,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Headphones,
  BarChart3,
  Activity,
  Play,
  Calendar,
  ChevronRight,
  Globe,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { series, narrators, news, type Series, type Narrator } from '../../data/data';

const totalSeries = series.length;
const totalNarrators = narrators.length;
const totalNews = news.length;
const totalEpisodes = series.reduce(
  (acc: number, s: Series) => acc + s.seasons.reduce((a: number, season: { episodes: unknown[] }) => a + season.episodes.length, 0),
  0
);
const freeSeries = series.filter((s: Series) => s.isFree).length;
const premiumSeries = series.filter((s: Series) => !s.isFree).length;

const growthData = [
  { label: 'Séries', value: '+2', percent: '+25%', up: true, color: 'violet' },
  { label: 'Episódios', value: '+15', percent: '+18%', up: true, color: 'blue' },
  { label: 'Narradores', value: '+1', percent: '+14%', up: true, color: 'purple' },
  { label: 'Notícias', value: '+3', percent: '+60%', up: true, color: 'amber' },
];

const recentSeries = [...series].sort((a: Series, b: Series) => b.year - a.year).slice(0, 5);
const recentNarrators = [...narrators].slice(0, 5);

const recentActivity = [
  { id: 1, action: 'Nova série adicionada', detail: 'Atlas Invisível', time: '2 min atrás', icon: BookOpen, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { id: 2, action: 'Narrador atualizado', detail: 'Helena Torres', time: '15 min atrás', icon: Mic2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 3, action: 'Notícia publicada', detail: 'Novos recursos da plataforma', time: '1h atrás', icon: Newspaper, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 4, action: 'Episódios adicionados', detail: 'Ecos do Amanhã - T2', time: '3h atrás', icon: Film, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 5, action: 'Usuário premium', detail: 'Novo assinante premium', time: '5h atrás', icon: Crown, color: 'text-accent', bg: 'bg-accent/10' },
];

const statsCards = [
  { label: 'Total de Séries', value: totalSeries, icon: BookOpen, gradient: 'from-violet-500/10 to-purple-500/10', border: 'border-violet-500/20', iconBg: 'bg-violet-500/10', iconColor: 'text-violet-400', accent: 'text-violet-400', glow: 'shadow-violet-500/10' },
  { label: 'Total de Narradores', value: totalNarrators, icon: Mic2, gradient: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', accent: 'text-blue-400', glow: 'shadow-blue-500/10' },
  { label: 'Total de Episódios', value: totalEpisodes, icon: Film, gradient: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', accent: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
  { label: 'Artigos de Notícias', value: totalNews, icon: Newspaper, gradient: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-500/20', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400', accent: 'text-amber-400', glow: 'shadow-amber-500/10' },
  { label: 'Séries Gratuitas', value: freeSeries, icon: Eye, gradient: 'from-green-500/10 to-lime-500/10', border: 'border-green-500/20', iconBg: 'bg-green-500/10', iconColor: 'text-green-400', accent: 'text-green-400', glow: 'shadow-green-500/10' },
  { label: 'Séries Premium', value: premiumSeries, icon: Sparkles, gradient: 'from-yellow-500/10 to-amber-500/10', border: 'border-yellow-500/20', iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-400', accent: 'text-yellow-400', glow: 'shadow-yellow-500/10' },
];

const quickActions = [
  { label: 'Gerenciar Séries', description: 'Adicionar, editar ou remover séries', icon: Plus, to: '/admin/series', gradient: 'from-violet-600/20 to-purple-600/20', border: 'border-violet-500/20', iconColor: 'text-violet-400', hoverBorder: 'hover:border-violet-500/40' },
  { label: 'Gerenciar Narradores', description: 'Cadastrar e organizar narradores', icon: Mic2, to: '/admin/narrators', gradient: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500/20', iconColor: 'text-blue-400', hoverBorder: 'hover:border-blue-500/40' },
  { label: 'Gerenciar Notícias', description: 'Publicar artigos e novidades', icon: Newspaper, to: '/admin/news', gradient: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/20', iconColor: 'text-amber-400', hoverBorder: 'hover:border-amber-500/40' },
  { label: 'Configurações', description: 'Preferências do sistema', icon: Settings, to: '/admin/settings', gradient: 'from-gray-600/20 to-slate-600/20', border: 'border-gray-500/20', iconColor: 'text-gray-400', hoverBorder: 'hover:border-gray-500/40' },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AdminLayout>
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      <div className="space-y-6">
        {/* ==================== HEADER ==================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center shadow-lg shadow-accent/10">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-text-primary">Dashboard</h1>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Online
                    </span>
                  </div>
                  <p className="text-sm text-text-muted/70">Visão geral da plataforma NeonCast</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-text-muted/60 bg-card/50 border border-border/40 rounded-xl px-4 py-2.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <Link to="/admin/analytics" className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/40 text-sm text-text-muted/60 hover:text-text-primary hover:bg-white/5 transition-all">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== STATS GRID ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {statsCards.map((stat) => (
            <div key={stat.label} className={`group relative overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.gradient} p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:${stat.glow}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
                  <p className={`text-3xl font-black mt-1.5 ${stat.accent}`}>{stat.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* ==================== GROWTH INDICATORS ==================== */}
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">Crescimento Recente</h2>
                <p className="text-xs text-text-muted/60">Adições nos últimos 30 dias</p>
              </div>
            </div>
            <Link to="/admin/analytics" className="group flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
              Ver relatório completo
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border/30">
            {growthData.map((item) => (
              <div key={item.label} className="text-center p-5">
                <p className={`text-3xl font-black mb-1 ${item.up ? 'text-green-400' : 'text-red-400'}`}>{item.value}</p>
                <div className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${item.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {item.percent}
                </div>
                <p className="text-[10px] text-text-muted/50 mt-2 uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== MAIN GRID ==================== */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Series - 2 cols */}
          <div className="xl:col-span-2 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">Séries Recentes</h2>
                  <p className="text-xs text-text-muted/60">Últimas séries adicionadas</p>
                </div>
              </div>
              <Link to="/admin/series" className="group flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                Ver todas
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="divide-y divide-border/30">
              {recentSeries.map((s) => (
                <Link key={s.id} to="/admin/series" className="flex items-center gap-4 p-4 hover:bg-accent/5 transition-all group">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src={s.cover} alt={s.title} className="relative w-14 h-14 rounded-xl object-cover shadow-md ring-1 ring-white/5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">{s.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-text-muted/50">{s.genre}</span>
                      <span className="text-text-muted/30">•</span>
                      <span className="text-xs text-text-muted/50">{s.year}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${s.isFree ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {s.isFree ? 'FREE' : 'PREMIUM'}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Narrators - 1 col */}
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Mic2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">Narradores</h2>
                  <p className="text-xs text-text-muted/60">Vozes da plataforma</p>
                </div>
              </div>
              <Link to="/admin/narrators" className="group flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                Ver todos
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="divide-y divide-border/30">
              {recentNarrators.map((n) => (
                <Link key={n.id} to="/admin/narrators" className="flex items-center gap-3 p-4 hover:bg-accent/5 transition-all group">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src={n.avatar} alt={n.name} className="relative w-12 h-12 rounded-full object-cover ring-2 ring-white/5" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">{n.name}</p>
                    <p className="text-xs text-text-muted/50 mt-0.5">{n.seriesIds.length} série{n.seriesIds.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex -space-x-1.5">
                    {n.seriesIds.slice(0, 3).map((sid: string) => {
                      const s = series.find((x: Series) => x.id === sid);
                      return s ? (<img key={sid} src={s.cover} alt={s.title} className="w-5 h-5 rounded-full border border-card object-cover" title={s.title} />) : null;
                    })}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== ACTIVITY + QUICK ACTIONS ==================== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">Atividade Recente</h2>
                <p className="text-xs text-text-muted/60">Últimas ações no painel</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 group">
                    <div className={`w-9 h-9 rounded-xl ${activity.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{activity.action}</p>
                      <p className="text-xs text-text-muted/50">{activity.detail}</p>
                    </div>
                    <span className="text-[10px] text-text-muted/40 flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">Ações Rápidas</h2>
                <p className="text-xs text-text-muted/60">Acesso direto às seções</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Link key={action.to} to={action.to} className={`group relative overflow-hidden rounded-xl border ${action.border} ${action.hoverBorder} bg-gradient-to-br ${action.gradient} p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">{action.label}</p>
                        <p className="text-[10px] text-text-muted/60 mt-0.5 leading-relaxed">{action.description}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
