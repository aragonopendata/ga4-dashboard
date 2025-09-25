# GA4 Dashboard

Dashboard para visualizar métricas de Google Analytics 4 del portal de datos abiertos de Aragón.

## Descripción

Aplicación Angular 19 que embebe dashboards de Kibana para mostrar análisis de datos con capacidad de filtrado por portal y rango de fechas.

## Desarrollo Local

### Requisitos
- Node.js 20.19.2 o superior
- Angular CLI 19
- TypeScript 5.8.3

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
- **Angular 19** - Framework principal con Angular Material 18.2.14
- **Service Worker** - PWA con cache para mejor rendimiento

## Migración a Angular 19

### Cambios Principales (Septiembre 2025)

**Versiones Actualizadas:**
- Angular Core: 16.x → 19.2.15
- Angular CLI: 16.x → 19.2.17
- Angular Material: 17.x → 18.2.14
- TypeScript: 5.4.5 → 5.8.3
- Node.js (Docker): 18.16.0 → 20.19.2

**Cambios de Configuración:**
- Sintaxis de temas de Angular Material actualizada (`mat.m2-define-palette`)
- Declaraciones de componentes standalone corregidas (`standalone: false`)
- Dockerfile actualizado con Node.js 20 y Angular CLI 19
- Eliminado flag `--legacy-peer-deps`

**Compatibilidad:**
- ✅ Construcción de producción funcional
- ✅ Servidor de desarrollo operativo
- ✅ Service Worker generado correctamente
- ✅ Docker build compatible
- ✅ Funcionalidad completa preservada

### Docker

**Imagen Base:** `node:20.19.2-bookworm`
**Puertos:** Configurable via docker-compose (desarrollo: 4203:80)
**Variables de Entorno:** BUILD_CONFIGURATION, BASE_HREF