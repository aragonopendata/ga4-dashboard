# GA4 Dashboard

Dashboard para visualizar métricas de Google Analytics 4 del portal de datos abiertos de Aragón.

## Descripción

Aplicación Angular 16 que embebe dashboards de Kibana para mostrar análisis de datos con capacidad de filtrado por portal y rango de fechas.

## Desarrollo Local

### Requisitos
- Node.js
- Angular CLI

### Instalación y Ejecución
```bash
npm install
ng serve --configuration development
```

**Importante**: Para desarrollo local, usar siempre la configuración `development` que apunta a los endpoints de `desopendata.aragon.es`.

## Despliegue con Docker

La aplicación se despliega usando Docker Compose. El entorno se configura mediante variables de entorno en un archivo `.env`.

```bash
docker-compose up -d
```

### Configuración de Entorno
Copiar el archivo template y configurar las variables necesarias:
```bash
cp .env.template .env
```

Editar el archivo `.env` con las variables necesarias:

- **BUILD_CONFIGURATION**: Selecciona el entorno de construcción
  - `development` - Entorno de desarrollo
  - `preproduction` - Entorno de preproducción
  - `production` - Entorno de producción
- **BASE_HREF**: Ruta donde se desplegará la aplicación (ej: `/servicios/dashboardanalytics/`)


## Arquitectura

- **SPA sin routing** - Vista principal con filtros dropdown
- **Componente principal**: `DropdownComponent` - Maneja filtros y construcción de URLs
- **Pipe personalizado**: `SafePipe` - Sanitiza URLs para embedding de iframes
- **Configuración por entornos** - URLs y endpoints específicos por ambiente