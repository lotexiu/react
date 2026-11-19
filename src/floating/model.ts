import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { FloatingUtils } from '@lotexiu/dom';
import type { Popover, TPositionResult } from '@lotexiu/typescript';
import { useReactive } from '../reactive/model';

/**
 * Keeps `popover` placed against `anchor` while it is open (see `FloatingUtils.follow` in `@lotexiu/dom`). Returns the position
 * to apply (e.g. `position: fixed` with `left`/`top`); `undefined` until measured.
 */
function useFloating(popover: Popover, anchor: RefObject<Element | null>, floating: RefObject<Element | null>): TPositionResult | undefined {
	'use no memo';
	const open = useReactive(popover.value);
	useLayoutEffect(() => {
		if (!open || anchor.current === null || floating.current === null) return;
		return FloatingUtils.follow(popover, anchor.current, floating.current);
	}, [open, popover, anchor, floating]);
	return useReactive(popover.position);
}

export { useFloating };
