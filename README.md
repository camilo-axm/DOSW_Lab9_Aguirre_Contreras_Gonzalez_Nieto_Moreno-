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

## Estructura del proyecto (arquitectura de nivel 3)

El código está organizado por módulos: cada uno agrupa todo lo de una funcionalidad. El flujo dentro de cada módulo es **componente → hook → service → API**, y ningún componente llama a `fetch` directamente.

```text
src/modules/
├── core/
│   ├── components/        # Navbar, RutaProtegida, MensajeError
│   ├── design-system/     # Boton (+ su CSS Module)
│   └── lib/               # httpClient
├── auth/
│   ├── components/        # LoginPage
│   ├── hooks/             # useAuth
│   ├── services/          # authService
│   └── states/            # AuthContext y AuthProvider
├── trabajadores/
│   ├── components/        # TrabajadoresPage, TrabajadorCard, TrabajadorDetallePage
│   ├── hooks/             # useTrabajadores
│   └── services/          # trabajadoresService
└── solicitudes/
    ├── components/        # SolicitudesPage, SolicitudItem, NuevaSolicitudForm
    ├── hooks/             # useSolicitudes
    └── services/          # solicitudesService
```

| Módulo | Qué contiene |
| --- | --- |
| `core` | Lo que comparten los demás módulos: barra de navegación, ruta protegida, mensaje de error, botón reutilizable y `httpClient`, la única puerta hacia la API. |
| `auth` | Inicio de sesión y manejo de la sesión (token y usuario) con `useContext`. |
| `trabajadores` | Lista de trabajadores y perfil de cada uno. |
| `solicitudes` | Lista de solicitudes, creación de una nueva y acciones (aceptar, rechazar, cancelar) según el rol. |