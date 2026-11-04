import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import Boton from '../design-system/Boton';

function Navbar() {
    const { usuario, logout } = useAuth();

    return (
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, borderBottom: '1px solid #e5e7eb' }}>
            <strong>OficioYa</strong>
            <Link to="/trabajadores">Trabajadores</Link>
            <Link to="/solicitudes">Mis solicitudes</Link>
            <span style={{ marginLeft: 'auto' }}>{usuario?.nombre} ({usuario?.rol})</span>
            <Boton variante="secundario" onClick={logout}>Cerrar sesión</Boton>
        </nav>
    );
}

export default Navbar;