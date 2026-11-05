import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { crearSolicitud } from '../services/solicitudesService';
import Boton from '../../core/design-system/Boton';
import MensajeError from '../../core/components/MensajeError';

function NuevaSolicitudForm({ trabajadorId }) {
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  async function manejarEnvio(evento) {
    evento.preventDefault();          // evita que el navegador recargue la página
    setError(null);
    setEnviando(true);
    try {
      // El contratante NO se envía: el backend lo toma del token
      await crearSolicitud({ trabajadorId, descripcion }, token);
      navigate('/solicitudes');
    } catch (e) {
      setError(e.message);            // por ejemplo, el 403 si lo intenta un TRABAJADOR
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={manejarEnvio} style={{ display: 'grid', gap: 12, maxWidth: 480, marginTop: 24 }}>
      <h3>Nueva solicitud</h3>
      <label>
        Describe el trabajo que necesitas
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={4}
          required
        />
      </label>
      <MensajeError error={error} />
      <Boton type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar solicitud'}
      </Boton>
    </form>
  );
}

export default NuevaSolicitudForm;
