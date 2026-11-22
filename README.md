# ClinSim UCSUR - Sistema de Control de Asistencias y Gestión Operativa

Sistema integral de registro, control de asistencia en tiempo real, geolocalización perimétrica y gestión de cronogramas rotativos para los Centros de Simulación Clínica de la Universidad Científica del Sur (**UCSUR**).

---

## 🌟 Características Principales

### 1. Marcación de Asistencias Inteligente (Entrada y Salida)
- **Roles Soportados:** Técnicos de Simulación, Docentes, Pacientes Simulados, Coordinadores de Pacientes Simulados y Administradores.
- **Marcación Automática solo con DNI:** Al digitar el DNI se identifica a la persona y se registra la marcación de forma instantánea (precarga en memoria y marcación optimista).
- **Consulta en Vivo de la Programación Diaria:** Al digitar el DNI se consulta en tiempo real el Excel / API de programación del día para mostrar ambiente, curso, sede y hora actual.
- **Marcación por Módulo:** Registro de ingreso/salida por módulo de clase, con filtro inteligente que distingue pacientes de corrido vs. docentes por módulo.
- **Geocercas Perimétricas por Sede:** Validación de coordenadas GPS para asegurar que las marcaciones se realicen únicamente dentro del perímetro autorizado de cada sede (Sede Villa, Aramburú, Ate y Los Olivos).
- **Control de Turnos y Franjas Horarias:**
  - Mañana: 06:00 - 15:00
  - Tarde: 13:00 - 22:00
  - Intermedio Lunes a Viernes: 09:00 - 18:00
  - Intermedio Sábados: 08:00 - 17:00
  - Intermedio Domingos: 10:00 - 19:00
  - Bloqueo de marcaciones anticipadas fuera de la ventana de tolerancia permitida.
- **Detección Automática de Estado:** Alternancia inteligente entre `ENTRADA` y `SALIDA` según el estado del día.
- **Soporte Offline PWA:** Registro en almacenamiento local ante caídas de red y sincronización automática cuando vuelve el internet.

### 2. Modo Híbrido: Estación Fija (Kiosco) + Móvil
- **Estación Fija (PC autorizada):** Marcación sin GPS desde PCs autorizadas de cada sede, verificadas mediante código de campus de un solo uso preconfigurado.
- **Código Maestro de Kiosco:** Código maestro permanente y silencioso para habilitar estaciones oficiales.
- **Acceso restringido:** La Estación Fija solo puede activarla el Super Admin o administradores con permiso explícito `kiosk`.
- **Móvil con Geocerca:** Desde el celular se valida el perímetro GPS de la sede y se recuerda el DNI.
- **Vinculación 1 a 1 Dispositivo ↔ DNI:** Cada celular queda vinculado a un único DNI, con reconocimiento del dispositivo entre distintos navegadores para evitar marcaciones suplantadas.

### 3. Notificaciones y Alertas (PWA)
- **Web Push real (VAPID):** Notificaciones nativas incluso con la app cerrada o la pantalla bloqueada, mediante Service Worker.
- **Avisos de Fin de Clase y Rotación:** Alertas móviles al finalizar un módulo o cuando corresponde rotar de ambiente.

### 4. Cronograma de Técnicos
- **Gestión Visual de Cronogramas:** Calendario interactivo mensual con asignación por técnico, sede y turno, con navegación y sincronización automática de mes.
- **Popup de Celda Rediseñado:** Selector de sede desplegable y turnos básicos.
- **Edición Manual y Reasignación Rápida:** Asignación individual o masiva de turnos y sedes con control de excepciones.
- **Visualizador de Horas Extras:** Vista interactiva de horas extras por técnico.

### 5. Horarios del Día y Regularización
- **Visor Admin de Horarios del Día:** Consulta de la programación diaria desde el dashboard.
- **Regularización Manual de Salida:** Los administradores pueden registrar manualmente la salida de pacientes y colaboradores desde Horarios del Día, Resumen y Reportes.
- **Resumen Diario:** La pestaña Resumen muestra únicamente las marcaciones del día.

