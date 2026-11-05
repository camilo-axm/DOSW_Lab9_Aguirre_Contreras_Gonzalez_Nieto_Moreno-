# Laboratorio de Front-End · Primera app en React para OficioYa

**Escuela Colombiana de Ingeniería Julio Garavito**  
**Asignatura:** Desarrollo y Operaciones de Software (DOSW)  
**Caso de estudio:** OficioYa  
**Material base:** presentación *CI/CD, DevOps y Front End con React* (semana 11)  
**Insumo:** API del [Laboratorio de Seguridad](https://github.com/DOSW-2026-2/security)  
**Modalidad:** squads de 4 o 5 integrantes · **duración máxima: 3 horas**

---

## 1. Descripción del reto

En el laboratorio anterior construyeron y protegieron con JWT la API de OficioYa: login, perfiles de trabajadores y solicitudes de servicio. Hasta ahora solo la han probado con Postman o `curl`.

En este laboratorio crearán **su primera aplicación de React** con **Vite**, organizada con la **arquitectura de nivel 3 (por módulos)** relacionada en la presentación, y la conectarán a esa API. Al final, un contratante podrá iniciar sesión, buscar un trabajador y enviarle una solicitud, y el trabajador podrá aceptarla o rechazarla, todo desde el navegador.

> **Alcance:** es un primer acercamiento. No se piden registro desde el front, diseño elaborado, pruebas automatizadas del front, TypeScript ni despliegue. El backend es el del laboratorio de seguridad y **no se modifica**.

> **Dos repositorios:** el front se construye en un **repositorio nuevo**, independiente del back. El repositorio del laboratorio de seguridad sigue siendo el del back y solo se usa para ejecutar la API. Front y back son aplicaciones distintas que se comunican únicamente por la API REST, así que cada una tiene su propio repositorio, su historial y su ciclo de entrega.

> **Insumo:** tomen como referencia el diseño de frontend definido para OficioYa (disponible [aquí](https://www.figma.com/make/p69PaywfgtrZ98mEcCS0kl/OficioYa-interfaz-web-responsive?code-node-id=0-6&p=f&fullscreen=1)).

```text
 Repositorio del back (laboratorio de seguridad)        Repositorio del front (nuevo)
 Spring Boot · http://localhost:8080      ◄── HTTP ──   React + Vite · http://localhost:5173
```

### Resultado esperado

- Un proyecto React creado con Vite que corre con `npm run dev` y compila con `npm run build`.
- Código organizado por módulos: `core`, `auth`, `trabajadores` y `solicitudes`.
- Pantallas de login, lista de trabajadores, perfil de un trabajador y "Mis solicitudes".
- Peticiones a la API con el token JWT en el encabezado `Authorization`.
- La interfaz cambia según el rol: el contratante crea y cancela; el trabajador acepta y rechaza.

## 2. Resultados de aprendizaje

Al finalizar, el equipo podrá:

- Crear y ejecutar un proyecto de React con Vite.
- Escribir componentes con JSX que reciben **props**.
- Manejar estado con `useState`, cargar datos con `useEffect` y compartir la sesión con `useContext`.
- Navegar entre pantallas con React Router (una SPA).
- Organizar un proyecto front por funcionalidades (arquitectura de nivel 3).
- Consumir una API REST protegida con JWT y mostrar sus errores (`401`, `403`, `404`, `409`).

## 3. Organización del equipo y del tiempo

| Fase | Tiempo | Quién | Qué se hace |
| --- | --- | --- | --- |
| 0 · Preparación | 0:00 – 0:20 | Todos | Bloque 0: verificar herramientas, levantar el back, crear el repositorio del front y el proyecto |
| 1 · Base común | 0:20 – 1:00 | Todos, en un solo computador | Bloque 1: módulos `core` y `auth`, rutas y login. PR a `develop` |
| 2 · Módulos | 1:00 – 2:15 | Cada integrante en su rama | Bloques 2 a 6, según la tabla de abajo |
| 3 · Integración | 2:15 – 2:40 | Todos | Revisión cruzada de PR, mezcla en `develop` y recorrido completo (sección 8) |
| 4 · Cierre | 2:40 – 3:00 | Todos | README, capturas y PR de `develop` a `main` |

### Responsabilidades en la fase 2

| Integrante | Bloque | Pantalla o pieza | Conceptos que practica |
| --- | --- | --- | --- |
| **A** | 2 | Lista de trabajadores | Componentes, props, `useEffect`, listas con `key` |
| **B** | 3 | Perfil de un trabajador | Rutas con parámetros (`useParams`), renderizado condicional |
| **C** | 4 | Mis solicitudes | Hook personalizado, estado de carga y error |
| **D** | 5 | Formulario de nueva solicitud | Formularios controlados, `useState`, `useNavigate` |
| **E** | 6 | Acciones sobre una solicitud | Eventos, props de función, UI según el rol |

**Squads de 4 integrantes:** C también hace el bloque 6.

**Para no bloquearse:** después de la fase 1 todos tienen el login funcionando, así que cada uno prueba su pantalla con usuarios reales. Si su pantalla necesita una pieza de otro compañero (por ejemplo, B necesita el formulario de D), usen un texto temporal y reemplácenlo en la integración.

## 4. Lo que ya tienen: la API del laboratorio de seguridad

Usarán solo estos endpoints (prefijo `/api/v1`):

| Método | Endpoint | Quién | Lo usa el bloque |
| --- | --- | --- | --- |
| `POST` | `/auth/login` | Público | 1 |
| `GET` | `/usuarios/me` | Autenticado | 1 (para saber el nombre y el rol) |
| `GET` | `/trabajadores` | Autenticado | 2 |
| `GET` | `/trabajadores/{id}` | Autenticado | 3 |
| `GET` | `/solicitudes` | `CONTRATANTE`, `TRABAJADOR` | 4 |
| `POST` | `/solicitudes` | `CONTRATANTE` | 5 |
| `PATCH` | `/solicitudes/{id}/aceptar` · `/rechazar` · `/cancelar` | Según el rol | 6 |

Los errores llegan con el formato `ApiError` del laboratorio anterior: `{ "status": 401, "error": "...", "mensaje": "...", "ruta": "..." }`. El front mostrará el campo `mensaje`.

> Si los nombres de los campos de sus DTO son distintos a los de los ejemplos (por ejemplo, `estado` o `oficioPrincipal`), ajusten el front a **su** API, no al revés.

## 5. Arquitectura del front: nivel 3 (por módulos)

Cada módulo agrupa todo lo de una funcionalidad del negocio. `core` tiene lo que comparten los demás.

```text
src/
├── assets/
├── modules/
│   ├── core/
│   │   ├── components/        # Navbar, RutaProtegida, MensajeError
│   │   ├── design-system/     # Boton (+ su CSS Module)
│   │   └── lib/               # httpClient: única puerta hacia la API
│   ├── auth/
│   │   ├── components/        # LoginPage
│   │   ├── hooks/             # useAuth
│   │   ├── services/          # authService (login, /usuarios/me)
│   │   └── states/            # AuthContext y AuthProvider (sesión)
│   ├── trabajadores/
│   │   ├── components/        # TrabajadoresPage, TrabajadorCard, TrabajadorDetallePage
│   │   ├── hooks/             # useTrabajadores
│   │   └── services/          # trabajadoresService
│   └── solicitudes/
│       ├── components/        # SolicitudesPage, SolicitudItem, NuevaSolicitudForm
│       ├── hooks/             # useSolicitudes
│       └── services/          # solicitudesService
├── App.jsx                    # Rutas de la aplicación
├── index.css
└── main.jsx
```

Así se reparte la responsabilidad en cada módulo, igual que en Spring Boot:

```text
 Componente (UI)  ──usa──►  Hook (estado y efectos)  ──usa──►  Service (llamadas HTTP)  ──►  API REST
 TrabajadoresPage           useTrabajadores                    trabajadoresService
```

**Regla del equipo:** un componente **nunca** llama a `fetch` directamente. Siempre pasa por un *service*, y todos los services usan `core/lib/httpClient.js`.

## 6. Desarrollo paso a paso

Cada bloque va en su rama (`feature/...`) creada desde `develop`, y se mezcla con un PR que revisa otro integrante.

### Bloque 0 · Preparación (`feature/front-setup`) · Todos

**1. Verifiquen las herramientas.** Vite necesita Node.js 20.19 o superior (o 22.12 o superior):

```bash
node -v
npm -v
```

**2. Levanten el back desde su repositorio del laboratorio de seguridad**, con el perfil `dev`, en `http://localhost:8080`. Ese repositorio no se modifica en este laboratorio. Creen dos usuarios de prueba (el front de este laboratorio no tiene registro):

```bash
curl -X POST http://localhost:8080/api/v1/auth/registro -H "Content-Type: application/json" \
  -d '{"nombre":"Carla Ruiz","correo":"carla@example.com","telefono":"3000000001","password":"ContrasenaDemo123!","rol":"CONTRATANTE"}'

curl -X POST http://localhost:8080/api/v1/auth/registro -H "Content-Type: application/json" \
  -d '{"nombre":"Pedro Gómez","correo":"pedro@example.com","telefono":"3000000002","password":"ContrasenaDemo123!","rol":"TRABAJADOR","oficioPrincipal":"Plomero","zona":"Chapinero"}'
```

**3. Creen el repositorio del front en GitHub.** Lo hace **un solo integrante**:

1. Creen un repositorio **nuevo** con un nombre que siga las reglas del curso (por ejemplo, `oficioya-front-<squad>`), **vacío**: sin README, sin `.gitignore` y sin licencia. Vite genera esos archivos y, si el repositorio ya los trae, el primer `push` choca con ellos.
2. Agreguen como colaboradores a los demás integrantes, al profesor y al monitor.

**4. Creen el proyecto con Vite y súbanlo** (el mismo integrante, **fuera** de la carpeta del back):

```bash
npm create vite@latest oficioya-front -- --template react
cd oficioya-front
npm install
npm install react-router-dom
npm run dev
```

Si el asistente hace preguntas, elijan **React** y **JavaScript**, y respondan **No** a "Install with npm and start now?" (lo hacen ustedes con los comandos siguientes). Abran `http://localhost:5173`: deben ver la página de bienvenida de Vite. Detengan el servidor (`Ctrl + C`) y suban el proyecto:

```bash
git init -b main
git add .
git commit -m "chore: crear proyecto React con Vite"
git remote add origin https://github.com/<organizacion>/<repositorio-front>.git
git push -u origin main

git checkout -b develop
git push -u origin develop
git checkout -b feature/front-setup
```

Los demás integrantes clonan el repositorio del front, se cambian a `develop` y ejecutan `npm install`.

**5. Conecten el front con el back** mediante el *proxy* de Vite. Así el navegador cree que front y API están en el mismo origen y no hay que configurar CORS en Spring:

```js
// vite.config.js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todo lo que empiece por /api se reenvía al backend de Spring Boot
      '/api': 'http://localhost:8080',
    },
  },
})
```

**6. Limpien la plantilla y creen la estructura de la sección 5:** borren `src/App.css` y las imágenes de ejemplo de `src/assets/` que no usen, creen las carpetas de `src/modules/` y reemplacen el `README.md` que generó Vite por uno propio del front.

> `node_modules/` y `dist/` ya vienen en el `.gitignore` que genera Vite: nunca se suben al repositorio.

### Bloque 1 · Base común: `core` y `auth` (`feature/front-setup`) · Todos

Este bloque se hace **entre todos, en un solo computador**, porque es la base de los demás. Lean cada archivo y relaciónenlo con la presentación.

#### 1.1 `core/lib/httpClient.js`: la única puerta hacia la API

```js
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
    // El backend responde errores con el formato ApiError: { status, error, mensaje, ruta }
    const apiError = await respuesta.json().catch(() => ({}));
    const error = new Error(apiError.mensaje ?? `Error ${respuesta.status}`);
    error.status = respuesta.status;
    throw error;
  }

  return respuesta.status === 204 ? null : respuesta.json();
}
```

#### 1.2 `core/design-system/`: un botón reutilizable con CSS Modules

```css
/* Boton.module.css */
.boton {
  background: #0b8a5f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}

.boton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.secundario {
  background: #e5e7eb;
  color: #111827;
}
```

```jsx
// Boton.jsx
import styles from './Boton.module.css';

function Boton({ children, variante = 'primario', ...props }) {
  const clases = variante === 'secundario' ? `${styles.boton} ${styles.secundario}` : styles.boton;
  return (
    <button className={clases} {...props}>
      {children}
    </button>
  );
}

export default Boton;
```

`...props` pasa al `<button>` cualquier otra prop que reciba, como `onClick`, `type` o `disabled`.

```jsx
// core/components/MensajeError.jsx
function MensajeError({ error }) {
  if (!error) {
    return null;
  }
  return <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>;
}

export default MensajeError;
```

#### 1.3 `auth/`: la sesión con `useContext`

```js
// auth/services/authService.js
import { request } from '../../core/lib/httpClient';

export function login(correo, password) {
  return request('/auth/login', { method: 'POST', body: { correo, password } });
}

export function obtenerMiPerfil(token) {
  return request('/usuarios/me', { token });
}
```

```js
// auth/states/AuthContext.js
import { createContext } from 'react';

export const AuthContext = createContext(null);
```

```jsx
// auth/states/AuthProvider.jsx
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
```

```js
// auth/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../states/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}
```

El rol del usuario se obtiene de `GET /usuarios/me` y no decodificando el token. Recuerden que el payload del JWT es legible por cualquiera, pero quien decide qué puede hacer cada rol es el backend.

```jsx
// auth/components/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Boton from '../../core/design-system/Boton';
import MensajeError from '../../core/components/MensajeError';

function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function manejarEnvio(evento) {
    evento.preventDefault();          // evita que el navegador recargue la página
    setError(null);
    setCargando(true);
    try {
      await login(correo, password);
      navigate('/trabajadores');
    } catch (e) {
      setError(e.message);            // el mismo mensaje genérico que envía el backend
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
```

#### 1.4 Navegación y rutas protegidas

```jsx
// core/components/Navbar.jsx
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
```

```jsx
// core/components/RutaProtegida.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import Navbar from './Navbar';

// Si no hay sesión, redirige al login. Ojo: esto solo mejora la experiencia;
// la seguridad real la sigue aplicando el backend en cada petición.
function RutaProtegida() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}

export default RutaProtegida;
```

`<Outlet />` es el lugar donde React Router pinta la pantalla de la ruta hija que esté activa.

```jsx
// App.jsx (versión inicial: las pantallas de los módulos son textos temporales)
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './modules/auth/states/AuthProvider';
import LoginPage from './modules/auth/components/LoginPage';
import RutaProtegida from './modules/core/components/RutaProtegida';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RutaProtegida />}>
            <Route path="/trabajadores" element={<p>Bloque 2: lista de trabajadores</p>} />
            <Route path="/trabajadores/:id" element={<p>Bloque 3: perfil del trabajador</p>} />
            <Route path="/solicitudes" element={<p>Bloque 4: mis solicitudes</p>} />
          </Route>
          <Route path="*" element={<Navigate to="/trabajadores" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

Reemplacen el contenido de `src/index.css` por unos estilos base:

```css
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #111827;
  background: #ffffff;
}

input,
textarea {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  box-sizing: border-box;
}
```

**Verificación antes de seguir:**

- [ ] Con Carla o Pedro, el login lleva a `/trabajadores` y la barra muestra el nombre y el rol.
- [ ] Con una contraseña errónea aparece el mensaje del backend.
- [ ] Al entrar a `/solicitudes` sin sesión, la app redirige a `/login`.
- [ ] "Cerrar sesión" vuelve al login.

Hagan el PR de `feature/front-setup` a `develop` y mézclenlo: desde aquí cada uno trabaja en su rama.

### Bloque 2 · Lista de trabajadores (`feature/front-trabajadores`) · Integrante A

Este bloque es el **ejemplo completo** del patrón *service → hook → componente*. Los demás bloques siguen la misma receta.

```js
// trabajadores/services/trabajadoresService.js
import { request } from '../../core/lib/httpClient';

export function listarTrabajadores(token) {
  return request('/trabajadores', { token });
}

export function obtenerTrabajador(id, token) {
  return request(`/trabajadores/${id}`, { token });
}
```

```js
// trabajadores/hooks/useTrabajadores.js
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { listarTrabajadores } from '../services/trabajadoresService';

export function useTrabajadores() {
  const { token, logout } = useAuth();
  const [trabajadores, setTrabajadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarTrabajadores(token)
      .then((datos) => setTrabajadores(datos))
      .catch((e) => {
        if (e.status === 401) {
          logout();                   // token vencido: volver al login
        } else {
          setError(e.message);
        }
      })
      .finally(() => setCargando(false));
  }, [token, logout]);

  return { trabajadores, cargando, error };
}
```

```jsx
// trabajadores/components/TrabajadorCard.jsx
import { Link } from 'react-router-dom';

function TrabajadorCard({ trabajador }) {
  return (
    <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <h3>{trabajador.nombre}</h3>
      <p>{trabajador.oficioPrincipal ?? 'Oficio sin definir'} · {trabajador.zona ?? 'Zona sin definir'}</p>
      <Link to={`/trabajadores/${trabajador.id}`}>Ver perfil</Link>
    </article>
  );
}

export default TrabajadorCard;
```

```jsx
// trabajadores/components/TrabajadoresPage.jsx
import { useTrabajadores } from '../hooks/useTrabajadores';
import TrabajadorCard from './TrabajadorCard';
import MensajeError from '../../core/components/MensajeError';

function TrabajadoresPage() {
  const { trabajadores, cargando, error } = useTrabajadores();

  if (cargando) {
    return <p>Cargando trabajadores...</p>;
  }

  return (
    <section>
      <h2>Trabajadores</h2>
      <MensajeError error={error} />
      {trabajadores.length === 0 && !error && <p>Aún no hay trabajadores registrados.</p>}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {trabajadores.map((t) => (
          <TrabajadorCard key={t.id} trabajador={t} />
        ))}
      </div>
    </section>
  );
}

export default TrabajadoresPage;
```

En `App.jsx`, reemplacen el texto temporal de `/trabajadores` por `<TrabajadoresPage />`.

**Para explicar en el PR:** ¿por qué `useEffect` lleva `[token, logout]` al final? ¿Qué pasaría sin el arreglo? ¿Para qué sirve `key={t.id}`?

### Bloque 3 · Perfil de un trabajador (`feature/front-perfil`) · Integrante B

Construyan `trabajadores/components/TrabajadorDetallePage.jsx` para la ruta `/trabajadores/:id`:

1. Lean el `id` de la URL con `useParams()`.
2. Pidan el perfil con `obtenerTrabajador(id, token)` (ya está en el service del bloque 2) dentro de un `useEffect`.
3. Muestren nombre, oficio y zona. Si la API responde `404`, muestren "El trabajador no existe".
4. **Solo si el usuario es `CONTRATANTE`**, muestren debajo el formulario del bloque 5 (`<NuevaSolicitudForm trabajadorId={...} />`). Mientras D lo termina, usen un texto temporal.

```jsx
// Esqueleto: completen los TODO
function TrabajadorDetallePage() {
  const { id } = useParams();
  const { token, usuario } = useAuth();
  const [trabajador, setTrabajador] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: llamar a obtenerTrabajador(id, token), guardar el resultado
    //       y, si e.status === 404, guardar el mensaje 'El trabajador no existe'
  }, [id, token]);

  // TODO: si hay error, devolver <MensajeError error={error} />
  // TODO: si trabajador todavía es null, devolver <p>Cargando perfil...</p>

  return (
    <section>
      <h2>{trabajador.nombre}</h2>
      {/* TODO: oficio y zona */}
      {usuario.rol === 'CONTRATANTE' && <p>Aquí irá el formulario del bloque 5</p>}
    </section>
  );
}
```

*Pista:* `{condicion && <Componente />}` es la forma corta de "muestra esto solo si se cumple la condición".

### Bloque 4 · Mis solicitudes (`feature/front-solicitudes`) · Integrante C

1. Creen `solicitudes/services/solicitudesService.js` con las tres funciones de abajo (la de crear la usa D y la de cambiar estado la usa E).
2. Creen el hook `useSolicitudes()` siguiendo el modelo de `useTrabajadores()`: devuelve `{ solicitudes, error }` y, si llega un `401`, cierra la sesión.
3. Creen `SolicitudesPage.jsx`: título "Mis solicitudes", el error si lo hay, "No tienes solicitudes" si la lista está vacía y una lista `<ul>` con un `<SolicitudItem>` por solicitud (número, descripción y estado).

```js
// solicitudes/services/solicitudesService.js
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
```

*Pista:* el backend ya filtra por propietario. Si Carla ve solicitudes de otra persona, el error está en la API del laboratorio anterior, no en el front.

### Bloque 5 · Nueva solicitud (`feature/front-nueva-solicitud`) · Integrante D

Construyan `solicitudes/components/NuevaSolicitudForm.jsx`, que recibe la prop `trabajadorId`:

1. Un `<textarea>` controlado con `useState` para la descripción (como los campos de `LoginPage`).
2. Al enviar, llamen a `crearSolicitud({ trabajadorId, descripcion }, token)`.
3. Si sale bien, naveguen a `/solicitudes` con `useNavigate()`; si falla, muestren el mensaje con `MensajeError`.

```jsx
// Fragmento clave del envío
async function manejarEnvio(evento) {
  evento.preventDefault();
  setError(null);
  try {
    // El contratante NO se envía: el backend lo toma del token
    await crearSolicitud({ trabajadorId, descripcion }, token);
    navigate('/solicitudes');
  } catch (e) {
    setError(e.message);
  }
}
```

**Para comprobar la seguridad del backend:** cambien temporalmente la condición del bloque 3 para que el formulario también se vea con Pedro (`TRABAJADOR`) e intenten enviar. Deben ver el mensaje del `403`. Después reviertan el cambio.

### Bloque 6 · Acciones sobre una solicitud (`feature/front-acciones`) · Integrante E (o C en squads de 4)

En `SolicitudItem.jsx` agreguen los botones según el rol y el estado:

| Rol | Estado de la solicitud | Botones |
| --- | --- | --- |
| `TRABAJADOR` | `PENDIENTE` | Aceptar y Rechazar |
| `CONTRATANTE` | `PENDIENTE` o `ACEPTADA` | Cancelar |

1. `SolicitudItem` recibe las props `solicitud`, `rol` y `onAccion` (una **función**).
2. Cada botón llama a `onAccion(solicitud.id, 'aceptar')` (o `'rechazar'`, `'cancelar'`).
3. En `useSolicitudes()` agreguen `ejecutarAccion(id, accion)`, que llama a `cambiarEstado(...)` y vuelve a cargar la lista. Si falla (por ejemplo, un `409`), guarda el mensaje en `error`.

```jsx
// Fragmento de SolicitudItem.jsx
{rol === 'TRABAJADOR' && pendiente && (
  <>
    <Boton onClick={() => onAccion(solicitud.id, 'aceptar')}>Aceptar</Boton>
    <Boton variante="secundario" onClick={() => onAccion(solicitud.id, 'rechazar')}>Rechazar</Boton>
  </>
)}
```

*Pista:* ocultar un botón **no** es seguridad. Si alguien llama al endpoint con Postman, el backend debe responder `403` o `404` igual que en el laboratorio anterior.

## 7. Integración (fase 3)

1. Revisen y mezclen los PR en `develop`, uno a la vez. Después de cada mezcla, ejecuten `npm run build`.
2. En `App.jsx`, reemplacen los textos temporales por los componentes reales:

```jsx
<Route element={<RutaProtegida />}>
  <Route path="/trabajadores" element={<TrabajadoresPage />} />
  <Route path="/trabajadores/:id" element={<TrabajadorDetallePage />} />
  <Route path="/solicitudes" element={<SolicitudesPage />} />
