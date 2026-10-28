import { useMemo } from 'react';
import type { TReactive } from '@lotexiu/typescript';
import { useVersion } from './use-version';

/**
 * Lê `source` já "carimbado" com a versão. O React Compiler memoiza `source()` pela identidade de
 * `source` (que nunca muda); passar a versão como argumento é o que o faz reler a cada mudança.
 */
const read = <T>(source: TReactive<T>, _version: number): T => source();

/**
 * Valor atual de um `signal`/`computed`, re-renderizando quando ele muda.
 * Para fontes cujo valor é **substituído** a cada mudança (primitivos, objetos imutáveis, `computed`).
 * Se a fonte é mutada no lugar (`Set`, array, objeto + `notify()`), use `useMutableReactive`.
 */
function useReactive<T>(source: TReactive<T>): T {
	'use no memo';
	return read(source, useVersion(source));
}

function shallowCopy<T extends object>(value: T): T {
	if (Array.isArray(value)) return [...value] as T;
	if (value instanceof Set) return new Set(value) as T;
	if (value instanceof Map) return new Map(value) as T;
	return { ...value };
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
	return useMemo(() => shallowCopy(source()), [source, version]);
}

export { useReactive, useMutableReactive };
