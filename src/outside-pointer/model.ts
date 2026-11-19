import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { PointerUtils } from '@lotexiu/dom';

/**
 * Calls `handler` on a pointer down outside every element in `inside` while `active` — wire it to a control's
 * `interactOutside` (`Dialog`, `Popover`, `Menu`, `Select`, `Combobox`). Always uses the latest `handler`.
 */
function useOutsidePointer(inside: readonly RefObject<HTMLElement | null>[], handler: () => void, active: boolean): void {
	'use no memo';
	const latest = useRef(handler);
	const elements = useRef(inside);
	useEffect(() => {
		latest.current = handler;
		elements.current = inside;
	});
	useEffect(() => {
		if (!active) return;
		return PointerUtils.onOutside(
			() => elements.current.map((reference) => reference.current),
			() => latest.current()
		);
	}, [active]);
}

export { useOutsidePointer };