</Route>
```

3. Ejecuten `npm run lint` y corrijan las advertencias.

## 8. Recorrido completo

Con el backend y el front corriendo, hagan este recorrido y tomen capturas para `docs/evidencias/`:

| # | Paso | Resultado esperado |
| --- | --- | --- |
| 1 | Entrar a `/solicitudes` sin iniciar sesión | Redirige a `/login` |
| 2 | Login de Carla con una contraseña errónea | Mensaje de error del backend |
| 3 | Login de Carla | Lista de trabajadores con Pedro |
| 4 | Abrir el perfil de Pedro y enviar una solicitud | Aparece en "Mis solicitudes" como `PENDIENTE` |
| 5 | Cerrar sesión y entrar como Pedro | Ve la solicitud con los botones Aceptar y Rechazar; no ve el formulario de nueva solicitud en los perfiles |
| 6 | Pedro acepta la solicitud | Cambia a `ACEPTADA` |
| 7 | Entrar como Carla y cancelarla | Cambia a `CANCELADA` |
| 8 | Recargar la página (F5) | Vuelve al login: el token vivía en memoria |
| 9 | En las herramientas del navegador (F12 → Red), revisar una petición a `/api/v1/solicitudes` | Lleva el encabezado `Authorization: Bearer ...` |

## 9. Entregables

En el **repositorio del front**, PR de `develop` a `main`:

- El proyecto de React en la raíz del repositorio.
- Capturas del recorrido de la sección 8 en `docs/evidencias/`.
- Un `README.md` propio del front con:
  1. Cómo ejecutarlo (`npm install` y `npm run dev`) y qué necesita: el back corriendo en el puerto 8080, con el **enlace al repositorio del back**.
  2. El árbol de carpetas de `src/modules/` y una frase sobre qué contiene cada módulo.
  3. Respuestas breves:
     - ¿Qué diferencia hay entre una prop y un estado (`useState`)?
     - ¿Por qué la carga de datos va dentro de `useEffect` y no directamente en el cuerpo del componente?
     - ¿Para qué usaron `useContext` y qué pasaría si no lo usaran?
     - ¿Por qué ocultar el botón "Aceptar" a un contratante no es suficiente para proteger la API?
     - ¿Qué ventajas tiene tener el front y el back en repositorios separados?

Además, en el `README` del **repositorio del back** agreguen un enlace al repositorio del front. Es el único cambio permitido en el repositorio del back.

## 10. Buenas prácticas de Git

- Todo el trabajo se hace en el **repositorio del front**, con ramas `feature/front-...` creadas desde `develop`.
- `package-lock.json` sí se sube al repositorio: fija las versiones exactas de las dependencias para todo el squad.
- Commits con el formato `tipo: descripción` (`feat`, `fix`, `style`, `docs`, `chore`).
- Cada PR lo revisa un integrante distinto de su autor.
- **Todos los integrantes deben tener al menos un commit y haber revisado un PR.**

## 11. Evaluación

| Componente | Peso |
| --- | ---: |
| Proyecto con Vite y estructura de nivel 3 | 15 % |
| Login, sesión con contexto y rutas protegidas (bloque 1) | 20 % |
| Trabajadores: lista y perfil (bloques 2 y 3) | 20 % |
| Solicitudes: lista, creación y acciones según el rol (bloques 4 a 6) | 25 % |
| Recorrido completo con evidencias (sección 8) | 10 % |
| README, respuestas y proceso de Git | 10 % |
| **Total** | **100 %** |

### Definition of Done

- [ ] `npm run dev` y `npm run build` funcionan sin errores.
- [ ] El código sigue la estructura de nivel 3 de la sección 5.
- [ ] Ningún componente llama a `fetch` directamente: todo pasa por un service.
- [ ] Sin sesión no se puede ver ninguna pantalla distinta al login.
- [ ] Las pantallas muestran estados de carga y los mensajes de error de la API.
- [ ] La interfaz cambia según el rol (`CONTRATANTE` o `TRABAJADOR`).
- [ ] El recorrido de la sección 8 está documentado con capturas.

## 12. Referencias

- Presentación del curso: *CI/CD, DevOps y Front End con React* (semana 11).
- [React · Aprende React](https://es.react.dev/learn)
- [React · `useState`](https://es.react.dev/reference/react/useState), [`useEffect`](https://es.react.dev/reference/react/useEffect) y [`useContext`](https://es.react.dev/reference/react/useContext)
- [Vite · Primeros pasos](https://vite.dev/guide/)
- [Vite · Proxy del servidor de desarrollo](https://vite.dev/config/server-options#server-proxy)
- [React Router](https://reactrouter.com/)
- [Laboratorio de Seguridad de OficioYa](https://github.com/DOSW-2026-2/security)
