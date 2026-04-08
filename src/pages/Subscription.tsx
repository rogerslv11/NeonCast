// ============================================================
// Subscription Plans Page (Ultra Premium Design - 2 Plans)
// ============================================================
import { plans } from '../data/data';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Crown, Zap, Sparkles, ArrowRight, Shield, Headphones, Clock, Download, Music, Star, Gift, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Subscription() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);

  const freePlan = plans.find(p => p.id === 'free')!;
  const premiumPlan = plans.find(p => p.id === 'premium')!;

  const premiumPrice = annual ? 'R$ 19,90' : premiumPlan.price;
  const premiumPeriod = annual ? '/mês (cobrado anualmente)' : premiumPlan.period;
  const premiumSavings = annual ? 'Economize R$ 60/ano' : '';

  return (
    <div className="min-h-screen bg-bg">
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes glow-pulse { 0%, 100% { box-shadow: 0 0 30px rgba(255, 0, 170, 0.2); } 50% { box-shadow: 0 0 60px rgba(255, 0, 170, 0.4); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      {/* ==================== HERO ==================== */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-accent/4 to-transparent" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent/6 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Link to="/" className="group inline-flex items-center gap-2 text-sm text-text-muted/70 hover:text-text-primary transition-all mb-8 px-3 py-2 rounded-xl hover:bg-card/50 border border-transparent hover:border-border/50">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao início
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Planos & Preços</p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-text-primary mb-4 leading-tight">
            Escolha o plano
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink-400 to-accent/80"> perfeito</span>
            <br />para você
          </h1>
          <p className="text-base sm:text-lg text-text-muted/80 max-w-xl leading-relaxed">
            Comece grátis e faça upgrade quando quiser. Sem compromisso, cancele a qualquer momento.
          </p>
        </div>
      </div>

      {/* ==================== PLANS ==================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Toggle Annual/Monthly */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-semibold ${!annual ? 'text-text-primary' : 'text-text-muted/50'}`}>Mensal</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-all ${annual ? 'bg-accent' : 'bg-card border border-border/50'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${annual ? 'left-7' : 'left-0.5'}`} />
          </button>
          <span className={`text-sm font-semibold ${annual ? 'text-text-primary' : 'text-text-muted/50'}`}>
            Anual
            {annual && <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">-20%</span>}
          </span>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {[
            { icon: Shield, text: 'Pagamento seguro' },
            { icon: Gift, text: '7 dias grátis' },
            { icon: ArrowRight, text: 'Cancele quando quiser' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-text-muted/60">
              <badge.icon className="w-3.5 h-3.5 text-accent/60" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Plans Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* FREE PLAN */}
          <div className="group relative rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-8 hover:border-border/80 transition-all duration-500 hover:shadow-xl">
            <div className="relative">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-black text-text-primary mb-2">{freePlan.name}</h3>
              <p className="text-sm text-text-muted/70 leading-relaxed mb-6">{freePlan.description}</p>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-border/40">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-text-primary">{freePlan.price}</span>
                  <span className="text-sm text-text-muted/60">{freePlan.period}</span>
                </div>
                <p className="text-xs text-text-muted/40 mt-2">Para sempre gratuito</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {freePlan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-sm text-text-secondary leading-snug">{feature}</span>
                  </li>
                ))}
                {/* Missing features as X */}
                {[
                  'Sem anúncios',
                  'Download offline',
                  'Acesso antecipado',
                  'Conteúdo exclusivo',
                ].map((f, i) => (
                  <li key={`x-${i}`} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-text-muted/30" />
                    </div>
                    <span className="text-sm text-text-muted/30 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => navigate('/')}
                className="w-full py-3.5 rounded-xl text-sm font-bold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {freePlan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PREMIUM PLAN */}
          <div className="group relative rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-8 shadow-2xl shadow-accent/10 hover:shadow-accent/15 transition-all duration-500 hover:scale-[1.02]">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white shadow-xl shadow-accent/30 flex items-center gap-1.5 animate-glow-pulse">
                <Star className="w-3 h-3" />
                Mais Popular
              </span>
            </div>

            {/* Background glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-accent/10 via-transparent to-accent/10 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-pink-500/20 border border-accent/30 flex items-center justify-center mb-6 animate-glow-pulse">
                <Crown className="w-7 h-7 text-accent" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-black text-text-primary mb-2">{premiumPlan.name}</h3>
              <p className="text-sm text-text-muted/70 leading-relaxed mb-6">{premiumPlan.description}</p>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-border/40">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-400">{premiumPrice}</span>
                  <span className="text-sm text-text-muted/60">{premiumPeriod}</span>
                </div>
                {premiumSavings && (
                  <p className="text-xs font-semibold text-green-400 mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {premiumSavings}
                  </p>
                )}
                {!premiumSavings && <p className="text-xs text-text-muted/40 mt-2">7 dias grátis incluídos</p>}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {premiumPlan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-text-secondary leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => navigate(`/checkout?plan=premium${annual ? '&billing=annual' : ''}`)}
                className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-accent to-pink-500 text-white hover:shadow-xl hover:shadow-accent/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                {premiumPlan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ==================== COMPARISON TABLE ==================== */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-text-primary mb-2">Comparação de Recursos</h2>
            <p className="text-sm text-text-muted/60">Veja o que cada plano oferece</p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-border/40">
              <div className="px-5 py-4 text-xs font-semibold text-text-muted/50 uppercase tracking-wider">Recurso</div>
              <div className="px-5 py-4 text-center">
                <span className="text-xs font-bold text-blue-400">Free</span>
              </div>
              <div className="px-5 py-4 text-center bg-accent/5">
                <span className="text-xs font-bold text-accent">Premium</span>
              </div>
            </div>
            {/* Rows */}
            {[
              { feature: 'Séries disponíveis', free: 'Selecionadas', premium: 'Todas (10+)' },
              { feature: 'Qualidade de áudio', free: 'Padrão', premium: 'HD / Ultra HD' },
              { feature: 'Anúncios', free: 'Sim', premium: 'Zero' },
              { feature: 'Dispositivos simultâneos', free: '1', premium: '3' },
              { feature: 'Download offline', free: '—', premium: '✓' },
              { feature: 'Acesso antecipado', free: '—', premium: '✓' },
              { feature: 'Conteúdo exclusivo', free: '—', premium: '✓' },
              { feature: 'Suporte prioritário', free: '—', premium: '✓' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-border/20 last:border-b-0 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                <div className="px-5 py-3.5 text-xs font-medium text-text-secondary">{row.feature}</div>
                <div className="px-5 py-3.5 text-center text-xs text-text-muted/60">{row.free}</div>
                <div className="px-5 py-3.5 text-center text-xs font-semibold text-accent bg-accent/5">{row.premium}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-text-primary mb-2">Perguntas Frequentes</h2>
            <p className="text-sm text-text-muted/60">Tudo que você precisa saber</p>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Posso cancelar a qualquer momento?', a: 'Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais. O acesso permanece ativo até o fim do período pago.' },
              { q: 'O plano gratuito tem limitações?', a: 'O plano gratuito oferece acesso a séries selecionadas com anúncios entre episódios. Para acesso completo, faça upgrade para o Premium.' },
              { q: 'Como funciona os 7 dias grátis?', a: 'Ao assinar o plano Premium, você tem 7 dias grátis para explorar todos os recursos. Se cancelar dentro desse período, não será cobrado.' },
              { q: 'Posso mudar de plano depois?', a: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A diferença será calculada proporcionalmente.' },
            ].map((faq, i) => (
              <div key={i} className="p-5 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl hover:border-accent/20 transition-all">
                <h3 className="text-sm font-bold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-xs text-text-muted/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
