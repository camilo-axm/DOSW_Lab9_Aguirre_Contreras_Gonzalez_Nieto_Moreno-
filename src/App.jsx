import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './modules/auth/states/AuthProvider';
import LoginPage from './modules/auth/components/LoginPage';
import RutaProtegida from './modules/core/components/RutaProtegida';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RutaProtegida />}>
            <Route path="/trabajadores" element={<p>Bloque 2: lista de trabajadores</p>} />
            <Route path="/trabajadores/:id" element={<p>Bloque 3: perfil del trabajador</p>} />
            <Route path="/solicitudes" element={<p>Bloque 4: mis solicitudes</p>} />
          </Route>
          <Route path="*" element={<Navigate to="/trabajadores" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
