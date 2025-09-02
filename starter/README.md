# Estructura del Proyecto Frontend CENEPRED

## Descripción General

Proyecto frontend CENEPRED desarrollado con React, TypeScript y Vite.

## Tecnologías Principales

Se quito el caret (^) para evirtar la actualzacion de las librerias y evitar conflicto de versiones.

- React 19.0.0
- TypeScript 5.7.2
- Vite 5.4.8
- Tailwind CSS 4.0.2
- Zustand 5.0.2

## Estructura de Directorios

```
├── src/                      # Código fuente principal
│   ├── @types/              # Definiciones de tipos TypeScript
│   ├── assets/              # Estilos de css, mapas, imagenes
│   ├── auth/                # Autenticación y manejo de sesión
│   ├── components/          # Componentes reutilizables
│   │   ├── layouts/        # Layouts principales
│   │   ├── route/          # Componentes relacionados con rutas
│   │   ├── shared/         # Componentes compartidos
│   │   ├── template/       # Plantillas
│   │   └── ui/            # Componentes de interfaz de usuario
│   ├── configs/            # Configuraciones de la aplicación
│   ├── constants/          # Constantes y enumeraciones
│   ├── locales/           # Archivos de internacionalización
│   ├── mock/              # Datos simulados para desarrollo
│   ├── services/          # Servicios y llamadas API
|   |   ├── custom          # Se crea los request al backend
│   ├── store/             # Estado global (Zustand)
│   ├── utils/             # Utilidades y helpers
│   └── views/             # Vistas/páginas de la aplicación
|       └── auth           # Vista de autenticación
|       └── modulos        # Modulos de sistema
├── public/                # Archivos públicos estáticos
│   ├── img/              # Imágenes
│   └── favicon.ico       # Ícono del sitio
```
