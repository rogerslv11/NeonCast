// ============================================================
// Profile Page - Premium Design
// ============================================================
import { useAuth } from '../contexts/AuthContext';
import { series, formatDate } from '../data/data';
import { useFavorites } from '../hooks/useFavorites';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart, LogOut, Crown, ArrowRight, Star, Settings,
  Headphones, Bookmark, ChevronRight, Play, Clock,
  Trophy, Music, Mail, Calendar, Shield, Bell, Palette, Globe, Edit3,
  Zap, TrendingUp
} from 'lucide-react';
import SeriesCard from '../components/SeriesCard';
import { useState } from 'react';

type TabType = 'overview' | 'favorites' | 'settings';

export default function Profile() {
  const { user, logout } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-float" />
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-card/50 border border-border/50 flex items-center justify-center mx-auto shadow-2xl shadow-accent/10">
              <Headphones className="w-12 h-12 text-text-muted/30" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border border-accent/20 animate-pulse-glow" />
          </div>
          <p className="text-text-muted/70 text-sm mb-2">Usuário não encontrado</p>
          <Link 
            to="/auth/login" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white text-sm font-medium hover:shadow-lg hover:shadow-accent/30 transition-all hover:scale-105 active:scale-95"
          >
            Fazer login
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const favoriteSeriesList = series.filter((s) => favorites.includes(s.id));
  const totalListened = 42;
  const seriesCompleted = 4;
  const totalEpisodesListened = 67;
  const currentStreak = 7;

  const planInfo: Record<string, { name: string; color: string; bg: string; border: string; icon: React.ElementType; gradient: string }> = {
    free: { name: 'Gratuito', color: 'text-text-muted', bg: 'bg-bg/50', border: 'border-border/50', icon: Star, gradient: 'from-gray-500 to-gray-400' },
    premium: { name: 'Premium', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20', icon: Crown, gradient: 'from-accent to-pink-500' },
    family: { name: 'Família', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', icon: Crown, gradient: 'from-purple-500 to-indigo-500' },
  };

  const currentPlan = planInfo[user.plan] || planInfo.premium;
  const PlanIcon = currentPlan.icon;

  const tabs: { id: TabType; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'overview', label: 'Visão Geral', icon: Play },
    { id: 'favorites', label: 'Favoritos', icon: Heart, count: favorites.length },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-[120px] animate-float-delayed" />
      </div>

      {/* ==================== HEADER ==================== */}
      <section className="relative border-b border-border/50 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative group flex-shrink-0">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative">
                {/* Avatar border glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 to-purple-500/30 rounded-2xl blur-lg opacity-50" />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-2xl ring-2 ring-white/10"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 ring-3 ring-bg shadow-lg shadow-green-500/30" />
                
                {/* Edit button */}
                <button className="absolute -top-1.5 -right-1.5 w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm border border-border/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-accent/40 shadow-lg hover:shadow-accent/20">
                  <Edit3 className="w-3.5 h-3.5 text-text-muted/60" />
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              {/* Name & Plan */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">{user.name}</h1>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg ${currentPlan.bg} ${currentPlan.color} ${currentPlan.border} border`}>
                  <PlanIcon className="w-3.5 h-3.5" />
                  {currentPlan.name}
                </span>
              </div>

              {/* Email & Member since */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted/60">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-text-muted/40" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-text-muted/40" />
                  <span>Membro desde {formatDate(user.memberSince)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TAB NAV ==================== */}
      <div className="sticky top-16 z-30 bg-bg/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-0.5 py-3 overflow-x-auto">
            <div className="flex gap-0.5 bg-card/40 border border-border/50 rounded-xl p-0.5 backdrop-blur-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/20'
                      : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-bg text-text-muted/50'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* ==================== CONTENT ==================== */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Horas Ouvidas', value: `${totalListened}h`, icon: Headphones, trend: '+12%', color: 'from-accent to-pink-500' },
                { label: 'Séries Completas', value: seriesCompleted.toString(), icon: Trophy, trend: '+1', color: 'from-purple-500 to-indigo-500' },
                { label: 'Favoritos', value: favorites.length.toString(), icon: Heart, trend: '', color: 'from-rose-500 to-pink-500' },
                { label: 'Dias Seguidos', value: currentStreak.toString(), icon: Zap, trend: '🔥', color: 'from-amber-500 to-orange-500' },
              ].map((stat, i) => (
                <div key={i} className="group relative bg-card/40 border border-border/50 rounded-xl p-4 hover:border-accent/20 transition-all overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      {stat.trend && (
                        <span className="text-[10px] font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                          {stat.trend}
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-black text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted/50 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-text-muted/70 uppercase tracking-wider mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Alterar Plano', desc: 'Upgrade ou downgrade do seu plano', icon: Crown, color: 'accent', to: '/subscription' },
                  { label: 'Preferências', desc: 'Idioma, tema e notificações', icon: Settings, color: 'purple', tab: 'settings' as const },
                ].map((action, i) => (
                  <Link
                    key={i}
                    to={action.to || '#'}
                    onClick={() => action.tab && setActiveTab(action.tab)}
                    className="group flex items-center gap-4 bg-card/40 border border-border/50 rounded-xl px-5 py-4 hover:border-accent/20 transition-all"
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      action.color === 'accent' ? 'bg-accent/10' : 'bg-purple-500/10'
                    }`}>
                      <action.icon className={`w-5 h-5 ${action.color === 'accent' ? 'text-accent' : 'text-purple-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{action.label}</p>
                      <p className="text-xs text-text-muted/50">{action.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted/20 group-hover:text-text-muted/50 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Favorites */}
            {favoriteSeriesList.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-text-muted/70 uppercase tracking-wider">Favoritos Recentes</h3>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className="text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    Ver todos
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {favoriteSeriesList.slice(0, 4).map((s) => (
                    <SeriesCard
                      key={s.id}
                      series={s}
                      isFavorite={true}
                      onToggleFavorite={() => toggleFavorite(s.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAVORITES */}
        {activeTab === 'favorites' && (
          <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center shadow-lg shadow-accent/30">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Seus Favoritos</h2>
                <p className="text-sm text-text-muted/60">
                  {favoriteSeriesList.length} {favoriteSeriesList.length === 1 ? 'série salva' : 'séries salvas'}
                </p>
              </div>
            </div>

            {favoriteSeriesList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {favoriteSeriesList.map((s) => (
                  <SeriesCard
                    key={s.id}
                    series={s}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(s.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card/30 border border-border/50 rounded-2xl">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-accent/5 flex items-center justify-center mx-auto">
                    <Bookmark className="w-8 h-8 text-accent/20" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border border-accent/20 animate-pulse-glow" />
                </div>
                <p className="text-text-muted/70 text-sm mb-2">Nenhum favorito ainda</p>
                <p className="text-xs text-text-muted/50 mb-6">Explore o catálogo e salve suas séries preferidas</p>
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white text-sm font-medium hover:shadow-lg hover:shadow-accent/30 transition-all hover:scale-105 active:scale-95"
                >
                  Explorar catálogo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="bg-card/40 border border-border/50 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-border/50">
                <h3 className="text-sm font-semibold text-text-primary">Perfil</h3>
                <p className="text-xs text-text-muted/50 mt-0.5">Informações da sua conta</p>
              </div>
              <div className="divide-y divide-border/30">
                {[
                  { label: 'Nome', value: user.name, icon: Star },
                  { label: 'Email', value: user.email, icon: Mail },
                  { label: 'Plano', value: currentPlan.name, icon: Crown },
                  { label: 'Membro desde', value: formatDate(user.memberSince), icon: Calendar },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/5 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-accent/60" />
                      </div>
                      <span className="text-sm text-text-muted/60">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-card/40 border border-border/50 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-border/50">
                <h3 className="text-sm font-semibold text-text-primary">Preferências</h3>
                <p className="text-xs text-text-muted/50 mt-0.5">Personalize sua experiência</p>
              </div>
              <div className="divide-y divide-border/30">
                {[
                  { label: 'Notificações', desc: 'Alertas de novos episódios', icon: Bell },
                  { label: 'Privacidade', desc: 'Configurações de conta', icon: Shield },
                  { label: 'Aparência', desc: 'Tema e cores', icon: Palette },
                  { label: 'Idioma', desc: 'Português (BR)', icon: Globe },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/5 flex items-center justify-center">
                        <pref.icon className="w-4 h-4 text-accent/60" />
                      </div>
                      <div>
                        <p className="text-sm text-text-primary">{pref.label}</p>
                        <p className="text-xs text-text-muted/40">{pref.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted/20 group-hover:text-text-muted/50 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Logout */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-red-500/10">
                <h3 className="text-sm font-semibold text-red-400/70">Conta</h3>
                <p className="text-xs text-red-400/50 mt-0.5">Gerencie sua sessão</p>
              </div>
              <div className="px-6 py-4">
                {!showLogoutConfirm ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-red-500/5 flex items-center justify-center">
                        <LogOut className="w-4 h-4 text-red-400/60" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">Sair da conta</p>
                        <p className="text-xs text-text-muted/50">Encerrar sessão atual</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400/70 text-xs font-medium hover:bg-red-500/20 transition-all border border-red-500/10"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text-muted/60">Tem certeza que deseja sair?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="px-4 py-2 rounded-lg bg-card border border-border/50 text-xs font-medium text-text-muted/70 hover:text-text-primary transition-all"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => { logout(); navigate('/auth/login'); }}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-all"
                      >
                        Sim, sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
