# 💼 LaborApps - Backend API

Backend desarrollado con **NestJS** y **PostgreSQL** para la plataforma LaborApps, diseñada para conectar de manera eficiente a empleadores con trabajadores locales independientes en Nicaragua.

---

## 🛠️ Tecnologías Utilizadas
* **Framework:** NestJS
* **Lenguaje:** TypeScript
* **Base de Datos:** PostgreSQL
* **ORM:** TypeORM (Mapeo relacional automático)
* **Seguridad:** JWT (Json Web Tokens) & Control de Acceso por Roles (RBAC)

---

## 📂 Estructura Modular del Proyecto
El sistema implementa una estricta separación de responsabilidades dividida en módulos independientes:


```text
src/
└── modules/
    ├── auth/         # Autenticación, JWT y Estrategias
    ├── users/        # Gestión de cuentas generales
    ├── profiles/     # Perfiles públicos de trabajadores independientes
    ├── jobs/         # Ofertas de trabajo (Permanentes y Oficios Diarios)
    └── ratings/      # Sistema de calificaciones (Escala 1 a 5)
```


🚀 Guía Rápida de Instalación
Siga estos 5 pasos para levantar el proyecto en su entorno local:
1. Clonar el repositorio
Descargue el código fuente y acceda a la carpeta del proyecto:
git clone https://github.com/BryanStiven01/LaborApp.git)
cd LaborApp


3. Instalar dependencias
Instale los módulos de Node.js necesarios para ejecutar la API:

-npm install


3. Configurar variables de entorno
En la raíz del proyecto, busque el archivo .env.template.
Saque una copia de ese archivo y renómbrela exactamente como .env.
Abra el archivo .env y coloque sus credenciales locales de PostgreSQL:


PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=Tu_Contraseña_De_Postgres
DB_NAME=laborapps_db
JWT_SECRET=ClaveSecretaSuperSegura123


5. Inicializar la Base de Datos
Abra DBeaver o su gestor de confianza.
Cree una base de datos vacía llamada exactamente igual a la de su archivo .env (laborapps_db).
Nota: No necesita crear tablas manualmente; TypeORM estructurará automáticamente las entidades, llaves foráneas y relaciones al iniciar el servidor.


7. Levantar el Servidor
Inicie la API en modo de desarrollo:


5. Levantar el Servidor
 
6.  Inicie la API en modo de desarrollo

npm run start:dev


La API estará escuchando peticiones en: http://localhost:3000
