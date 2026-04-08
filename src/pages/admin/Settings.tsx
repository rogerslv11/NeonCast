import { useState } from 'react';
import {
  Save,
  Globe,
  Palette,
  Search,
  AlertTriangle,
  Image as ImageIcon,
  Type,
  FileText,
  Tag,
  Trash2,
  RefreshCw,
  Check,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function Settings() {
  const [savedSection, setSavedSection] = useState<string | null>(null);

  const handleSave = (section: string) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Configurações</h1>
          <p className="text-text-secondary mt-1">Gerencie as configurações gerais da plataforma.</p>
        </div>

        {/* General Settings */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Configurações Gerais</h2>
              <p className="text-sm text-text-muted">Informações básicas do site.</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Nome do Site
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  defaultValue="NeonCast"
                  className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="Nome da plataforma"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Descrição do Site
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <textarea
                  defaultValue="A melhor plataforma de audiobooks e séries narrativas."
                  rows={3}
                  className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                  placeholder="Descrição da plataforma"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                URL do Logo
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  defaultValue="https://example.com/logo.png"
                  className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave('general')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/20 text-accent text-sm font-medium rounded-xl hover:bg-accent/20 transition-all"
              >
                {savedSection === 'general' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Salvo!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Appearance Settings */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Palette className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Aparência</h2>
              <p className="text-sm text-text-muted">Personalize o visual da plataforma.</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            {/* Theme Toggle Placeholder */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tema
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-3 px-4 py-3 bg-bg border-2 border-accent rounded-xl text-sm font-medium text-text-primary transition-all">
                    <div className="w-4 h-4 rounded-full bg-accent" />
                    Escuro
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 bg-bg border border-border rounded-xl text-sm font-medium text-text-muted hover:border-border/80 transition-all opacity-50 cursor-not-allowed">
                    <div className="w-4 h-4 rounded-full bg-gray-400" />
                    Claro
                    <span className="ml-auto text-[10px] bg-border px-1.5 py-0.5 rounded text-text-muted">Em breve</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Accent Color Picker Placeholder */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Cor de Destaque
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {['#ff00aa', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                        color === '#ff00aa' ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="relative flex-1 max-w-[140px]">
                  <input
                    type="text"
                    defaultValue="#ff00aa"
                    className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:border-accent/50 transition-all"
                    placeholder="#ff00aa"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave('appearance')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/20 text-accent text-sm font-medium rounded-xl hover:bg-accent/20 transition-all"
              >
                {savedSection === 'appearance' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Salvo!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">SEO</h2>
              <p className="text-sm text-text-muted">Otimização para mecanismos de busca.</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Meta Título
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  defaultValue="NeonCast - Audiobooks e Séries Narrativas"
                  className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="Título para mecanismos de busca"
                />
              </div>
              <p className="text-xs text-text-muted mt-1.5">Recomendado: 50-60 caracteres</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Meta Descrição
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <textarea
                  defaultValue="Ouça as melhores séries narrativas e audiobooks. Histórias imersivas com narração profissional."
                  rows={3}
                  className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                  placeholder="Descrição para mecanismos de busca"
                />
              </div>
              <p className="text-xs text-text-muted mt-1.5">Recomendado: 150-160 caracteres</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Palavras-chave
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  defaultValue="audiobook, séries narrativas, ficção científica, thriller, podcast"
                  className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="Separadas por vírgula"
                />
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-bg border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">Pré-visualização no Google</p>
              <div className="space-y-1">
                <p className="text-lg text-blue-400 font-medium truncate">NeonCast - Audiobooks e Séries Narrativas</p>
                <p className="text-sm text-green-400/80">https://neoncast.com</p>
                <p className="text-sm text-text-secondary line-clamp-2">
                  Ouça as melhores séries narrativas e audiobooks. Histórias imersivas com narração profissional.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave('seo')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/20 text-accent text-sm font-medium rounded-xl hover:bg-accent/20 transition-all"
              >
                {savedSection === 'seo' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Salvo!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-card border border-red-500/20 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-red-500/20">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-400">Zona de Perigo</h2>
              <p className="text-sm text-text-muted">Ações irreversíveis. Proceda com cautela.</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg border border-border rounded-xl">
              <div>
                <p className="text-sm font-medium text-text-primary">Resetar Dados</p>
                <p className="text-xs text-text-muted mt-0.5">Remove todos os dados e restaura os valores padrão.</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/20 transition-all">
                <RefreshCw className="w-4 h-4" />
                Resetar
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg border border-border rounded-xl">
              <div>
                <p className="text-sm font-medium text-text-primary">Limpar Cache</p>
                <p className="text-xs text-text-muted mt-0.5">Limpa todo o cache armazenado da plataforma.</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/20 transition-all">
                <Trash2 className="w-4 h-4" />
                Limpar
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
