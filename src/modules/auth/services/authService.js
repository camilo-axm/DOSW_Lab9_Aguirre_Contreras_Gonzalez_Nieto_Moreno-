import { request } from '../../core/lib/httpClient';

export function login(correo, password) {
    return request('/auth/login', { method: 'POST', body: { correo, password } });
}

export function obtenerMiPerfil(token) {
    return request('/usuarios/me', { token });
}