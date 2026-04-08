import { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Headphones,
  BookOpen,
  Mic2,
  Clock,
  Play,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Activity,
  Target,
  Sparkles,
  Zap,
  Calendar,
  Download,
  Eye,
  Music,
  ChevronDown,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { series, narrators } from '../../data/data';

// Mock analytics data
const dailyListeners = [120, 145, 132, 168, 195, 210, 185, 220, 245, 230, 265, 290, 275, 310, 330, 305, 340, 365, 350, 380, 395, 410, 385, 420, 445, 430, 460, 480, 455, 490];
const dailyStreams = [340, 380, 355, 420, 480, 510, 465, 540, 590, 560, 640, 700, 660, 750, 790, 730, 820, 880, 840, 910, 950, 980, 920, 1010, 1070, 1030, 1100, 1150, 1090, 1180];
const dailyHours = [45, 52, 48, 62, 78, 85, 72, 95, 110, 98, 125, 140, 130, 155, 168, 148, 175, 195, 182, 210, 225, 238, 215, 248, 265, 252, 278, 295, 272, 310];

const genreStats = [
  { genre: 'Ficção Científica', count: 3, listeners: 1250, streams: 3400, growth: '+25%', color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
  { genre: 'Thriller', count: 1, listeners: 890, streams: 2100, growth: '+18%', color: 'from-red-500 to-orange-500', bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' },
  { genre: 'Mistério', count: 1, listeners: 720, streams: 1800, growth: '+12%', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
  { genre: 'Pós-Apocalíptico', count: 1, listeners: 650, streams: 1500, growth: '+8%', color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
  { genre: 'Tech Thriller', count: 1, listeners: 580, streams: 1350, growth: '+15%', color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  { genre: 'Drama', count: 1, listeners: 420, streams: 980, growth: '+6%', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' },
  { genre: 'Terror', count: 1, listeners: 380, streams: 890, growth: '+4%', color: 'from-gray-500 to-slate-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20', text: 'text-gray-400' },
  { genre: 'Fantasia', count: 1, listeners: 340, streams: 780, growth: '+10%', color: 'from-indigo-500 to-violet-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
];

const deviceStats = [
  { device: 'Desktop', icon: Monitor, percentage: 52, color: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500 to-blue-600' },
  { device: 'Mobile', icon: Smartphone, percentage: 38, color: 'text-green-400', bg: 'bg-green-500/10', gradient: 'from-green-500 to-emerald-600' },
  { device: 'Tablet', icon: Tablet, percentage: 10, color: 'text-purple-400', bg: 'bg-purple-500/10', gradient: 'from-purple-500 to-violet-600' },
];

const topNarrators = [
  { name: 'Helena Torres', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', series: 3, streams: 4200, listeners: 1450, growth: '+22%' },
  { name: 'Rafael Mendes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', series: 3, streams: 3800, listeners: 1320, growth: '+18%' },
  { name: 'Camila Ribeiro', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', series: 3, streams: 3200, listeners: 1100, growth: '+15%' },
  { name: 'Lucas Ferreira', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', series: 3, streams: 2800, listeners: 980, growth: '+12%' },
  { name: 'Isabela Santos', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', series: 3, streams: 2400, listeners: 870, growth: '+9%' },
];

const periodOptions = [
  { value: '7d' as const, label: '7 dias', days: 7 },
  { value: '30d' as const, label: '30 dias', days: 30 },
  { value: '90d' as const, label: '90 dias', days: 90 },
];

export default function Analytics() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [chartType, setChartType] = useState<'streams' | 'listeners' | 'hours'>('streams');

  const totalListeners = dailyListeners[dailyListeners.length - 1];
  const totalStreams = dailyStreams.reduce((a, b) => a + b, 0);
  const totalHours = dailyHours.reduce((a, b) => a + b, 0);
  const avgStreamsPerDay = Math.round(totalStreams / dailyStreams.length);
  const growthPercent = Math.round(((dailyStreams[dailyStreams.length - 1] - dailyStreams[0]) / dailyStreams[0]) * 100);

  const chartData = chartType === 'streams' ? dailyStreams : chartType === 'listeners' ? dailyListeners : dailyHours;
  const maxChartValue = Math.max(...chartData);
  const chartLabels = { streams: 'Streams', listeners: 'Ouvintes', hours: 'Horas' };
  const chartIcons = { streams: Play, listeners: Headphones, hours: Clock };

  return (
    <AdminLayout>
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes bar-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .animate-bar-grow { animation: bar-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; transform-origin: bottom; }
      `}</style>

      <div className="space-y-6">
        {/* ==================== HEADER ==================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 p-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <BarChart3 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-text-primary">Analytics</h1>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />Live
                    </span>
                  </div>
                  <p className="text-sm text-text-muted/70">Métricas e desempenho da plataforma</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Period Selector */}
              <div className="flex gap-1 bg-card/60 border border-border/50 rounded-xl p-1">
                {periodOptions.map((p) => (
                  <button key={p.value} onClick={() => setPeriod(p.value)} className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${period === p.value ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm' : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
              {/* Export */}
              <button className="w-10 h-10 rounded-xl border border-border/40 flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ==================== KPI CARDS ==================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Headphones, label: 'Ouvintes Ativos', value: totalListeners.toLocaleString(), growth: `+${growthPercent}%`, up: true, color: 'violet', sub: 'Últimos 30 dias' },
            { icon: Play, label: 'Total de Streams', value: totalStreams.toLocaleString(), growth: `+${growthPercent}%`, up: true, color: 'blue', sub: `${avgStreamsPerDay}/dia em média` },
            { icon: Clock, label: 'Horas Ouvidas', value: `${Math.round(totalHours / 60)}h`, growth: '+18%', up: true, color: 'amber', sub: 'Tempo total de reprodução' },
            { icon: Target, label: 'Nota Média', value: '4.8', growth: '+0.3', up: true, color: 'green', sub: 'Baseado em 2.4k avaliações' },
          ].map((kpi, i) => (
            <div key={i} className={`group relative overflow-hidden p-5 bg-gradient-to-br from-${kpi.color}-500/10 to-${kpi.color}-600/5 border border-${kpi.color}-500/20 rounded-2xl hover:scale-[1.02] transition-all duration-300`}>
              <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-${kpi.color}-500/10 blur-lg group-hover:bg-${kpi.color}-500/20 transition-all`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon className={`w-5 h-5 text-${kpi.color}-400`} />
                  <div className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${kpi.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {kpi.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                    {kpi.growth}
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-text-primary">{kpi.value}</p>
                <p className="text-[10px] font-medium text-text-muted/60 uppercase tracking-wider mt-1">{kpi.label}</p>
                <p className="text-[9px] text-text-muted/40 mt-0.5">{kpi.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ==================== CHART SECTION ==================== */}
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
          {/* Chart Header */}
          <div className="px-6 py-4 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">Desempenho ao Longo do Tempo</h2>
                <p className="text-xs text-text-muted/60">{chartData.length} dias de dados</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-bg/50 rounded-xl p-1">
              {(['streams', 'listeners', 'hours'] as const).map((type) => {
                const Icon = chartIcons[type];
                return (
                  <button key={type} onClick={() => setChartType(type)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${chartType === type ? 'bg-emerald-500/20 text-emerald-400' : 'text-text-muted/50 hover:text-text-primary'}`}>
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{chartLabels[type]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-6">
            {/* Area Chart Simulation */}
            <div className="relative h-48 mb-4">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[100, 75, 50, 25, 0].map((pct) => (
                  <div key={pct} className="flex items-center gap-2">
                    <span className="text-[9px] text-text-muted/30 w-8 text-right">{Math.round(maxChartValue * pct / 100)}</span>
                    <div className="flex-1 h-px bg-border/20" />
                  </div>
                ))}
              </div>

              {/* Bars */}
              <div className="absolute inset-0 left-8 flex items-end gap-0.5">
                {chartData.map((count, i) => {
                  const height = (count / maxChartValue) * 100;
                  const isLast = i === chartData.length - 1;
                  const isHovered = i >= chartData.length - 7;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all duration-300 cursor-pointer animate-bar-grow ${
                        isLast
                          ? 'bg-gradient-to-t from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/20'
                          : isHovered
                          ? 'bg-gradient-to-t from-emerald-500/60 to-emerald-400/40 hover:from-emerald-500 hover:to-emerald-400'
                          : 'bg-gradient-to-t from-emerald-500/30 to-emerald-500/15 hover:from-emerald-500/50 hover:to-emerald-500/30'
                      }`}
                      style={{ height: `${height}%`, animationDelay: `${i * 20}ms` }}
                      title={`Dia ${i + 1}: ${count.toLocaleString()} ${chartLabels[chartType].toLowerCase()}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between ml-8 text-[9px] text-text-muted/40">
              <span>Dia 1</span>
              <span>Dia {Math.round(chartData.length / 2)}</span>
              <span>Dia {chartData.length}</span>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border/30">
              {[
                { label: 'Média diária', value: Math.round(chartData.reduce((a, b) => a + b, 0) / chartData.length).toLocaleString(), icon: TrendingUp, color: 'text-emerald-400' },
                { label: 'Pico', value: Math.max(...chartData).toLocaleString(), icon: Zap, color: 'text-amber-400' },
                { label: 'Crescimento', value: `+${growthPercent}%`, icon: ArrowUpRight, color: 'text-green-400' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center`}>
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{stat.value}</p>
                    <p className="text-[9px] text-text-muted/40">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== GENRE + DEVICES ==================== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Genre Performance */}
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Music className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">Desempenho por Gênero</h2>
                  <p className="text-xs text-text-muted/60">Streams e ouvintes por categoria</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border/30">
              {genreStats.map((g, i) => (
                <div key={g.genre} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
                  {/* Rank */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    i === 1 ? 'bg-gray-400/20 text-gray-400' :
                    i === 2 ? 'bg-amber-600/20 text-amber-600' :
                    'bg-white/5 text-text-muted/40'
                  }`}>
                    {i + 1}
                  </div>
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-bold text-text-primary truncate group-hover:text-accent transition-colors">{g.genre}</p>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400`}>{g.growth}</span>
                        <span className="text-xs font-semibold text-text-muted/60">{g.streams.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="w-full bg-card/60 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${g.color} rounded-full transition-all duration-1000`} style={{ width: `${(g.streams / genreStats[0].streams) * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-text-muted/40 mt-1">{g.listeners} ouvintes · {g.count} séries</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices + Engagement */}
          <div className="space-y-6">
            {/* Device Breakdown */}
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">Dispositivos</h2>
                  <p className="text-xs text-text-muted/60">Como os usuários acessam</p>
                </div>
              </div>
              <div className="p-5">
                {/* Donut Chart Simulation */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#blue)" strokeWidth="3" strokeDasharray="52 48" strokeDashoffset="0" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#green)" strokeWidth="3" strokeDasharray="38 62" strokeDashoffset="-52" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#purple)" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="blue"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#2563eb" /></linearGradient>
                        <linearGradient id="green"><stop stopColor="#22c55e" /><stop offset="1" stopColor="#10b981" /></linearGradient>
                        <linearGradient id="purple"><stop stopColor="#a855f7" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg font-black text-text-primary">100%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {deviceStats.map((d) => (
                      <div key={d.device} className="flex items-center gap-2.5">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${d.gradient}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-xs font-semibold text-text-primary">{d.device}</p>
                            <p className="text-xs font-bold text-text-primary">{d.percentage}%</p>
                          </div>
                          <div className="w-full bg-card/60 rounded-full h-1 overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${d.gradient} rounded-full`} style={{ width: `${d.percentage}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">Engajamento</h2>
                  <p className="text-xs text-text-muted/60">Métricas de interação</p>
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                {[
                  { label: 'Tempo médio', value: '24min', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { label: 'Retenção', value: '78%', icon: Eye, color: 'text-green-400', bg: 'bg-green-500/10' },
                  { label: 'Completaram', value: '62%', icon: Check, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'Compartilhamentos', value: '1.2k', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-border/30">
                    <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <p className="text-lg font-black text-text-primary">{stat.value}</p>
                    <p className="text-[9px] text-text-muted/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== TOP NARRATORS ==================== */}
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Mic2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">Top Narradores</h2>
              <p className="text-xs text-text-muted/60">Mais ouvidos do período</p>
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {topNarrators.map((n, i) => (
              <div key={n.name} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0 ${
                  i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  i === 1 ? 'bg-gray-400/20 text-gray-400' :
                  i === 2 ? 'bg-amber-600/20 text-amber-600' :
                  'bg-white/5 text-text-muted/40'
                }`}>
                  {i + 1}
                </div>
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(255,0,170,0.3), rgba(120,0,255,0.3))' }} />
                  <img src={n.avatar} alt={n.name} className="relative w-10 h-10 rounded-full object-cover ring-2 ring-white/5" />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary truncate group-hover:text-accent transition-colors">{n.name}</p>
                  <p className="text-xs text-text-muted/50">{n.series} séries · {n.listeners.toLocaleString()} ouvintes</p>
                </div>
                {/* Stats */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-text-primary">{n.streams.toLocaleString()}</p>
                  <div className="flex items-center gap-0.5 text-[10px] text-green-400 font-semibold">
                    <ArrowUpRight className="w-2.5 h-2.5" />
                    {n.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Need Check icon
function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
