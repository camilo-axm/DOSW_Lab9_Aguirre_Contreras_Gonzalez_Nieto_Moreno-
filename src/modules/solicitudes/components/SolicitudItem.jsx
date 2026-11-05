import Boton from '../../core/design-system/Boton';

function SolicitudItem({ solicitud, rol, onAccion }) {
  const pendiente = solicitud.estado === 'PENDIENTE';
  const aceptada = solicitud.estado === 'ACEPTADA';

  return (
    <li style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, listStyle: 'none' }}>
      <strong>Solicitud #{solicitud.id}</strong>
      <p>{solicitud.descripcion}</p>
      <p>Estado: <strong>{solicitud.estado}</strong></p>

      {rol === 'TRABAJADOR' && pendiente && (
        <>
          <Boton onClick={() => onAccion(solicitud.id, 'aceptar')}>Aceptar</Boton>{' '}
          <Boton variante="secundario" onClick={() => onAccion(solicitud.id, 'rechazar')}>
            Rechazar
          </Boton>
        </>
      )}

      {rol === 'CONTRATANTE' && (pendiente || aceptada) && (
        <Boton variante="secundario" onClick={() => onAccion(solicitud.id, 'cancelar')}>
          Cancelar
        </Boton>
      )}
    </li>
  );
}

export default SolicitudItem;
