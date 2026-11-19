# `focus-trap`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`useFocusTrap`](#usefocustrap) | função | Keeps keyboard focus inside `container` while `active` (see `FocusUtils.trap` in `@lotexiu/dom`): moves focus in, cycles Tab/Shift+Tab, and gives the focus back when it deactivates. Pair it with a modal `Dialog`. |

---

## `useFocusTrap`

função · [src/focus-trap/model.ts:9](../../src/focus-trap/model.ts#L9)

Keeps keyboard focus inside `container` while `active` (see `FocusUtils.trap` in `@lotexiu/dom`): moves focus in, cycles
Tab/Shift+Tab, and gives the focus back when it deactivates. Pair it with a modal `Dialog`.

```ts
function useFocusTrap(container: RefObject<HTMLElement | null>, active: boolean): void
```
