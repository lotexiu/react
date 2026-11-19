# `signal`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`useSignal`](#usesignal) | função | Um `signal` local ao componente: criado uma vez, estável entre renders, **sem** re-render por si só. Leia com `useReactive(s)` onde a UI depende dele (ou passe `s` adiante para outros signals/computed). |
| [`useComputed`](#usecomputed) | função | Um `computed` local, recriado quando `deps` mudam. As dependências **reativas** (signals lidos dentro de `compute`) são rastreadas sozinhas; `deps` serve só para valores do React (props/state) capturados pela função. |
| [`useSubscribe`](#usesubscribe) | função | Executa `listener` a cada mudança de `source` (efeito colateral; não re-renderiza). Sempre usa a versão mais recente do `listener`. |

---

## `useSignal`

função · [src/signal/model.ts:9](../../src/signal/model.ts#L9)

Um `signal` local ao componente: criado uma vez, estável entre renders, **sem** re-render por si só.
Leia com `useReactive(s)` onde a UI depende dele (ou passe `s` adiante para outros signals/computed).

```ts
function useSignal<T>(initial: T | (() => T)): Signal<T>
```

---

## `useComputed`

função · [src/signal/model.ts:20](../../src/signal/model.ts#L20)

Um `computed` local, recriado quando `deps` mudam. As dependências **reativas** (signals lidos dentro de `compute`)
são rastreadas sozinhas; `deps` serve só para valores do React (props/state) capturados pela função.

```ts
function useComputed<T>(compute: () => T, deps: readonly unknown[]): TReactive<T>
```

---

## `useSubscribe`

função · [src/signal/model.ts:29](../../src/signal/model.ts#L29)

Executa `listener` a cada mudança de `source` (efeito colateral; não re-renderiza). Sempre usa a versão mais recente do `listener`.

```ts
function useSubscribe<T>(source: TReactive<T>, listener: TValueListener<T>): void
```
