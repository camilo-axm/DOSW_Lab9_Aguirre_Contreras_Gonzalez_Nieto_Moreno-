const BASE_URL = '/api/v1';

export async function request(ruta, { method = 'GET', body, token } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const respuesta = await fetch(BASE_URL + ruta, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!respuesta.ok) {
        const apiError = await respuesta.json().catch(() => ({}));
        const error = new Error(apiError.mensaje ?? `Error ${respuesta.status}`);
        error.status = respuesta.status;
        throw error;
    }

    return respuesta.status === 204 ? null : respuesta.json();
}
