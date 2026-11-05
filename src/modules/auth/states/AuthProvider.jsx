import { useCallback, useState } from 'react';
import { AuthContext } from './AuthContext';
import * as authService from '../services/authService';

export function AuthProvider({ children }) {
    // El token vive solo en memoria: si se recarga la página, hay que iniciar sesión de nuevo
    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);

    async function login(correo, password) {
        const respuesta = await authService.login(correo, password);
        const perfil = await authService.obtenerMiPerfil(respuesta.accessToken);
        setToken(respuesta.accessToken);
        setUsuario(perfil);
    }

    const logout = useCallback(() => {
        setToken(null);
        setUsuario(null);
    }, []);

    return (
        <AuthContext.Provider value={{ token, usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}