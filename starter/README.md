## Forma de iniciar el proyecto frontend - Plataforma Integradora (CENEPRED)

### 1. Instalar dependencias de npm

```bash
$ npm install
```

### 2. Copiar archivo de entorno

Ambiente de desarrollo

```bash
$ cp .env.dev .env
```
Ambiente de calidad

```bash
$ cp .env.qa .env
```

Ambiente de produccion

```bash
$ cp .env.prod .env
```

### 3. Levantar el servidor de desarrollo

```bash
$ npm run dev
```

si quieres definir un puerto 

```bash
$ npm run dev -- --port=3000
```

###4. Contruir para QA o Produccion

QA

```bash
NODE_ENV=qa npm run build
```

Produccion

```bash
npm run build
```