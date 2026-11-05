import { request } from '../../core/lib/httpClient';

export function listarTrabajadores(token) {
  return request('/trabajadores', { token });
}

export function obtenerTrabajador(id, token) {
  return request(`/trabajadores/${id}`, { token });
}