### 6. Reglas de Tolerancia, Horas Extras y Comisiones
- Configuración de minutos de tolerancia para marcaciones a tiempo (`A TIEMPO`), tardanzas (`TARDANZA`) y faltas automáticas.
- Creación y edición de reglas específicas para cada turno y rol.
- **Control de Horas Extras:** Umbral mínimo de 1 hora, configuración dinámica y métricas en reportes.
- **Comisiones y Eventos Especiales:** Soporte de token `EV` (evento) sin marcación obligatoria.

### 7. Gestión de Usuarios y Doble Rol (Operativo + Admin)
- Registro y actualización de Docentes, Pacientes Simulados y Técnicos.
- **Promoción a Administrador:** Personal operativo puede ser promovido a Administrador sin perder su historial de marcaciones ni su capacidad de registrar asistencia.
- **Coordinador de Pacientes Simulados:** Rol con alcance automático restringido a `PACIENTE_SIMULADO`.
- **Importación Masiva Excel / CSV:** Detección de duplicados, asignación masiva de sede y previsualización de datos antes de confirmar.

### 8. Seguridad, Permisos y Auditoría
- **Contraseña Temporal / Primer Inicio:** Cambio obligatorio de contraseña en el primer inicio de sesión mediante ventana modal bloqueante.
- **Jerarquía de Administradores en 3 niveles:** Super Admin, Admin General Multisede y Admin por Sede, con control granular de módulos (Overview, Analítica, Reportes, Reglas, Usuarios, Catálogos, Admins).
- **Alcance de sede separado:** Diferenciación entre alcance operativo y alcance administrativo por sede.
- **Módulo de Logs de Auditoría:** Registro de acciones administrativas (la cuenta técnica `admin.clinsim` está exenta).

### 9. Reportes y Analítica
- Visualización de métricas en tiempo real, gráficos de puntualidad y distribución de asistencia por sede.
- Exportación directa de reportes consolidados en formatos **Excel (.xlsx)** y **PDF** (carga dinámica de librerías para un bundle más liviano).
- **Centro de Manuales PDF** dentro del Dashboard.

### 10. Rendimiento
- Caché SWR, caché en memoria de sedes y procesamiento concurrente de lotes.
- Motor de búsqueda de nombres O(N) y carga optimizada de DNI en PCs.
- Queries condicionales en el dashboard y eliminación de dependencias sin uso.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) con React 19 y Turbopack.
- **Lenguaje:** TypeScript.
- **Estilos:** Tailwind CSS 4 y diseño adaptable para móviles, estaciones fijas y escritorio.
- **Base de Datos & ORM:** PostgreSQL (Neon Serverless) con [Prisma ORM](https://www.prisma.io/).
- **Notificaciones:** Service Worker + `web-push` (VAPID).
- **Generación de Reportes:** jsPDF, jsPDF-AutoTable y SheetJS (xlsx).
- **Gráficos:** Recharts.

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
- Node.js 20+ instalado
- Gestor de paquetes `npm`

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Jeanpieer-1510/registro_final.git
   cd registro_final
   ```

2. Instalar dependencias (genera automáticamente el cliente de Prisma):
   ```bash
   npm install
   ```

3. Configurar variables de entorno en `.env`:
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@servidor/bd?sslmode=require"
   ```

4. Sincronizar el esquema de base de datos (si es necesario):
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

6. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Scripts disponibles
| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linter (ESLint) |
| `npm test` | Pruebas de funcionalidades (`scripts/test-all-features.ts`) |

---

## 📖 Manuales de Usuario

Los manuales en PDF por rol están disponibles en `docs/manuales/` y en el Centro de Manuales del Dashboard:
- `1_Manual_Usuario_Final_Marcacion_Asistencia.pdf`
- `2_Manual_Super_Admin_Acceso_Total.pdf`
- `3_Manual_Admin_General_Multisede.pdf`
- `4_Manual_Admin_Por_Sede.pdf`
- `5_Manual_Coordinador_Pacientes_Simulados.pdf`
