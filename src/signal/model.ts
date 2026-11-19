import { useEffect, useMemo, useRef } from 'react';
import { computed, signal } from '@lotexiu/typescript';
import type { Signal, TReactive, TValueListener } from '@lotexiu/typescript';

/**
 * Um `signal` local ao componente: criado uma vez, estável entre renders, **sem** re-render por si só.
 * Leia com `useReactive(s)` onde a UI depende dele (ou passe `s` adiante para outros signals/computed).
 */
function useSignal<T>(initial: T | (() => T)): Signal<T> {
	'use no memo';
	// `useMemo` com deps vazias basta: o React pode descartar o cache, mas o valor inicial só é usado na criação
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => signal(typeof initial === 'function' ? (initial as () => T)() : initial), []);
}

/**
 * Um `computed` local, recriado quando `deps` mudam. As dependências **reativas** (signals lidos dentro de `compute`)
 * são rastreadas sozinhas; `deps` serve só para valores do React (props/state) capturados pela função.
 */
function useComputed<T>(compute: () => T, deps: readonly unknown[]): TReactive<T> {
	'use no memo';
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const instance = useMemo(() => computed(compute), deps);
	useEffect(() => () => instance.dispose(), [instance]);
	return instance;
}

/** Executa `listener` a cada mudança de `source` (efeito colateral; não re-renderiza). Sempre usa a versão mais recente do `listener`. */
function useSubscribe<T>(source: TReactive<T>, listener: TValueListener<T>): void {
	'use no memo';
	const latest = useRef(listener);
	useEffect(() => {
		latest.current = listener;
	});
	useEffect(() => source.subscribe((value) => latest.current(value)), [source]);
}

export { useSignal, useComputed, useSubscribe };
