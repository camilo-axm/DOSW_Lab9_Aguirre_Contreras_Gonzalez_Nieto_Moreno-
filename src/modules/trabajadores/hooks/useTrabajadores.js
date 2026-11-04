import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { listarTrabajadores } from '../services/trabajadoresService';

export function useTrabajadores() {
  const { token, logout } = useAuth();
  const [trabajadores, setTrabajadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarTrabajadores(token)
      .then((datos) => setTrabajadores(datos))
      .catch((e) => {
        if (e.status === 401) {
          logout();                   // token vencido: volver al login
        } else {
          setError(e.message);
        }
      })
      .finally(() => setCargando(false));
  }, [token, logout]);

  return { trabajadores, cargando, error };
}