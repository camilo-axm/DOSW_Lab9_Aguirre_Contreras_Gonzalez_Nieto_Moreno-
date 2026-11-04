import { Link } from 'react-router-dom';

function TrabajadorCard({ trabajador }) {
  return (
    <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <h3>{trabajador.nombre}</h3>
      <p>{trabajador.oficioPrincipal ?? 'Oficio sin definir'} · {trabajador.zona ?? 'Zona sin definir'}</p>
      <Link to={`/trabajadores/${trabajador.id}`}>Ver perfil</Link>
    </article>
  );
}

export default TrabajadorCard;