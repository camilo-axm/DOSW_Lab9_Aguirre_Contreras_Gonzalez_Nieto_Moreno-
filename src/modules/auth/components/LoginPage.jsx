import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Boton from '../../core/design-system/Boton';
import MensajeError from '../../core/design-system/MensajeError';

function LoginPage() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function manejarEnvio(evento) {
        evento.preventDefault();
        setError(null);
        setCargando(true);
        try {
            await login(correo, password);
            navigate('/trabajadores');
        } catch (e) {
            setError(e.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <form onSubmit={manejarEnvio} style={{ maxWidth: 320, margin: '64px auto', display: 'grid', gap: 12 }}>
            <h1>OficioYa</h1>
            <label>
                Correo
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </label>
            <label>
                Contraseña
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <MensajeError error={error} />
            <Boton type="submit" disabled={cargando}>
                {cargando ? 'Ingresando...' : 'Iniciar sesión'}
            </Boton>
        </form>
    );
}

export default LoginPage;