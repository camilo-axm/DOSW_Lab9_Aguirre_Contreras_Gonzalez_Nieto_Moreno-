import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { listarSolicitudes, cambiarEstado } from '../services/solicitudesService';

export function useSolicitudes() {
  const { token, logout } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Se deja en una función aparte para poder recargar la lista
  
  const cargarSolicitudes = useCallback(() => {
    return listarSolicitudes(token)
      .then((datos) => {
        setSolicitudes(datos);
        setError(null);
      })
      .catch((e) => {
        if (e.status === 401) {
          logout();                   // token vencido: volver al login
        } else {
          setError(e.message);
        }
      })
      .finally(() => setCargando(false));
  }, [token, logout]);

  useEffect(() => {
    cargarSolicitudes();
  }, [cargarSolicitudes]);


  async function ejecutarAccion(id, accion) {
    setError(null);
    try {
      await cambiarEstado(id, accion, token);
      await cargarSolicitudes();      // recarga la lista con el nuevo estado
    } catch (e) {
      if (e.status === 401) {
        logout();
      } else {
        setError(e.message);         
      }
    }
  }

  return { solicitudes, cargando, error, ejecutarAccion };
}
