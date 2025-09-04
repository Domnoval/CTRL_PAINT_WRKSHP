import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuth } from '@/stores/auth'

// Sacred quantum workshop components
import { QuantumPortal } from '@/components/QuantumPortal'
import { AuthGuard } from '@/components/AuthGuard'
import { LandingPage } from '@/pages/LandingPage'
import { WorkshopLobby } from '@/pages/WorkshopLobby'

// Mystical routing configuration
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<QuantumAuth />} />

          {/* Protected routes */}
          <Route
            path="/workshop"
            element={
              <AuthGuard>
                <QuantumPortal />
              </AuthGuard>
            }
          />
          <Route
            path="/lobby"
            element={
              <AuthGuard>
                <WorkshopLobby />
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
