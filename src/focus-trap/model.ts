import { useEffect } from 'react';
import type { RefObject } from 'react';
import { FocusUtils } from '@lotexiu/dom';

/**
 * Keeps keyboard focus inside `container` while `active` (see `FocusUtils.trap` in `@lotexiu/dom`): moves focus in, cycles
 * Tab/Shift+Tab, and gives the focus back when it deactivates. Pair it with a modal `Dialog`.
 */
function useFocusTrap(container: RefObject<HTMLElement | null>, active: boolean): void {
	'use no memo';
	useEffect(() => {
		const element = container.current;
		if (!active || element === null) return;
		return FocusUtils.trap(element);
	}, [container, active]);
}

export { useFocusTrap };
