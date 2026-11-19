import type { TReactive } from '@lotexiu/typescript';

/**
 * @internal
 */
class ReactiveUtils {
	/**
	 * Reads `source` "stamped" with its version. The React Compiler memoizes `source()` by the identity of `source` (which
	 * never changes); passing the version as an argument makes it read again on every change.
	 */
	static read<T>(source: TReactive<T>, version: number): T {
		return source();
	}

	/** A new shallow copy of an array, set, map or plain object, so reference-based caches see a change. */
	static shallowCopy<T extends object>(value: T): T {
		if (Array.isArray(value)) return [...value] as T;
		if (value instanceof Set) return new Set(value) as T;
		if (value instanceof Map) return new Map(value) as T;
		return { ...value };
	}
}

export { ReactiveUtils };
