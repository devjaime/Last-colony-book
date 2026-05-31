# Last Colony Book

Experiencia web inmersiva para **The Last Colony / Los grises no son OVNIs**, una novela de ciencia ficción especulativa escrita por **Jaime Hernandez**.

La premisa: los “grises” no vienen del cielo. Son una inteligencia eusocial terrestre que sobrevivió al impacto de Chicxulub refugiándose bajo la Tierra, evolucionó como colonia distribuida y llega hasta la actualidad observando a la humanidad.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Howler.js
- Zustand

## Desarrollo Local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run assets
```

## Deploy en Vercel

El proyecto está listo para importarse en Vercel como aplicación Next.js.

- Root Directory: `./`
- Framework Preset: `Next.js`
- Build command: `npm run build`
- Output: automático por Next.js
- Install command: `npm ci`

No requiere variables de entorno para el MVP.

Si Vercel muestra `404: NOT_FOUND` al abrir la URL, revisar primero que el deployment exista y haya terminado en estado `Ready`. En el import del repositorio debe usarse la rama `main` y la raíz del proyecto, no la carpeta `src`.
