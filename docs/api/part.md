# `part`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`useTracked`](#usetracked) | função | The value of a function that reads `@lotexiu/typescript` signals, re-rendering whenever any of them changes. |
| [`usePart`](#usepart) | função | The attributes of one headless part as React props, re-rendering when they change. |

---

## `useTracked`

função · [src/part/model.ts:12](../../src/part/model.ts#L12)

The value of a function that reads `@lotexiu/typescript` signals, re-rendering whenever any of them changes.

```ts
function useTracked<T>(compute: () => T, deps: readonly unknown[] = []): T
```

**Exemplo**

```ts
const label = useTracked(() => `${count()} / ${total()}`)
```

---

## `usePart`

função · [src/part/model.ts:23](../../src/part/model.ts#L23)

The attributes of one headless part as React props, re-rendering when they change.

```ts
function usePart(part: () => TAttributes, deps: readonly unknown[] = []): TReactProps
```

**Exemplo**

```ts
const thumb = usePart(() => slider.parts.thumb(), [slider])
return <div {...thumb} onKeyDown={slider.keydown} />
```
