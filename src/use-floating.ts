import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import type { Popover, TPositionResult } from '@lotexiu/typescript';
import { useReactive } from './use-reactive';

function rectOf(element: Element) {
	const bounds = element.getBoundingClientRect();
	return { x: bounds.left, y: bounds.top, width: bounds.width, height: bounds.height };
}

/**
 * Measures `anchor` and `floating` while `popover` is open and keeps its position up to date (on open, resize and scroll).
 * Returns the position to apply (e.g. `position: fixed` with `left`/`top`); `undefined` until measured.
 */
function useFloating(popover: Popover, anchor: RefObject<Element | null>, floating: RefObject<Element | null>): TPositionResult | undefined {
	'use no memo';
	const open = useReactive(popover.value);
	useLayoutEffect(() => {
		if (!open) return;
		const update = () => {
			if (anchor.current === null || floating.current === null) return;
			const { width, height } = rectOf(floating.current);
			popover.place(rectOf(anchor.current), { width, height }, { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight });
		};
		update();
		window.addEventListener('resize', update);
		window.addEventListener('scroll', update, true);
		return () => {
			window.removeEventListener('resize', update);
			window.removeEventListener('scroll', update, true);
		};
	}, [open, popover, anchor, floating]);
	return useReactive(popover.position);
}

export { useFloating };
