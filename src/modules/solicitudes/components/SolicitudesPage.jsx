import { useSolicitudes } from '../hooks/useSolicitudes';
import { useAuth } from '../../auth/hooks/useAuth';
import SolicitudItem from './SolicitudItem';
import MensajeError from '../../core/components/MensajeError';

function SolicitudesPage() {
  const { solicitudes, cargando, error, ejecutarAccion } = useSolicitudes();
  const { usuario } = useAuth();

  if (cargando) {
    return <p>Cargando solicitudes...</p>;
  }

  return (
    <section>
      <h2>Mis solicitudes</h2>
      <MensajeError error={error} />
      {solicitudes.length === 0 && !error && <p>No tienes solicitudes</p>}
      <ul style={{ display: 'grid', gap: 12, padding: 0 }}>
        {solicitudes.map((s) => (
          <SolicitudItem
            key={s.id}
            solicitud={s}
            rol={usuario?.rol}
            onAccion={ejecutarAccion}
          />
        ))}
      </ul>
    </section>
  );
}

export default SolicitudesPage;
