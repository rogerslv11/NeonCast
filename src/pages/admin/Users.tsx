import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users as UsersIcon,
  Search,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Calendar,
  Crown,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  UserPlus,
  Filter,
  X,
  MoreHorizontal,
  Check,
  Sparkles,
  Zap,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Pagination from '../../components/Pagination';

// Mock users data
const mockUsers = [
  { id: 'user-1', name: 'João Silva', email: 'joao@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', role: 'admin', status: 'active', joinDate: '2024-01-15', subscription: 'premium', lastLogin: '2024-04-05' },
  { id: 'user-2', name: 'Maria Santos', email: 'maria@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-02-20', subscription: 'free', lastLogin: '2024-04-04' },
  { id: 'user-3', name: 'Pedro Oliveira', email: 'pedro@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-03-10', subscription: 'premium', lastLogin: '2024-04-03' },
  { id: 'user-4', name: 'Ana Costa', email: 'ana@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', role: 'moderator', status: 'active', joinDate: '2024-01-25', subscription: 'premium', lastLogin: '2024-04-02' },
  { id: 'user-5', name: 'Carlos Ferreira', email: 'carlos@email.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'inactive', joinDate: '2024-04-01', subscription: 'free', lastLogin: '2024-03-15' },
  { id: 'user-6', name: 'Lucia Mendes', email: 'lucia@email.com', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-03-05', subscription: 'premium', lastLogin: '2024-04-01' },
  { id: 'user-7', name: 'Rafael Souza', email: 'rafael@email.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-02-14', subscription: 'free', lastLogin: '2024-03-28' },
  { id: 'user-8', name: 'Beatriz Lima', email: 'beatriz@email.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'banned', joinDate: '2024-01-08', subscription: 'free', lastLogin: '2024-02-20' },
  { id: 'user-9', name: 'Thiago Rocha', email: 'thiago@email.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-03-22', subscription: 'premium', lastLogin: '2024-04-05' },
  { id: 'user-10', name: 'Fernanda Alves', email: 'fernanda@email.com', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-04-02', subscription: 'free', lastLogin: '2024-04-04' },
  { id: 'user-11', name: 'Gustavo Pereira', email: 'gustavo@email.com', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-02-28', subscription: 'premium', lastLogin: '2024-04-03' },
  { id: 'user-12', name: 'Camila Ribeiro', email: 'camila@email.com', avatar: 'https://images.unsplash.com/photo-1502767089025-6572583495f9?w=100&h=100&fit=crop&crop=face', role: 'moderator', status: 'active', joinDate: '2024-01-30', subscription: 'premium', lastLogin: '2024-04-02' },
  { id: 'user-13', name: 'Diego Martins', email: 'diego@email.com', avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'inactive', joinDate: '2024-03-18', subscription: 'free', lastLogin: '2024-03-10' },
  { id: 'user-14', name: 'Isabela Nunes', email: 'isabela@email.com', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-04-03', subscription: 'premium', lastLogin: '2024-04-05' },
  { id: 'user-15', name: 'Leonardo Araújo', email: 'leonardo@email.com', avatar: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-02-10', subscription: 'free', lastLogin: '2024-03-30' },
  { id: 'user-16', name: 'Patricia Barros', email: 'patricia@email.com', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219d5bb?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-03-25', subscription: 'premium', lastLogin: '2024-04-04' },
  { id: 'user-17', name: 'Roberto Cunha', email: 'roberto@email.com', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'banned', joinDate: '2024-01-20', subscription: 'free', lastLogin: '2024-02-15' },
  { id: 'user-18', name: 'Sofia Monteiro', email: 'sofia@email.com', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-04-04', subscription: 'free', lastLogin: '2024-04-05' },
  { id: 'user-19', name: 'Victor Dias', email: 'victor@email.com', avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-03-12', subscription: 'premium', lastLogin: '2024-04-01' },
  { id: 'user-20', name: 'Amanda Teixeira', email: 'amanda@email.com', avatar: 'https://images.unsplash.com/photo-1534751516642-a1af00e21b01?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-02-05', subscription: 'free', lastLogin: '2024-03-25' },
  { id: 'user-21', name: 'Bruno Cardoso', email: 'bruno@email.com', avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-04-05', subscription: 'premium', lastLogin: '2024-04-05' },
  { id: 'user-22', name: 'Carolina Moreira', email: 'carolina@email.com', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'inactive', joinDate: '2024-03-08', subscription: 'free', lastLogin: '2024-03-01' },
  { id: 'user-23', name: 'Daniel Correia', email: 'daniel@email.com', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face', role: 'user', status: 'active', joinDate: '2024-01-12', subscription: 'premium', lastLogin: '2024-04-04' },
  { id: 'user-24', name: 'Elena Vieira', email: 'elena@email.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face', role: 'moderator', status: 'active', joinDate: '2024-02-18', subscription: 'premium', lastLogin: '2024-04-03' },
];

const ITEMS_PER_PAGE = 8;

export default function Users() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      search === '' ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === 'active').length,
    inactive: mockUsers.filter((u) => u.status === 'inactive').length,
    banned: mockUsers.filter((u) => u.status === 'banned').length,
    premium: mockUsers.filter((u) => u.subscription === 'premium').length,
    free: mockUsers.filter((u) => u.subscription === 'free').length,
  };

  const hasActiveFilters = search || statusFilter !== 'all' || roleFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setRoleFilter('all');
    setCurrentPage(1);
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('pt-BR');

  const statusConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
    active: { label: 'Ativo', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', dot: 'bg-green-400' },
    inactive: { label: 'Inativo', bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20', dot: 'bg-gray-400' },
    banned: { label: 'Banido', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', dot: 'bg-red-400' },
  };

  const roleConfig: Record<string, { label: string; bg: string; text: string; border: string; icon: typeof Shield }> = {
    admin: { label: 'Admin', bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20', icon: Crown },
    moderator: { label: 'Moderador', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', icon: Shield },
    user: { label: 'Usuário', bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20', icon: UserCheck },
  };

  const quickFilters = [
    { label: 'Todos', value: 'all', active: statusFilter === 'all', onClick: () => { setStatusFilter('all'); setCurrentPage(1); } },
    { label: 'Ativos', value: 'active', active: statusFilter === 'active', onClick: () => { setStatusFilter('active'); setCurrentPage(1); } },
    { label: 'Premium', value: 'premium', active: statusFilter === 'all' && roleFilter === 'all', onClick: () => { /* custom */ } },
    { label: 'Novos', value: 'new', active: false, onClick: () => {} },
  ];

  return (
    <AdminLayout>
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      <div className="space-y-6">
        {/* ==================== HEADER ==================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 p-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center shadow-lg shadow-violet-500/10">
                  <UsersIcon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-text-primary">Usuários</h1>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{stats.total} cadastrados</span>
                  </div>
                  <p className="text-sm text-text-muted/70">Gerencie todos os usuários da plataforma</p>
                </div>
              </div>
            </div>
            <Link to="/admin/users/new" className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-accent to-pink-500 text-white text-sm font-bold hover:shadow-xl hover:shadow-accent/25 transition-all hover:-translate-y-0.5">
              <UserPlus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Adicionar Usuário
            </Link>
          </div>
        </div>

        {/* ==================== STATS ==================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: UsersIcon, label: 'Total', value: stats.total, color: 'violet', sub: `${stats.premium} premium` },
            { icon: UserCheck, label: 'Ativos', value: stats.active, color: 'green', sub: `${Math.round((stats.active / stats.total) * 100)}% do total` },
            { icon: Crown, label: 'Premium', value: stats.premium, color: 'amber', sub: `${stats.free} grátis` },
            { icon: UserX, label: 'Banidos', value: stats.banned, color: 'red', sub: `${stats.inactive} inativos` },
          ].map((stat, i) => (
            <div key={i} className={`group relative overflow-hidden p-4 bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/5 border border-${stat.color}-500/20 rounded-2xl hover:scale-[1.02] transition-all duration-300`}>
              <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-${stat.color}-500/10 blur-lg group-hover:bg-${stat.color}-500/20 transition-all`} />
              <div className="relative">
                <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-2`} />
                <p className="text-2xl font-black text-text-primary">{stat.value}</p>
                <p className="text-[10px] font-medium text-text-muted/60 uppercase tracking-wider">{stat.label}</p>
                <p className="text-[9px] text-text-muted/40 mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ==================== QUICK FILTERS ==================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Sparkles className="w-4 h-4 text-text-muted/40 flex-shrink-0" />
          <button onClick={() => { setStatusFilter('all'); setRoleFilter('all'); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${statusFilter === 'all' && roleFilter === 'all' ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-white/[0.02] border-border/30 text-text-muted/50 hover:text-text-primary hover:border-border/50'}`}>
            Todos
          </button>
          <button onClick={() => { setStatusFilter('active'); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${statusFilter === 'active' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/[0.02] border-border/30 text-text-muted/50 hover:text-text-primary hover:border-border/50'}`}>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400" />Ativos</span>
          </button>
          <button onClick={() => { setStatusFilter('inactive'); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${statusFilter === 'inactive' ? 'bg-gray-500/10 border-gray-500/30 text-gray-400' : 'bg-white/[0.02] border-border/30 text-text-muted/50 hover:text-text-primary hover:border-border/50'}`}>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-gray-400" />Inativos</span>
          </button>
          <button onClick={() => { setStatusFilter('banned'); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${statusFilter === 'banned' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/[0.02] border-border/30 text-text-muted/50 hover:text-text-primary hover:border-border/50'}`}>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-400" />Banidos</span>
          </button>
        </div>

        {/* ==================== SEARCH & FILTERS ==================== */}
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/40" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Buscar por nome ou email..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-bg/50 border border-border/40 rounded-xl placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg/60 flex items-center justify-center text-text-muted/40 hover:text-text-primary transition-colors"><X className="w-3 h-3" /></button>
              )}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${showFilters || hasActiveFilters ? 'bg-accent/10 border-accent/30 text-accent' : 'border-border/40 text-text-muted/60 hover:text-text-primary hover:bg-white/5'}`}>
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border/40 text-sm text-text-muted/60 hover:text-text-primary hover:bg-white/5 transition-all"><X className="w-3.5 h-3.5" />Limpar</button>
            )}
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/40">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-2">Status</label>
                <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2.5 text-sm bg-bg/50 border border-border/40 rounded-xl focus:outline-none focus:border-accent/50 text-text-primary">
                  <option value="all">Todos</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                  <option value="banned">Banidos</option>
                </select>
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-2">Cargo</label>
                <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2.5 text-sm bg-bg/50 border border-border/40 rounded-xl focus:outline-none focus:border-accent/50 text-text-primary">
                  <option value="all">Todos</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderador</option>
                  <option value="user">Usuário</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-xs text-text-muted/60">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span>{filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}</span>
          </div>
        )}

        {/* ==================== USERS TABLE ==================== */}
        {paginatedUsers.length > 0 ? (
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border/40 text-[10px] font-semibold uppercase tracking-wider text-text-muted/50">
                <div className="col-span-4">Usuário</div>
                <div className="col-span-2">Cargo</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Plano</div>
                <div className="col-span-2">Cadastro</div>
                <div className="col-span-1">Último acesso</div>
                <div className="col-span-1 text-right">Ações</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-border/30">
                {paginatedUsers.map((user) => {
                  const isHovered = hoveredUserId === user.id;
                  const sc = statusConfig[user.status];
                  const rc = roleConfig[user.role];
                  return (
                    <div key={user.id} onMouseEnter={() => setHoveredUserId(user.id)} onMouseLeave={() => setHoveredUserId(null)} className={`group grid grid-cols-12 gap-4 px-5 py-3.5 transition-all duration-200 ${isHovered ? 'bg-accent/5' : 'hover:bg-white/[0.01]'}`}>
                      {/* User */}
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className={`absolute -inset-1 rounded-xl blur-md transition-opacity ${isHovered ? 'opacity-50' : 'opacity-0'}`} style={{ background: 'linear-gradient(135deg, rgba(255,0,170,0.3), rgba(120,0,255,0.3))' }} />
                          <img src={user.avatar} alt={user.name} className="relative w-10 h-10 rounded-xl object-cover ring-1 ring-white/5" />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${sc.dot} ring-2 ring-card`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-text-primary truncate group-hover:text-accent transition-colors">{user.name}</p>
                          <div className="flex items-center gap-1 text-xs text-text-muted/50">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Role */}
                      <div className="col-span-2 flex items-center">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${rc.bg} ${rc.text} border ${rc.border}`}>
                          <rc.icon className="w-3 h-3" />
                          <span className="text-[10px] font-bold">{rc.label}</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-1 flex items-center">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${sc.bg} ${sc.text} border ${sc.border}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${user.status === 'active' ? 'animate-pulse' : ''}`} />
                          <span className="text-[10px] font-bold">{sc.label}</span>
                        </div>
                      </div>

                      {/* Subscription */}
                      <div className="col-span-1 flex items-center">
                        {user.subscription === 'premium' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">Premium</span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">Grátis</span>
                        )}
                      </div>

                      {/* Join Date */}
                      <div className="col-span-2 flex items-center gap-1.5 text-xs text-text-muted/50">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(user.joinDate)}
                      </div>

                      {/* Last Login */}
                      <div className="col-span-1 flex items-center gap-1.5 text-xs text-text-muted/40">
                        <Clock className="w-3 h-3" />
                        {formatDate(user.lastLogin)}
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex items-center justify-end gap-1">
                        <div className={`flex items-center gap-1 transition-all duration-200 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                          <Link to={`/admin/users/${user.id}`} className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-amber-400 hover:bg-amber-500/10 transition-all"><Edit className="w-3.5 h-3.5" /></Link>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-text-primary hover:bg-white/5 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border/30">
              {paginatedUsers.map((user) => {
                const sc = statusConfig[user.status];
                const rc = roleConfig[user.role];
                return (
                  <div key={user.id} className="p-4 flex items-start gap-3">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 ring-1 ring-white/5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-text-primary truncate">{user.name}</p>
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${sc.bg} ${sc.text} border ${sc.border}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          <span className="text-[9px] font-bold">{sc.label}</span>
                        </div>
                      </div>
                      <p className="text-xs text-text-muted/50 mb-2">{user.email}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${rc.bg} ${rc.text} border ${rc.border}`}>
                          <rc.icon className="w-2.5 h-2.5" />{rc.label}
                        </span>
                        {user.subscription === 'premium' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">Premium</span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">Grátis</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                        <span className="text-[10px] text-text-muted/40">{formatDate(user.joinDate)}</span>
                        <div className="flex items-center gap-1">
                          <Link to={`/admin/users/${user.id}`} className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted/50 hover:text-amber-400 hover:bg-amber-500/10 transition-all"><Edit className="w-3.5 h-3.5" /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="px-5 pb-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={filteredUsers.length} itemsPerPage={ITEMS_PER_PAGE} label="usuários" />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
              <UsersIcon className="w-10 h-10 text-violet-400/30" />
            </div>
            <p className="text-text-muted text-lg font-bold mb-2">Nenhum usuário encontrado</p>
            <p className="text-sm text-text-muted/50 mb-6">Tente ajustar seus filtros de busca</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-accent hover:underline font-medium">Limpar filtros</button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
