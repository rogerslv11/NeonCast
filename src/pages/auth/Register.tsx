// ============================================================
// Register Page - Clean Professional Design
// ============================================================
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Headphones, ArrowRight, Check } from 'lucide-react';

const FEATURES = [
  'Conteúdo selecionado grátis',
  'Qualidade de áudio premium',
  'Novas séries toda semana',
  'Cancele quando quiser',
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialRegister = (provider: string) => {
    setIsLoading(provider);
    register(`${provider} User`, `user@${provider.toLowerCase()}.com`, '');
    setTimeout(() => {
      setIsLoading(null);
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left Panel - Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-accent/10" />

        {/* Large decorative text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter leading-none">
            CAST
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xl font-bold text-white tracking-wider">
              NEON<span className="text-accent">CAST</span>
            </span>
          </div>

          {/* Center content */}
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white leading-tight mb-6">
              Comece a ouvir
              <br />
              <span className="text-accent">grátis agora</span>
            </h2>

            {/* Features list */}
            <div className="space-y-3">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-white/60">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['#ff00aa', '#aa00ff', '#00aaff', '#ffaa00'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-xs text-white/40">+1.250 ouvintes ativos</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xl font-bold text-text-primary tracking-wider">
              NEON<span className="text-accent">CAST</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Crie sua conta</h1>
            <p className="text-sm text-text-muted/60">Sem cartão de crédito necessário</p>
          </div>

          {/* Social buttons */}
          <div className="mb-10">
            {/* Google */}
            <button
              onClick={() => handleSocialRegister('Google')}
              disabled={isLoading !== null}
              className="group w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border/60 bg-white/[0.02] text-text-primary text-sm font-medium hover:bg-white/[0.04] hover:border-border transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading === 'Google' ? (
                <div className="w-4 h-4 border-2 border-text-muted/30 border-t-text-primary rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="flex-1 text-left">Criar com Google</span>
                  <svg className="w-4 h-4 text-text-muted/30 group-hover:text-text-muted/50 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-border/40" />
              <span className="text-[10px] text-text-muted/30 uppercase tracking-wider">ou</span>
              <div className="flex-1 h-px bg-border/40" />
            </div>

            {/* GitHub */}
            <button
              onClick={() => handleSocialRegister('GitHub')}
              disabled={isLoading !== null}
              className="group w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border/60 bg-white/[0.02] text-text-primary text-sm font-medium hover:bg-white/[0.04] hover:border-border transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading === 'GitHub' ? (
                <div className="w-4 h-4 border-2 border-text-muted/30 border-t-text-primary rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="flex-1 text-left">Criar com GitHub</span>
                  <svg className="w-4 h-4 text-text-muted/30 group-hover:text-text-muted/50 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-text-muted/50">
            Já tem conta?{' '}
            <a href="/auth/login" className="text-text-primary hover:text-accent font-medium transition-colors inline-flex items-center gap-1">
              Fazer login
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
