# OficioYa · Front-End (React + Vite)

Primera aplicación de React para OficioYa. Permite iniciar sesión, buscar trabajadores, enviarles solicitudes de servicio y gestionarlas según el rol (`CONTRATANTE` o `TRABAJADOR`).

**Asignatura:** Desarrollo y Operaciones de Software (DOSW) · Escuela Colombiana de Ingeniería Julio Garavito
**Squad:** Worker

## Requisitos

- Node.js 20.19 o superior (o 22.12 o superior) y npm.
- El back de OficioYa corriendo en `http://localhost:8080` con el perfil `dev`. Repositorio del back: [<URL-repo-back>](https://github.com/Juan-N369/DOSW_Lab8_Aguirre_Contreras_Gonzalez_Nieto_Moreno-.git)

## Cómo ejecutarlo

1. Levantar el back (ver el README del repositorio del back).
2. Instalar dependencias y arrancar el front:

```bash
npm install
npm run dev
```

3. Abrir `http://localhost:5173`.

Otros comandos: `npm run build` (compila para producción) y `npm run lint` (revisa el código).

El front reenvía las peticiones `/api` al back mediante el proxy de Vite (`vite.config.js`), por lo que no requiere configurar CORS.

## Usuarios de prueba

El front no tiene registro. Los usuarios se crean directamente en el back (`POST /api/v1/auth/registro`):

| Rol | Correo | Contraseña |
| --- | --- | --- |
| `CONTRATANTE` | carla@example.com | ContrasenaDemo123! |
| `TRABAJADOR` | pedro@example.com | ContrasenaDemo123! |