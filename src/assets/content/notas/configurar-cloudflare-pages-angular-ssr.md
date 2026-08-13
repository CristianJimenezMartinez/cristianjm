---
title: "Configuración limpia de Angular 18 SSR en Cloudflare Pages"
description: "Paso a paso para configurar prerendering estático (SSG) en Angular 18 para despliegues instantáneos en Cloudflare."
date: "2026-08-12"
tags: ["Angular", "Cloudflare", "SSG", "DevOps"]
---

# Configuración limpia de Angular 18 SSR en Cloudflare Pages

Chuleta rápida para desplegar aplicaciones Angular 18 con pre-renderizado (SSG) en Cloudflare Pages.

## 1. Ajuste en `angular.json`

```json
{
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:application",
      "options": {
        "outputPath": "dist/cristian-jimenez",
        "prerender": {
          "routesFile": "prerender-routes.txt"
        },
        "ssr": {
          "entry": "server.ts"
        }
      }
    }
  }
}
```

## 2. Variables de entorno en Cloudflare Pages

Asegúrate de configurar en el dashboard de Cloudflare:
- `NODE_VERSION` = `18.20.0`
- Directory output = `dist/cristian-jimenez/browser`

## 3. Redirecciones SPA (`_redirects`)

Crea el archivo `src/_redirects`:
```text
/*  /index.html  200
```
