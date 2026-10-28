import { useMemo, useSyncExternalStore } from 'react';
import type { TReactive } from '@lotexiu/typescript';

/**
 * Número que muda quando `source` muda. É o gancho de tudo neste pacote: `useSyncExternalStore` só
 * re-renderiza quando o *snapshot* muda, e a lib incentiva mutar objetos no lugar + `notify()` — então o
 * valor mantém a mesma referência. `version()` (contador sem rastreio) resolve isso, e é lido de novo
 * ao assinar, então mudanças entre o render e a assinatura não se perdem.
 * O 3º argumento torna o hook seguro em SSR (Next).
 *
 * `'use no memo'`: o React Compiler de quem consome **também compila pacotes do workspace** (arquivos fora de `node_modules`)
 * e reescreveria os `useMemo`/leituras daqui em cache por identidade — exatamente o que estes hooks existem para evitar.
 */
function useVersion<T>(source: TReactive<T>): number {
	'use no memo';
	const store = useMemo(
		() => ({
			subscribe: (onChange: () => void) => source.subscribe(() => onChange()),
			getVersion: () => source.version(),
		}),
		[source]
	);
	return useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion);
}

export { useVersion };
