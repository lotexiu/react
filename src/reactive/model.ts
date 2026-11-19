import { useMemo } from 'react';
import type { TReactive } from '@lotexiu/typescript';
import { useVersion } from '../version/model';
import { ReactiveUtils } from './utils';


/**
 * Valor atual de um `signal`/`computed`, re-renderizando quando ele muda.
 * Para fontes cujo valor é **substituído** a cada mudança (primitivos, objetos imutáveis, `computed`).
 * Se a fonte é mutada no lugar (`Set`, array, objeto + `notify()`), use `useMutableReactive`.
 */
function useReactive<T>(source: TReactive<T>): T {
	'use no memo';
	return ReactiveUtils.read(source, useVersion(source));
}


/**
 * Para fontes **mutadas no lugar**: devolve uma cópia rasa nova a cada versão. Sem isso o React Compiler
 * (e `memo`/`useMemo`), que decidem pela identidade da referência, reaproveitam o JSX antigo — `source()`
 * continua sendo o mesmo objeto depois do `notify()`.
 */
function useMutableReactive<T extends object>(source: TReactive<T>): T {
	'use no memo';
	const version = useVersion(source);
	// `version` é o gatilho: a identidade de `source()` não muda entre versões
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => ReactiveUtils.shallowCopy(source()), [source, version]);
}

export { useReactive, useMutableReactive };
