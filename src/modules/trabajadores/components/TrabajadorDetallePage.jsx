import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import MensajeError from '../../core/components/MensajeError';
import { obtenerTrabajador } from '../service/trabajadoresService';

function TrabajadorDetallePage() {
    const { id } = useParams();
    const { token, usuario, logout } = useAuth();
    const [trabajador, setTrabajador] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerTrabajador(id, token)
            .then((datos) => {
                setTrabajador(datos);
                setError(null);
            })
            .catch((e) => {
                if (e.status === 401) {
                    logout(); // token vencido: volver al login
                } else if (e.status === 404) {
                    setError('El trabajador no existe');
                } else {
                    setError(e.message);
                }
            });
    }, [id, token, logout]);

    if (error) {
        return (
            <section>
                <MensajeError error={error} />
                <Link to="/trabajadores">Volver a trabajadores</Link>
            </section>
        );
    }

    if (!trabajador) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <section>
            <Link to="/trabajadores">← Volver a trabajadores</Link>
            <h2>{trabajador.nombre}</h2>
            <p>Oficio: {trabajador.oficioPrincipal ?? 'Oficio sin definir'}</p>
            <p>Zona: {trabajador.zona ?? 'Zona sin definir'}</p>

            {usuario?.rol === 'CONTRATANTE' && <p>Aquí irá el formulario del bloque 5</p>}
        </section>
    );
}

export default TrabajadorDetallePage;

