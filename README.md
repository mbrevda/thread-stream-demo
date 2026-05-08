# thread-stream Bundling PoC

Shows how [pinojs/thread-stream#210](https://github.com/pinojs/thread-stream/pull/210) fixes pino transport bundling with esbuild.

Two identical projects — `stock/` and `patched/` — differ only in that `patched/` overrides `thread-stream` with the PR branch.

## Problem

Stock `thread-stream` resolves the worker via `join(__dirname, 'lib', 'worker.js')`, which doesn't exist after bundling. The PR's `workerLoader.js` uses `__filename` instead, which correctly points to the bundled chunk.

## Setup

ESM source → esbuild `--splitting --format=esm` → separate output files per entry point. A `--banner:js` injects `require`/`__filename`/`__dirname` polyfills for CJS compatibility.

## Usage

```bash
# Stock — fails: Cannot find module '.../dist/lib/worker.js'
cd stock && npm install && npm run build && npm start

# Patched — works: prints 3 log lines
cd patched && npm install && npm run build && npm start
```
