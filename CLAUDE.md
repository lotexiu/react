# CLAUDE.md — @lotexiu/react

Este pacote segue **as mesmas regras do `@lotexiu/typescript`** (`../typescript/CLAUDE.md`): uma pasta por módulo com `model.ts`/`utils.ts`/`types.ts`/`declarations.ts`, utilitários como classe `XUtils` com `static` (sem função solta exportada; hooks/fábricas são a exceção, como os composables), constantes em `declarations.ts`, nomes sem abreviação, sem comentário em código interno e **JSDoc em tudo que é público**, testes espelhados em `src/.test/`.

`src/index.ts` é **gerado** pelo mesmo gerador da lib (`pnpm docs:ast`, que também escreve `docs/api/`, `docs/COVERAGE.md` e `docs/DIAGNOSTICS.md`). `pnpm build` roda `docs:check`; `pnpm docs:strict` falha se algo público ficar sem JSDoc.

Publicação: `pnpm release` (build + `npm publish ./dist`); o build termina com `pnpm dist:prepare`, que monta o `dist/` com `package.json` enxuto, `LICENSE`, `README.md` e `API.md` (ver "Publicação" no CLAUDE.md da lib).

Específico: todo hook tem `'use no memo'` (o React Compiler de quem consome compila pacotes do workspace) e `src/.test/compiler-guard.test.ts` garante isso — ao criar um hook, registre-o lá. Lógica de DOM não mora aqui: vem de `@lotexiu/dom`.
