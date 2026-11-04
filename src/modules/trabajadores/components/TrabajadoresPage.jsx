import { useTrabajadores } from '../hooks/useTrabajadores';
import TrabajadorCard from './TrabajadorCard';
import MensajeError from '../../core/components/MensajeError';

function TrabajadoresPage() {
  const { trabajadores, cargando, error } = useTrabajadores();

  if (cargando) {
    return <p>Cargando trabajadores...</p>;
  }

  return (
    <section>
      <h2>Trabajadores</h2>
      <MensajeError error={error} />
      {trabajadores.length === 0 && !error && <p>Aún no hay trabajadores registrados.</p>}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {trabajadores.map((t) => (
          <TrabajadorCard key={t.id} trabajador={t} />
        ))}
      </div>
    </section>
  );
}

export default TrabajadoresPage;