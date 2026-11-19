# `props`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`TReactProps`](#treactprops) | tipo | Props React accepts for a headless part. |
| [`ReactPropsUtils`](#reactpropsutils) | classe | Turns the framework-neutral attributes of headless parts into React props. |

---

## `TReactProps`

tipo · [src/props/types.ts:2](../../src/props/types.ts#L2)

Props React accepts for a headless part.

```ts
type TReactProps = Record<string, string | number | boolean>
```

---

## `ReactPropsUtils`

classe · [src/props/utils.ts:6](../../src/props/utils.ts#L6)

Turns the framework-neutral attributes of headless parts into React props.

```ts
class ReactPropsUtils
```

### Estáticos

#### `static from(attributes: TAttributes): TReactProps`

Renames the attributes React spells differently (`tabindex` → `tabIndex`, `for` → `htmlFor`…), turns presence
attributes (`hidden: ''`) into booleans and drops `undefined` ones.

**Exemplo**

```ts
<div {...ReactPropsUtils.from(slider.parts.thumb())} />
```
