# `reactive`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`useReactive`](#usereactive) | função | Valor atual de um `signal`/`computed`, re-renderizando quando ele muda. Para fontes cujo valor é **substituído** a cada mudança (primitivos, objetos imutáveis, `computed`). Se a fonte é mutada no lugar (`Set`, array, objeto + `notify()`), use `useMutableReactive`. |
| [`useMutableReactive`](#usemutablereactive) | função | Para fontes **mutadas no lugar**: devolve uma cópia rasa nova a cada versão. Sem isso o React Compiler (e `memo`/`useMemo`), que decidem pela identidade da referência, reaproveitam o JSX antigo — `source()` continua sendo o mesmo objeto depois do `notify()`. |

---

## `useReactive`

função · [src/reactive/model.ts:12](../../src/reactive/model.ts#L12)

Valor atual de um `signal`/`computed`, re-renderizando quando ele muda.
Para fontes cujo valor é **substituído** a cada mudança (primitivos, objetos imutáveis, `computed`).
Se a fonte é mutada no lugar (`Set`, array, objeto + `notify()`), use `useMutableReactive`.

```ts
function useReactive<T>(source: TReactive<T>): T
```

---

## `useMutableReactive`

função · [src/reactive/model.ts:23](../../src/reactive/model.ts#L23)

Para fontes **mutadas no lugar**: devolve uma cópia rasa nova a cada versão. Sem isso o React Compiler
(e `memo`/`useMemo`), que decidem pela identidade da referência, reaproveitam o JSX antigo — `source()`
continua sendo o mesmo objeto depois do `notify()`.

```ts
function useMutableReactive<T extends object>(source: TReactive<T>): T
```

Estende `object`.
