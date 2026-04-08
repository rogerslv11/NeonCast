// ============================================================
// App.tsx - Rotas e estrutura principal da aplicação
// ============================================================
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PlayerProvider } from './contexts/PlayerContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import gsap from 'gsap';

// Pages
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import SerieDetail from './pages/SerieDetail';
import Narrators from './pages/Narrators';
import NarratorDetail from './pages/NarratorDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Player from './pages/Player';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Checkout from './pages/Checkout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSeries from './pages/admin/Series';
import AdminSeriesForm from './pages/admin/SeriesForm';
import AdminNarrators from './pages/admin/Narrators';
import AdminNarratorForm from './pages/admin/NarratorForm';
import AdminNews from './pages/admin/News';
import AdminNewsForm from './pages/admin/NewsForm';
import AdminSettings from './pages/admin/Settings';
import AdminUsers from './pages/admin/Users';
import AdminUserForm from './pages/admin/UserForm';

// Componente para animação de página com GSAP
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-content',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return <div className="page-content">{children}</div>;
}

// Layout wrapper com padding para o player
function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');
  const isPlayerPage = location.pathname === '/player';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className={isAuthPage || isPlayerPage || isAdminPage ? '' : 'pb-8'}>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <main className={isAuthPage || isAdminPage ? '' : 'pt-16 md:pt-16'}>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/catalogo/:id" element={<SerieDetail />} />
              <Route path="/narradores" element={<Narrators />} />
              <Route path="/narradores/:id" element={<NarratorDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/player" element={<ProtectedRoute><Player /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Admin Routes - require admin role */}
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><AdminAnalytics /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/users/new" element={<ProtectedRoute requireAdmin><AdminUserForm /></ProtectedRoute>} />
              <Route path="/admin/users/:id" element={<ProtectedRoute requireAdmin><AdminUserForm /></ProtectedRoute>} />
              <Route path="/admin/series" element={<ProtectedRoute requireAdmin><AdminSeries /></ProtectedRoute>} />
              <Route path="/admin/series/new" element={<ProtectedRoute requireAdmin><AdminSeriesForm /></ProtectedRoute>} />
              <Route path="/admin/series/:id" element={<ProtectedRoute requireAdmin><AdminSeriesForm /></ProtectedRoute>} />
              <Route path="/admin/narrators" element={<ProtectedRoute requireAdmin><AdminNarrators /></ProtectedRoute>} />
              <Route path="/admin/narrators/new" element={<ProtectedRoute requireAdmin><AdminNarratorForm /></ProtectedRoute>} />
              <Route path="/admin/narrators/:id" element={<ProtectedRoute requireAdmin><AdminNarratorForm /></ProtectedRoute>} />
              <Route path="/admin/news" element={<ProtectedRoute requireAdmin><AdminNews /></ProtectedRoute>} />
              <Route path="/admin/news/new" element={<ProtectedRoute requireAdmin><AdminNewsForm /></ProtectedRoute>} />
              <Route path="/admin/news/:id" element={<ProtectedRoute requireAdmin><AdminNewsForm /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
            </Routes>
          </MainLayout>
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
