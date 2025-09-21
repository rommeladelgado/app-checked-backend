# 🧰 Firebase Functions (TypeScript) — Local Guide

This package contains the project's Cloud Functions, written in **TypeScript** and prepared to run with the Firebase **Emulators**.

## Requirements

- **Node.js 22**  
  Recommended with `nvm`:
  ```bash
  nvm install 22
  nvm use 22
  ```
- **Firebase CLI**:
  ```bash
  npm i -g firebase-tools
  ```
  - (Opcional) **Java 11+**

- **Firebase Login**:
    ```bash
  firebase login
  ```
---

## 1) Install dependencies

```bash
cd functions
npm install
```

---

## 2) Variables de entorno (local)

Create a functions/.env file with your values:

```dotenv
# functions/.env
JWT_SECRET=tu_secreto
REFRESH_SECRET=tu_refresh_secreto
JWT_EXPIRES_IN=3600s
REFRESH_EXPIRES_IN=7d
```

## 3) Compile

This project uses `tsconfig.build.json` and **`tsc-alias`** to solve `@src/*` at the exit.

```bash
npm run build
```

## 4) Emulators (run locally)

Tienes dos formas:

### A) With the script already prepared
```bash
npm run serve
```
This script **compiles** and starts `firebase emulators:start`.

### B) Manual (if you want to specify a “temporary” projectId)
```bash
npm run build
firebase emulators:start
```

> You can open the Emulators UI (if you have enabled it) at:
> `http://localhost:4001`

---

## 5) Testing HTTP Endpoints

URL format for Functions (HTTP onRequest):
```
http://localhost:5001/<PROJECT_ID>/us-central1/api/{catalog}/{name_function}
```

Example with `demo-test`:
```bash
curl http://localhost:5001/demo-test/us-central1/user/login
```

## 6) Tests

### Tests with emulators (integration)
```bash
npm run test:emulators
```
> This script starts emulators, runs Jest, and shuts them down when finished.

---

## 7) Lint

```bash
npm run lint
```
---

## Available scripts (shortcuts)

- `npm run lint` — ESLint
- `npm run build` — Compiles TS + resolves aliases
- `npm run build:watch` — Compile in watch mode
- `npm run serve` — Build + emulators
- `npm run shell` / `npm start` — Build + `firebase functions:shell`
- `npm test` — Jest
- `npm run test:emulators` — Jest inside Emulators
- `npm run deploy` — **(requires project and credentials)** deploy Functions
- `npm run logs` — Function Logs
