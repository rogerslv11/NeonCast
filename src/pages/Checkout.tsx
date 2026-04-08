// ============================================================
// Checkout Page - Ultra Premium Design (PIX + Crypto only)
// ============================================================
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { plans } from '../data/data';
import {
  ArrowLeft, Check, Shield, QrCode, Coins,
  Copy, CheckCircle, Clock, Zap, Wallet, Info,
  Sparkles, Crown, Zap as ZapIcon, ArrowRight, Timer
} from 'lucide-react';

type PaymentMethod = 'pix' | 'crypto';
type CryptoCurrency = 'btc' | 'eth' | 'usdt';

const CRYPTO_OPTIONS = [
  { id: 'btc' as CryptoCurrency, name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  { id: 'eth' as CryptoCurrency, name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { id: 'usdt' as CryptoCurrency, name: 'USDT (TRC20)', symbol: 'USDT', icon: '₮', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
];

const CRYPTO_ADDRESSES: Record<CryptoCurrency, string> = {
  btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  eth: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  usdt: 'TN2Y7yVRLs1uvLZzPjH9Hkv5sKs1LBH8ys',
};

const CRYPTO_AMOUNT: Record<CryptoCurrency, string> = {
  btc: '0.00095 BTC',
  eth: '0.0158 ETH',
  usdt: '67.30 USDT',
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan');
  const plan = plans.find((p) => p.id === planId);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('btc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pixGenerated, setPixGenerated] = useState(false);
  const [cryptoPaymentSent, setCryptoPaymentSent] = useState(false);
  const [pixTimer, setPixTimer] = useState(1800); // 30 min in seconds
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (pixGenerated && pixTimer > 0) {
      const interval = setInterval(() => setPixTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [pixGenerated, pixTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-accent/30" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Nenhum plano selecionado</h2>
          <p className="text-text-muted mb-6 text-sm">Selecione um plano para continuar</p>
          <Link to="/subscription" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-semibold hover:bg-accent/20 transition-all">
            Ver planos disponíveis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full animate-fade-in">
          <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-10 shadow-2xl shadow-black/20">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse" />
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                <Check className="w-12 h-12 text-accent" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-text-primary mb-3">Pagamento Confirmado!</h1>
            <p className="text-sm text-text-secondary/80 mb-1">
              Seu plano <span className="font-bold text-accent">{plan.name}</span> foi ativado.
            </p>
            <p className="text-xs text-text-muted/50 mb-8">Redirecionando para o perfil...</p>
            <button
              onClick={() => navigate('/profile')}
              className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-accent to-pink-500 hover:shadow-xl hover:shadow-accent/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto"
            >
              Ir para o perfil agora
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 170, 0.2); } 50% { box-shadow: 0 0 40px rgba(255, 0, 170, 0.4); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* ==================== HERO ==================== */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-accent/4 to-transparent" />
        <div className="absolute top-8 right-8 w-48 h-48 bg-accent/6 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link to="/subscription" className="group inline-flex items-center gap-2 text-sm text-text-muted/70 hover:text-text-primary transition-all mb-6 px-3 py-2 rounded-xl hover:bg-card/50 border border-transparent hover:border-border/50">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar aos planos
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Checkout Seguro</p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text-primary">Finalizar assinatura</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* ==================== LEFT: Payment ==================== */}
          <div className="lg:col-span-3 space-y-6">
            {/* Plan Summary */}
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {plan.id === 'premium' ? <Crown className="w-4 h-4 text-accent" /> : <ZapIcon className="w-4 h-4 text-blue-400" />}
                    <h2 className="text-lg font-bold text-text-primary">{plan.name}</h2>
                  </div>
                  <p className="text-xs text-text-muted/70">{plan.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-2xl font-black text-text-primary">{plan.price}</p>
                  <p className="text-xs text-text-muted/60">{plan.period}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
              {/* Tabs */}
              <div className="grid grid-cols-2 border-b border-border/40">
                {[
                  { id: 'pix' as PaymentMethod, label: 'PIX', sublabel: 'Instantâneo', icon: QrCode, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
                  { id: 'crypto' as PaymentMethod, label: 'Criptomoeda', sublabel: 'BTC, ETH, USDT', icon: Coins, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-2 py-5 px-4 text-sm font-medium transition-all relative ${
                      paymentMethod === method.id ? method.color : 'text-text-muted/50 hover:text-text-muted/70'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      paymentMethod === method.id ? method.bg : 'bg-white/5'
                    }`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <span>{method.label}</span>
                    <span className="text-[10px] text-text-muted/40">{method.sublabel}</span>
                    {paymentMethod === method.id && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${method.color.replace('text-', 'via-')} to-transparent`} />
                    )}
                  </button>
                ))}
              </div>

              {/* ==================== PIX PAYMENT ==================== */}
              {paymentMethod === 'pix' && (
                <div className="p-6 animate-fade-in-up">
                  {!pixGenerated ? (
                    <div>
                      {/* Info Banner */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20 mb-6">
                        <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Pagamento instantâneo via PIX</p>
                          <p className="text-xs text-text-muted/70 mt-0.5">Gere o QR Code e pague com qualquer app bancário</p>
                        </div>
                      </div>

                      {/* QR Preview */}
                      <div className="bg-bg/40 rounded-2xl p-8 mb-6 text-center border border-border/30">
                        <div className="w-44 h-44 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                          <QrCode className="w-24 h-24 text-gray-700" />
                        </div>
                        <p className="text-xs text-text-muted/70">QR Code será gerado ao clicar no botão abaixo</p>
                      </div>

                      {/* Generate Button */}
                      <button
                        onClick={() => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setPixGenerated(true); }, 1200); }}
                        disabled={isProcessing}
                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl hover:shadow-green-500/20 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:-translate-y-0.5"
                      >
                        {isProcessing ? (
                          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Gerando PIX...</>
                        ) : (
                          <><Zap className="w-5 h-5" />Gerar QR Code PIX</>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Success Banner */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20 mb-6">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-text-primary">QR Code gerado!</p>
                          <p className="text-xs text-text-muted/70 mt-0.5">Escaneie ou copie o código para pagar</p>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="bg-white rounded-2xl p-6 mb-6 shadow-inner">
                        <div className="w-52 h-52 mx-auto flex items-center justify-center">
                          <QrCode className="w-36 h-36 text-gray-800" />
                        </div>
                      </div>

                      {/* PIX Code Copy */}
                      <div className="mb-6">
                        <label className="block text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-2">Código PIX (copia e cola)</label>
                        <div className="flex gap-2">
                          <div className="flex-1 px-3 py-3 bg-bg/50 border border-border/40 rounded-xl text-xs text-text-muted/60 font-mono truncate flex items-center">
                            00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b087-a85c9c2c4d5f5204000053039865405{plan.price.replace(/\D/g, '')}5802BR5913NEONCAST6008SAOPAULO62070503***6304E2CA
                          </div>
                          <button
                            onClick={() => copyToClipboard('00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b087-a85c9c2c4d5f', 'pix')}
                            className={`px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-1.5 ${
                              copiedField === 'pix'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20'
                            }`}
                          >
                            {copiedField === 'pix' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedField === 'pix' ? 'Copiado!' : 'Copiar'}
                          </button>
                        </div>
                      </div>

                      {/* Timer */}
                      <div className={`flex items-center justify-between p-4 rounded-xl border mb-6 ${pixTimer < 300 ? 'bg-red-500/5 border-red-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                        <div className="flex items-center gap-2">
                          <Timer className={`w-4 h-4 ${pixTimer < 300 ? 'text-red-400' : 'text-yellow-400'}`} />
                          <p className="text-xs text-text-muted/70">Expira em</p>
                        </div>
                        <span className={`text-sm font-mono font-bold ${pixTimer < 300 ? 'text-red-400' : 'text-yellow-400'}`}>
                          {formatTime(pixTimer)}
                        </span>
                      </div>

                      {/* Confirm Button */}
                      <button
                        onClick={() => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setIsSuccess(true); setTimeout(() => navigate('/profile'), 2000); }, 1500); }}
                        disabled={isProcessing}
                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl hover:shadow-green-500/20 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:-translate-y-0.5"
                      >
                        {isProcessing ? (
                          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verificando pagamento...</>
                        ) : (
                          <><CheckCircle className="w-5 h-5" />Já paguei, confirmar</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== CRYPTO PAYMENT ==================== */}
              {paymentMethod === 'crypto' && (
                <div className="p-6 animate-fade-in-up">
                  {!cryptoPaymentSent ? (
                    <div>
                      {/* Info Banner */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 mb-6">
                        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                          <Coins className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Pagamento com criptomoedas</p>
                          <p className="text-xs text-text-muted/70 mt-0.5">Envie o valor exato para o endereço abaixo</p>
                        </div>
                      </div>

                      {/* Crypto Selector */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {CRYPTO_OPTIONS.map((crypto) => (
                          <button
                            key={crypto.id}
                            onClick={() => setSelectedCrypto(crypto.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                              selectedCrypto === crypto.id
                                ? `${crypto.bg} ${crypto.border} ring-1 ${crypto.border.replace('/20', '/30')}`
                                : 'border-border/30 bg-bg/30 hover:border-border/50'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-full ${crypto.bg} flex items-center justify-center`}>
                              <span className={`text-lg font-black ${crypto.color}`}>{crypto.icon}</span>
                            </div>
                            <span className="text-xs font-bold text-text-primary">{crypto.symbol}</span>
                            <span className="text-[9px] text-text-muted/40">{crypto.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Payment Details */}
                      <div className="bg-bg/40 rounded-2xl p-5 mb-6 border border-border/30">
                        {/* Amount */}
                        <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/30">
                          <span className="text-sm text-text-muted/70">Valor em {CRYPTO_OPTIONS.find(c => c.id === selectedCrypto)?.symbol}:</span>
                          <span className="text-lg font-black text-text-primary font-mono">{CRYPTO_AMOUNT[selectedCrypto]}</span>
                        </div>

                        {/* Wallet Address */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted/70 uppercase tracking-wider mb-2">
                            <Wallet className="w-3.5 h-3.5" />
                            Endereço da carteira
                          </label>
                          <div className="flex gap-2">
                            <div className="flex-1 px-3 py-3 bg-bg/50 border border-border/40 rounded-xl text-xs text-text-muted/50 font-mono truncate flex items-center">
                              {CRYPTO_ADDRESSES[selectedCrypto]}
                            </div>
                            <button
                              onClick={() => copyToClipboard(CRYPTO_ADDRESSES[selectedCrypto], 'crypto')}
                              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-1.5 ${
                                copiedField === 'crypto'
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20'
                              }`}
                            >
                              {copiedField === 'crypto' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copiedField === 'crypto' ? 'Copiado!' : 'Copiar'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Warning */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 mb-6">
                        <Info className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-text-muted/70">
                          Envie <strong className="text-yellow-400">exatamente</strong> o valor mostrado acima. O pagamento será confirmado após 1 confirmação na blockchain.
                        </p>
                      </div>

                      {/* Confirm Button */}
                      <button
                        onClick={() => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setCryptoPaymentSent(true); }, 1500); }}
                        disabled={isProcessing}
                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:-translate-y-0.5"
                      >
                        {isProcessing ? (
                          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Aguardando confirmação...</>
                        ) : (
                          <><Sparkles className="w-5 h-5" />Já enviei o pagamento</>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 bg-orange-500/10 rounded-3xl blur-xl animate-pulse" />
                        <div className="relative w-20 h-20 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                          <Clock className="w-10 h-10 text-orange-400" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary mb-2">Aguardando confirmação</h3>
                      <p className="text-sm text-text-muted/70 mb-6 max-w-sm mx-auto">
                        Seu pagamento está sendo verificado na blockchain. Isso pode levar alguns minutos.
                      </p>

                      {/* Confirmation steps */}
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
                          <span className="text-xs text-text-muted/60">1/3</span>
                        </div>
                        <div className="w-8 h-px bg-border/40" />
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <span className="text-xs text-text-muted/30">2/3</span>
                        </div>
                        <div className="w-8 h-px bg-border/40" />
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <span className="text-xs text-text-muted/30">3/3</span>
                        </div>
                      </div>

                      <button
                        onClick={() => { setIsSuccess(true); setTimeout(() => navigate('/profile'), 2000); }}
                        className="text-sm text-accent hover:underline font-medium"
                      >
                        Simular confirmação (demo)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-text-muted/40">
              <Shield className="w-3.5 h-3.5" />
              Pagamento seguro e criptografado (demonstração)
            </div>
          </div>

          {/* ==================== RIGHT: Order Summary ==================== */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Order Card */}
              <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border/40">
                  <h3 className="text-base font-bold text-text-primary">Resumo do pedido</h3>
                </div>

                <div className="p-6">
                  {/* Plan Info */}
                  <div className="flex items-center gap-4 p-4 bg-bg/40 rounded-xl mb-5 border border-border/30">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${plan.id === 'premium' ? 'bg-accent/10' : 'bg-blue-500/10'}`}>
                      {plan.id === 'premium' ? <Crown className="w-6 h-6 text-accent" /> : <ZapIcon className="w-6 h-6 text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary truncate">{plan.name}</p>
                      <p className="text-xs text-text-muted/60">{plan.period}</p>
                    </div>
                    <p className="text-xl font-black text-text-primary">{plan.price}</p>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center justify-between text-sm py-3 border-t border-border/30">
                    <span className="text-text-muted/60">Método</span>
                    <span className="text-text-primary font-semibold flex items-center gap-1.5">
                      {paymentMethod === 'pix' && <><QrCode className="w-4 h-4 text-green-400" /> PIX</>}
                      {paymentMethod === 'crypto' && <><Coins className="w-4 h-4 text-orange-400" /> {CRYPTO_OPTIONS.find(c => c.id === selectedCrypto)?.symbol}</>}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between py-4 border-t border-border/30">
                    <span className="text-sm font-bold text-text-primary">Total</span>
                    <div className="text-right">
                      <p className="text-2xl font-black text-text-primary">{plan.price}</p>
                      <p className="text-xs text-text-muted/60">{plan.period}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs font-semibold text-text-muted/50 uppercase tracking-wider mb-3">Incluso no plano</p>
                    <ul className="space-y-2.5">
                      {plan.features.slice(0, 5).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-secondary/70">
                          <Check className="w-3.5 h-3.5 text-accent/70 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Help Card */}
              <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-5 text-center">
                <p className="text-xs text-text-muted/60">
                  Precisa de ajuda?{' '}
                  <button className="text-accent hover:underline font-semibold">Entre em contato</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
