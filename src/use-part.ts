import type { TAttributes } from '@lotexiu/typescript';
import { useReactive } from './use-reactive';
import { useComputed } from './use-signal';
import { toReactProps } from './to-react-props';
import type { TReactProps } from './to-react-props';

function useTracked<T>(compute: () => T, deps: readonly unknown[] = []): T {
	'use no memo';
	return useReactive(useComputed(compute, deps));
}

function usePart(part: () => TAttributes, deps: readonly unknown[] = []): TReactProps {
	'use no memo';
	return toReactProps(useTracked(part, deps));
}

export { useTracked, usePart };
