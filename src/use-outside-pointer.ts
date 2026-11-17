import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Calls `handler` on a pointer down outside every element in `inside` while `active` — wire it to a control's
 * `interactOutside` (`Dialog`, `Popover`, `Menu`, `Select`, `Combobox`). Always uses the latest `handler`.
 */
function useOutsidePointer(inside: readonly RefObject<HTMLElement | null>[], handler: () => void, active: boolean): void {
	'use no memo';
	const latest = useRef(handler);
	useEffect(() => {
		latest.current = handler;
	});
	useEffect(() => {
		if (!active) return;
		const listener = (event: PointerEvent) => {
			const target = event.target as Node | null;
			if (target !== null && inside.some((reference) => reference.current?.contains(target))) return;
			latest.current();
		};
		document.addEventListener('pointerdown', listener, true);
		return () => document.removeEventListener('pointerdown', listener, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, ...inside]);
}

export { useOutsidePointer };
