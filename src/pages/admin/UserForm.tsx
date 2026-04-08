import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Trash2,
  User,
  Mail,
  Shield,
  Crown,
  Check,
  Eye,
  EyeOff,
  Key,
  AlertTriangle,
  AlertCircle,
  Link2,
  Type,
  Image,
  Zap,
  Clock,
  Calendar,
  Sparkles,
  X,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const mockUsers: Record<string, { name: string; email: string; role: string; status: string; subscription: string; avatar: string }> = {
  'user-1': { name: 'João Silva', email: 'joao@email.com', role: 'admin', status: 'active', subscription: 'premium', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
};

export default function UserForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingUser = isEdit ? mockUsers[id] : null;

  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'preview'>('info');
  const [name, setName] = useState(existingUser?.name || '');
  const [email, setEmail] = useState(existingUser?.email || '');
  const [role, setRole] = useState(existingUser?.role || 'user');
  const [status, setStatus] = useState(existingUser?.status || 'active');
  const [subscription, setSubscription] = useState(existingUser?.subscription || 'free');
  const [avatarUrl, setAvatarUrl] = useState(existingUser?.avatar || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formErrors = [];
  if (!name.trim()) formErrors.push('Nome é obrigatório');
  if (!email.trim()) formErrors.push('Email é obrigatório');
  if (!isEdit && !password) formErrors.push('Senha é obrigatória');
  if (password && password !== confirmPassword) formErrors.push('Senhas não conferem');

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabels = ['', 'Fraca', 'Média', 'Forte'];
  const strengthColors = ['', 'text-red-400', 'text-amber-400', 'text-green-400'];
  const strengthBars = ['', 'bg-red-400', 'bg-amber-400', 'bg-green-400'];

  return (
    <AdminLayout>
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px -5px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 30px 0px rgba(139, 92, 246, 0.5); }
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
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card/80 via-card/50 to-card/30 glass-effect border border-border/50 p-4 sm:p-6 card-hover">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/8 to-purple-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-32 h-32 bg-violet-500/3 rounded-full blur-xl pointer-events-none animate-pulse" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={() => navigate('/admin/users')} className="group w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-text-muted/70 hover:text-text-primary hover:border-violet-500/40 hover:bg-violet-500/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center shadow-xl ring-2 ring-white/10">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/5 animate-shimmer" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">{isEdit ? 'Editar Usuário' : 'Novo Usuário'}</h1>
                    <p className="text-xs sm:text-sm text-text-muted/70 flex items-center gap-1.5">
                      {isEdit ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                          Editando: <span className="text-violet-400 font-semibold">{existingUser?.name}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-violet-400/60" />
                          Preencha os dados para criar um novo usuário
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {isEdit && (
                <button className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold hover:bg-red-500/15 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/10">
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" /><span className="hidden sm:inline">Excluir</span>
                </button>
              )}
              <button onClick={handleSave} disabled={formErrors.length > 0} className={`group inline-flex items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg hover:shadow-xl ${saved ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 text-green-400 hover:shadow-green-500/20' : 'bg-gradient-to-r from-accent to-pink-500 text-white shadow-accent/25 hover:shadow-accent/40 hover:scale-105'}`}>
                {saved ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="hidden sm:inline">Salvo com sucesso!</span><span className="sm:hidden">Salvo!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Salvar Usuário</span><span className="sm:hidden">Salvar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {formErrors.length > 0 && (
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/8 to-red-500/3 p-4 sm:p-5 flex items-start gap-3 sm:gap-4 animate-fade-in-up">
            <div className="absolute inset-0 animate-shimmer" />
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                Campos obrigatórios
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
          <div className="flex gap-1.5 sm:gap-2 bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 w-fit shadow-lg overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
            {[
              { value: 'info' as const, label: 'Informações', labelShort: 'Info', icon: Type, color: 'from-violet-500 to-purple-500' },
              { value: 'security' as const, label: 'Segurança', labelShort: 'Segurança', icon: Shield, color: 'from-blue-500 to-cyan-500' },
              { value: 'preview' as const, label: 'Pré-visualizar', labelShort: 'Preview', icon: Eye, color: 'from-emerald-500 to-green-500' },
            ].map((tab) => (
              <button key={tab.value} onClick={() => setActiveTab(tab.value)} className={`group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 min-w-max sm:min-w-0 ${activeTab === tab.value ? 'text-white shadow-xl' : 'text-text-muted/60 hover:text-text-primary hover:bg-card/60'}`}>
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
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Personal Info */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center"><User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" /></div>
                  <div><h2 className="text-sm sm:text-base font-bold text-text-primary">Informações Pessoais</h2><p className="text-[10px] sm:text-xs text-text-muted/60">Dados do usuário</p></div>
                </div>
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2"><Type className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-muted/40" />Nome Completo</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do usuário" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2"><Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-muted/40" />Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/40" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2"><Image className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-muted/40" />URL do Avatar</label>
                    <div className="flex gap-2 sm:gap-3">
                      <div className="relative flex-1">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/40" />
                        <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://exemplo.com/avatar.jpg" className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all" />
                      </div>
                      {avatarUrl && (
                        <div className="relative group">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border border-border/50 ring-1 ring-white/5">
                            <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          </div>
                          <button onClick={() => setAvatarUrl('')} className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><X className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Role */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" /></div>
                  <div><h2 className="text-sm sm:text-base font-bold text-text-primary">Permissões</h2><p className="text-[10px] sm:text-xs text-text-muted/60">Cargo e status</p></div>
                </div>
                <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    {[
                      { value: 'user', label: 'Usuário', icon: User, desc: 'Acesso básico', color: 'text-gray-400' },
                      { value: 'moderator', label: 'Moderador', icon: Shield, desc: 'Modera conteúdo', color: 'text-blue-400' },
                      { value: 'admin', label: 'Admin', icon: Crown, desc: 'Acesso total', color: 'text-accent' },
                    ].map((r) => (
                      <button key={r.value} onClick={() => setRole(r.value)} className={`w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border transition-all text-left ${role === r.value ? 'border-accent/40 bg-accent/5 ring-1 ring-accent/20' : 'border-border/40 bg-white/[0.02] hover:border-border/60'}`}>
                        <r.icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${role === r.value ? 'text-accent' : 'text-text-muted/40'}`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs sm:text-sm font-semibold ${role === r.value ? 'text-accent' : 'text-text-primary'}`}>{r.label}</p>
                          <p className="text-[10px] text-text-muted/50">{r.desc}</p>
                        </div>
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center flex-shrink-0 ${role === r.value ? 'bg-accent text-white' : 'border border-border/50'}`}>
                          {role === r.value && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-1.5 sm:mb-2">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl focus:outline-none focus:border-accent/50 text-text-primary">
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                      <option value="banned">Banido</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Subscription */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /></div>
                  <div><h2 className="text-sm sm:text-base font-bold text-text-primary">Assinatura</h2><p className="text-[10px] sm:text-xs text-text-muted/60">Tipo de acesso</p></div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button onClick={() => setSubscription('free')} className={`flex flex-col items-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${subscription === 'free' ? 'border-green-500/40 bg-green-500/10 ring-1 ring-green-500/20' : 'border-border/40 bg-white/[0.02] hover:border-border/60'}`}>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${subscription === 'free' ? 'bg-green-500/20' : 'bg-white/5'}`}><User className={`w-4 h-4 sm:w-5 sm:h-5 ${subscription === 'free' ? 'text-green-400' : 'text-text-muted/40'}`} /></div>
                      <span className={`text-xs sm:text-sm font-bold ${subscription === 'free' ? 'text-green-400' : 'text-text-muted/60'}`}>Grátis</span>
                    </button>
                    <button onClick={() => setSubscription('premium')} className={`flex flex-col items-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${subscription === 'premium' ? 'border-amber-500/40 bg-amber-500/10 ring-1 ring-amber-500/20' : 'border-border/40 bg-white/[0.02] hover:border-border/60'}`}>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${subscription === 'premium' ? 'bg-amber-500/20' : 'bg-white/5'}`}><Crown className={`w-4 h-4 sm:w-5 sm:h-5 ${subscription === 'premium' ? 'text-amber-400' : 'text-text-muted/40'}`} /></div>
                      <span className={`text-xs sm:text-sm font-bold ${subscription === 'premium' ? 'text-amber-400' : 'text-text-muted/60'}`}>Premium</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /></div>
                  <div><h2 className="text-sm sm:text-base font-bold text-text-primary">Live Preview</h2><p className="text-[10px] sm:text-xs text-text-muted/60">Como ficará</p></div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border/40 bg-gradient-to-br from-card/80 to-card/40">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Preview" className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover mx-auto ring-2 ring-white/5 shadow-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mx-auto ring-2 ring-white/5"><User className="w-6 h-6 sm:w-8 sm:h-8 text-violet-400/40" /></div>
                    )}
                    <p className="text-xs sm:text-sm font-bold text-text-primary mt-2 sm:mt-3">{name || 'Nome do usuário'}</p>
                    <p className="text-[10px] sm:text-xs text-text-muted/50">{email || 'email@exemplo.com'}</p>
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      <span className={`text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${role === 'admin' ? 'bg-accent/10 text-accent border border-accent/20' : role === 'moderator' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                        {role === 'admin' ? 'Admin' : role === 'moderator' ? 'Moderador' : 'Usuário'}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${subscription === 'premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                        {subscription === 'premium' ? 'Premium' : 'Grátis'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SECURITY TAB ==================== */}
        {activeTab === 'security' && (
          <div className="max-w-2xl animate-fade-in-up space-y-4 sm:space-y-6">
            {!isEdit ? (
              <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" /></div>
                  <div><h2 className="text-sm sm:text-base font-bold text-text-primary">Definir Senha</h2><p className="text-[10px] sm:text-xs text-text-muted/60">Senha inicial do usuário</p></div>
                </div>
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2"><Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-muted/40" />Senha</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/40" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha segura" className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-text-primary transition-colors">{showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}</button>
                    </div>
                    {password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] sm:text-xs font-semibold ${strengthColors[passwordStrength]}`}>Força: {strengthLabels[passwordStrength]}</span>
                          <span className="text-[10px] text-text-muted/40">{password.length} caracteres</span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength ? strengthBars[passwordStrength] : 'bg-white/5'}`} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2"><Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-muted/40" />Confirmar Senha</label>
                    <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme a senha" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all" />
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-[10px] text-red-400/60 mt-1 flex items-center gap-1"><AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />Senhas não conferem</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" /></div>
                    <div><h2 className="text-sm sm:text-base font-bold text-text-primary">Alterar Senha</h2><p className="text-[10px] sm:text-xs text-text-muted/60">Deixe vazio para manter a atual</p></div>
                  </div>
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-1.5 sm:mb-2">Nova Senha</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/40" />
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Deixe vazio para manter" className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-xs sm:text-sm bg-bg/50 border border-border/40 rounded-lg sm:rounded-xl placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-text-primary transition-colors">{showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-xl sm:rounded-2xl border border-red-500/30 bg-red-500/5 overflow-hidden">
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-red-500/20 flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center"><AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" /></div>
                    <div><h2 className="text-sm sm:text-base font-bold text-red-400">Zona de Perigo</h2><p className="text-[10px] sm:text-xs text-red-400/60">Ações irreversíveis</p></div>
                  </div>
                  <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                    <button className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-red-500/20 text-red-400 text-xs sm:text-sm font-semibold hover:bg-red-500/10 transition-all">
                      <span>Banir Usuário</span>
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-red-500/20 text-red-400 text-xs sm:text-sm font-semibold hover:bg-red-500/10 transition-all">
                      <span>Resetar Senha</span>
                      <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== PREVIEW TAB ==================== */}
        {activeTab === 'preview' && (
          <div className="max-w-xl mx-auto animate-fade-in-up px-4 sm:px-0">
            <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /></div>
                <div><h2 className="text-sm sm:text-base font-bold text-text-primary">Pré-visualização</h2><p className="text-[10px] sm:text-xs text-text-muted/60">Perfil do usuário</p></div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-br from-card/80 to-card/40">
                  {/* Header */}
                  <div className="h-20 sm:h-24 bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-accent/10 relative">
                    <div className="absolute -bottom-7 sm:-bottom-8 left-4 sm:left-5">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Preview" className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover ring-3 sm:ring-4 ring-card shadow-xl" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center ring-3 sm:ring-4 ring-card shadow-xl"><User className="w-6 h-6 sm:w-8 sm:h-8 text-violet-400/40" /></div>
                      )}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="pt-10 sm:pt-12 px-4 sm:px-5 pb-4 sm:pb-5">
                    <p className="text-base sm:text-lg font-black text-text-primary">{name || 'Nome do usuário'}</p>
                    <p className="text-xs sm:text-sm text-text-muted/50 mb-2 sm:mb-3">{email || 'email@exemplo.com'}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${role === 'admin' ? 'bg-accent/10 text-accent border border-accent/20' : role === 'moderator' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                        {role === 'admin' ? 'Admin' : role === 'moderator' ? 'Moderador' : 'Usuário'}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${subscription === 'premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                        {subscription === 'premium' ? 'Premium' : 'Grátis'}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : status === 'banned' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                        {status === 'active' ? 'Ativo' : status === 'banned' ? 'Banido' : 'Inativo'}
                      </span>
                    </div>
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
