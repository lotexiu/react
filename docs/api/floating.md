# `floating`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`useFloating`](#usefloating) | função | Keeps `popover` placed against `anchor` while it is open (see `FloatingUtils.follow` in `@lotexiu/dom`). Returns the position to apply (e.g. `position: fixed` with `left`/`top`); `undefined` until measured. |

---

## `useFloating`

função · [src/floating/model.ts:11](../../src/floating/model.ts#L11)

Keeps `popover` placed against `anchor` while it is open (see `FloatingUtils.follow` in `@lotexiu/dom`). Returns the position
to apply (e.g. `position: fixed` with `left`/`top`); `undefined` until measured.

```ts
function useFloating(popover: Popover, anchor: RefObject<Element | null>, floating: RefObject<Element | null>): TPositionResult | undefined
```
