import { request } from '../../core/lib/httpClient';

export function listarSolicitudes(token) {
  return request('/solicitudes', { token });
}

export function crearSolicitud(datos, token) {
  return request('/solicitudes', { method: 'POST', body: datos, token });
}

// accion: 'aceptar' | 'rechazar' | 'cancelar'
export function cambiarEstado(id, accion, token) {
  return request(`/solicitudes/${id}/${accion}`, { method: 'PATCH', token });
}
