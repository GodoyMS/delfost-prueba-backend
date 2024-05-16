# Descripción técnica

## 1. Backend
- **Ambiente Ejecución**: NodeJS
- **Base de datos**: MongoDB
- **ODM**: Mongoose
- **Lenguaje**: Typescript
- **Runtime Engine**:Node v20.11.0
- **Package Manager**:Yarn v1.22.21

### Setup Instructions
1. Clonar el repositorio `git clone https://github.com/GodoyMS/delfost-prueba-backend`
2. Navegar al directorio de server `cd server`.
3. Instalar dependencias `yarn install`.
4. Crear un archivo `.env` y configurar variables de entorno segun el archivo `.env.example` .
5. Levantar el servidor con `yarn run dev`.

### Database Setup
- Instalar MongoDB localmente o configurar una instalcia remota de MongoDB.
- Actualizar el archivo `.env` con el valor de cadena de la conexión de MongoDB  `Ej: mongodb://127.0.0.1:27017/challengue-delfosti`


## 2. FrontEnd
- **Framework**: NextJS
- **Herramientas**: TailwindCSS y Axios
- **Lenguaje**: Typescript
- **Runtime Engine**:Node v20.11.0
- **Package Manager**:Yarn v1.22.21

### Setup Instructions
1. Navegar al directorio de cliente `cd client`.
2. Instalar dependencias `yarn install`.
3. Crear un archivo `.env` y configurar variables de entorno segun el archivo `.env.example`
4. Levantar el servidor con `yarn run dev`.

### Test Instructions
1. Instalar la extensión `REST Client` en Visual Studio Code.
2. Abrir el archivo `auth.http` en la carpeta `endpoints`
3. Configurar la varialbe `@baseUrl` con correctamente de acuerdo url del servidor levantado
4. Para hacer test de cada endpoint, completar el body en caso de peticiones `POST` con datos reales
5. Apretar el botón `send request` en cada petición


## 2. FrontEnd
- **Framework**: NextJS
- **Herramientas**: TailwindCSS y Axios
- **Lenguaje**: Typescript
- **Runtime Engine**:Node v20.11.0
- **Package Manager**:Yarn v1.22.21

### Setup Instructions
1. Navegar al directorio de cliente `cd client`.
2. Instalar dependencias `yarn install`.
3. Crear un archivo `.env` y configurar variables de entorno segun el archivo `.env.example`
4. Levantar el servidor con `yarn run dev`.



## 3. Login
- **Email Demo**: `demo1@gmail.com`
- **Password Demo**: `demo123`


## 4. Depliegue
- **Frontend**:https://delfosti-challengue-client.godoyperu.com
- **Server**: https://delfosti-challengue-server.godoyperu.com










