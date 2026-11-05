function SolicitudItem({ solicitud }) {
  return (
    <li style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, listStyle: 'none' }}>
      <strong>Solicitud #{solicitud.id}</strong>
      <p>{solicitud.descripcion}</p>
      <p>Estado: <strong>{solicitud.estado}</strong></p>
      {/* Bloque 6: aquí van los botones según el rol y el estado */}
    </li>
  );
}

export default SolicitudItem;
