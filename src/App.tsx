import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AdminPage } from './pages/AdminPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AddressesPage } from './pages/AddressesPage';
import { OffersPage } from './pages/OffersPage';
import { StaticPage } from './pages/StaticPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserRole } from './types';
import { LoginModal } from './components/LoginModal';
import { CartDrawer } from './components/CartDrawer';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Loader } from './components/Loader';

function AppContent() {
  const { isLoginModalOpen, setLoginModalOpen } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showLogin) {
      setLoginModalOpen(true);
    }
  }, [location.state, setLoginModalOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnimatePresence>
        {isInitialLoading && <Loader />}
      </AnimatePresence>
      
      <Header />
      
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          
          {/* Public Static Routes */}
          <Route path="/about" element={<StaticPage />} />
          <Route path="/privacy" element={<StaticPage />} />
          <Route path="/terms" element={<StaticPage />} />
          <Route path="/contact" element={<StaticPage />} />
          <Route path="/track" element={<StaticPage />} />
          <Route path="/shipping" element={<StaticPage />} />
          <Route path="/returns" element={<StaticPage />} />
          <Route path="/faq" element={<StaticPage />} />

          {/* Private Routes */}
          <Route 
            path="/addresses" 
            element={
              <ProtectedRoute>
                <AddressesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/offers" 
            element={
              <ProtectedRoute>
                <OffersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
