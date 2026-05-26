# LaborApps API 🚀
### Sistema Modular de Conexión Laboral — Grupo: Freelancers 💻

**LaborApps** es una plataforma backend modular desarrollada con **NestJS** y **PostgreSQL** diseñada para el contexto de Zelaya Central y Nueva Guinea. Permite conectar de manera ágil a empleadores locales con trabajadores independientes (Workers), facilitando la publicación de vacantes, mensajería interna, control de sectores económicos y un sistema de reputación por calificaciones.

---

## 🛠️ Stack Tecnológico

* **Framework Base:** NestJS (v11) con TypeScript
* **Base de Datos:** PostgreSQL
* **ORM de Persistencia:** TypeORM (Mapeo relacional estructurado)
* **Validación de Datos:** Class-Validator & Class-Transformer (Global Pipes activados)
* **Documentación Dinámica:** Swagger UI

---

## 📂 Estructura y Arquitectura del Sistema

El núcleo de la aplicación se encuentra bajo un enfoque de **Arquitectura Modular** limpio y desacoplado dentro de `src/modules/`:

* 🔐 `src/auth/` - Gestión de registros seguros e inicios de sesión implementando cifrado criptográfico SHA-256 y simulación JWT Guard.
* 👥 `modules/users/` - Perfiles de usuarios con geolocalización por departamento y municipio.
* 💼 `modules/jobs/` - Gestión de ofertas de empleo (`Open`, `Closed`, `In_Progress`) con soporte de filtrado geográfico avanzado (`QueryBuilder`).
* 🏢 `modules/businesses/` - Registro de empresas o comercios vinculados a los empleadores.
* 💬 `modules/messages/` - Historial de chat interno entre candidatos y ofertantes con enlaces directos a WhatsApp.
* ⭐️ `modules/ratings/` - Control de reputación post-empleo mediante puntuaciones y reseñas (Reviewer-Reviewee).
* 🔔 `modules/notifications/` - Alertas del sistema y logs de lectura para los usuarios.
* 🌐 `modules/sector/` - Clasificación de rubros económicos y comerciales con borrado lógico (`status: false`).

---

## ⚙️ Configuración del Entorno (.env)

Copia el archivo `.env.template` como `.env` en la raíz del proyecto y configura las credenciales de tu base de datos PostgreSQL local:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_NAME=laborapp_db