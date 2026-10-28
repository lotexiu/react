# @lotexiu/react

Adaptador de React para [`@lotexiu/typescript`](../typescript): liga `signal`/`computed` ao ciclo de render. O núcleo continua sem conhecer framework; tudo que é específico de React mora aqui (e, no futuro, os componentes headless).

```tsx
import { signal, computed } from '@lotexiu/typescript'
import { useReactive, useMutableReactive, useSignal } from '@lotexiu/react'

const count = signal(0)
const label = computed(() => `Cliques: ${count()}`)

function Counter() {
  const text = useReactive(label)                 // re-renderiza quando muda
  const local = useSignal(0)                      // signal local, estável, sem re-render por si só
  return <button onClick={() => count.update((n) => n + 1)}>{text} / {useReactive(local)}</button>
}

// Fontes mutadas no lugar (Set, objeto + notify()): recebem uma cópia rasa por versão
const keys = useMutableReactive(keyboard.keys)
```

| Hook | Para quê |
|---|---|
| `useReactive(source)` | valor atual; re-renderiza ao mudar (valores substituídos a cada mudança) |
| `useMutableReactive(source)` | fontes **mutadas no lugar**; devolve cópia rasa nova a cada versão |
| `useSignal(initial)` | signal local ao componente (estável) |
| `useComputed(fn, deps)` | computed local (recriado quando `deps` mudam) |
| `useSubscribe(source, fn)` | efeito colateral a cada mudança |
| `useVersion(source)` | o contador (`source.version()`) como número |

## Por que existe `version()`
`useSyncExternalStore` só re-renderiza quando o *snapshot* muda, e a lib incentiva mutar objetos no lugar + `notify()` (a referência não muda). O snapshot é `source.version()`, um contador sem rastreio; é lido de novo ao assinar, então mudanças entre render e assinatura não se perdem. O 3º argumento (`getServerSnapshot`) deixa os hooks seguros em SSR/Next.

## React Compiler
O compilador de **quem consome** também compila pacotes do workspace (arquivos fora de `node_modules`) e reescreve `useMemo`/leituras em cache por identidade — o oposto do que estes hooks precisam. Por isso cada hook tem `'use no memo'` (e há um teste que garante isso). Em uso normal (pacote instalado de `node_modules`) o compilador já o ignora.
