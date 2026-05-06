# Proyecto — Sitio web chwork (Lic. Lucas Contreras)

Sitio profesional para **Lic. Lucas Contreras**, Asesor en Seguridad e Higiene en CABA.
**Stack**: Astro + TypeScript.
**Marca de trabajo**: chwork (Contreras Higiene).
**Dominio acordado**: `chwork.com.ar` (con `lcwork.com.ar` y `lucascontreras.com.ar` como redirects defensivos).

## Documentos clave del proyecto

| Archivo | Contenido |
|---|---|
| `PRESUPUESTO-LUCAS.md` | Borrador original con dos planes |
| `presupuesto-lucas.html` / `.pdf` | Presupuesto final consolidado (USD 1.500, 1 año de soporte incluido) |
| `KICKOFF-LUCAS.md` | Checklist de información que el cliente tiene que entregar |
| `RELEVAMIENTO.md` | Relevamiento técnico inicial |
| `CONTEXT.md` | Contexto general |

> **Importante**: leer estos antes de tocar código si el contexto es nuevo.

---

## Estrategia multi-version (crítico)

El proyecto está armado para **explorar múltiples variantes de diseño en paralelo**, usando **Git worktrees**. Cada variante vive en su propio branch y en su propia carpeta de trabajo. El cliente verá las opciones y elegirá la final.

### Estructura de directorios

```
~/Projects/webs/
├── lucas-contreras-sh/     ← REPO RAÍZ (branch: main)
│   └── .git/               ← único repo, compartido entre worktrees
└── lucas-trees/
    ├── clasica/            ← branch: version/clasica
    └── industrial/         ← branch: version/industrial
    (sumar variantes según necesidad)
```

### Política de `main`

`main` es la **base neutra/compartida**. En `main` viven los cambios que aplican a TODAS las variantes:

- Nuevos componentes compartidos
- Fixes técnicos
- Cambios de SEO técnico / metadata / structured data
- Estructura general de páginas
- Datos en `src/data/site.ts`

**`main` no contiene "look & feel" de ninguna variante específica.**

Cuando se haga un cambio en `main`, propagarlo a cada variante con `git merge main` (desde el worktree de la variante).

### Política de branches `version/*`

Cada variante diverge solo en:

- Paleta de colores (CSS variables / tokens)
- Tipografía
- Tono y matices de copy
- Microinteracciones / animaciones
- Eventualmente: layouts si la diferencia es estructural

**Convención de naming**: `version/<nombre-corto-en-minúsculas>` (ej: `version/clasica`, `version/industrial`, `version/minimal`).

### Workflow diario

```bash
# Trabajar en una variante específica
cd ~/Projects/webs/lucas-trees/clasica
npm run dev -- --port 4321

# Levantar otra variante en paralelo (otra terminal)
cd ~/Projects/webs/lucas-trees/industrial
npm run dev -- --port 4322
```

**Puertos asignados**:
- 4321 → clasica
- 4322 → industrial
- 4323 → (siguiente variante)
- 4324 → (siguiente variante)

Commits normales dentro de cada worktree quedan en su branch correspondiente.

### Sumar una variante nueva

```bash
cd ~/Projects/webs/lucas-contreras-sh
git branch version/<nombre>
git worktree add ../lucas-trees/<nombre> version/<nombre>
cd ../lucas-trees/<nombre>
npm install
```

### Mergear la variante ganadora (cuando el cliente elija)

```bash
cd ~/Projects/webs/lucas-contreras-sh
git merge version/<elegida>

# Limpiar las descartadas
git worktree remove ../lucas-trees/<descartada>
git branch -D version/<descartada>
```

### Comandos útiles

```bash
git worktree list                              # ver todos los worktrees activos
git diff version/clasica version/industrial    # comparar variantes
git checkout version/clasica -- src/styles/    # traer archivos puntuales de otra branch
git log version/clasica --oneline              # historia de una variante
```

---

## Convenciones de código

- **Stack**: Astro + TypeScript
- **Componentes**: `src/components/`
- **Páginas**: `src/pages/`
- **Estilos globales**: `src/styles/global.css`
- **Datos del sitio (textos, servicios, contactos)**: `src/data/site.ts` — single source of truth para contenido
- **Variables de tema (colores, tipografía, espaciado)**: en CSS variables dentro de `global.css` para que cada variante pueda redefinirlas sin tocar componentes

### Reglas para mantener variantes "limpias"

1. **Componentes deben ser agnósticos al tema**: no hardcodear colores ni tipografías. Siempre usar CSS variables.
2. **Cambios estructurales (componentes nuevos, páginas, datos) van a `main`**, después se propaga a las variantes.
3. **Cambios visuales (paleta, tipografía, spacing tokens) van directo en la variante.**
4. Si una variante necesita un cambio estructural distinto de las otras (ej: una sección extra), evaluar si vale la pena divergir o si conviene mover esa diferencia a un componente condicionado en `main`.

---

## Estado del proyecto

- ✅ Presupuesto cerrado y aceptado (USD 1.500)
- ✅ Kickoff enviado al cliente; pendiente recepción de información
- ✅ Repo Git iniciado, worktrees armados (clasica + industrial)
- ⏳ Pendiente: contenido del cliente (textos, foto profesional, logos)
- ⏳ Pendiente: definir variantes finales y arrancar diseño
- ⏳ Pendiente: registro de dominio `chwork.com.ar` (lo gestiona el cliente en NIC.ar)

## Reglas de oro para agentes que trabajen acá

1. **Antes de editar código**: identificar en qué worktree/branch estás. `git branch` siempre antes de tocar.
2. **Cambios transversales → `main`** (raíz). Después se propagan.
3. **Cambios de look & feel → la variante** correspondiente.
4. **Nunca** hacer `git merge` de una variante a otra sin entender el impacto. Las variantes son intencionalmente divergentes.
5. **Antes de crear archivos nuevos**: verificar que no exista uno similar. Preferir editar a crear.
6. **No tocar `presupuesto-lucas.*` ni `KICKOFF-LUCAS.md`** salvo pedido explícito — son documentos cerrados con el cliente.

---

> **Si actualizás este archivo, actualizá también `AGENTS.md`** (mantienen el mismo contenido para que distintos agentes vean la misma estrategia).
