# `outside-pointer`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`useOutsidePointer`](#useoutsidepointer) | função | Calls `handler` on a pointer down outside every element in `inside` while `active` — wire it to a control's `interactOutside` (`Dialog`, `Popover`, `Menu`, `Select`, `Combobox`). Always uses the latest `handler`. |

---

## `useOutsidePointer`

função · [src/outside-pointer/model.ts:9](../../src/outside-pointer/model.ts#L9)

Calls `handler` on a pointer down outside every element in `inside` while `active` — wire it to a control's
`interactOutside` (`Dialog`, `Popover`, `Menu`, `Select`, `Combobox`). Always uses the latest `handler`.

```ts
function useOutsidePointer(inside: readonly RefObject<HTMLElement | null>[], handler: () => void, active: boolean): void
```
