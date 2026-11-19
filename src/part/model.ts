import type { TAttributes } from '@lotexiu/typescript';
import { ReactPropsUtils } from '../props/utils';
import type { TReactProps } from '../props/types';
import { useReactive } from '../reactive/model';
import { useComputed } from '../signal/model';

/**
 * The value of a function that reads `@lotexiu/typescript` signals, re-rendering whenever any of them changes.
 * @example
 * const label = useTracked(() => `${count()} / ${total()}`)
 */
function useTracked<T>(compute: () => T, deps: readonly unknown[] = []): T {
	'use no memo';
	return useReactive(useComputed(compute, deps));
}

/**
 * The attributes of one headless part as React props, re-rendering when they change.
 * @example
 * const thumb = usePart(() => slider.parts.thumb(), [slider])
 * return <div {...thumb} onKeyDown={slider.keydown} />
 */
function usePart(part: () => TAttributes, deps: readonly unknown[] = []): TReactProps {
	'use no memo';
	return ReactPropsUtils.from(useTracked(part, deps));
}

export { useTracked, usePart };
