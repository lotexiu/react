import { useEffect } from 'react';
import type { RefObject } from 'react';

const TABBABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function tabbables(container: HTMLElement): HTMLElement[] {
	return [...container.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)].filter((element) => !element.hidden && element.closest('[hidden]') === null);
}

/**
 * Keeps keyboard focus inside `container` while `active`: moves focus in when it activates, cycles Tab/Shift+Tab, and gives the
 * focus back to the element that had it when it deactivates. Pair it with a modal `Dialog`.
 */
function useFocusTrap(container: RefObject<HTMLElement | null>, active: boolean): void {
	'use no memo';
	useEffect(() => {
		const element = container.current;
		if (!active || element === null) return;
		const previous = document.activeElement as HTMLElement | null;
		(tabbables(element)[0] ?? element).focus();
		const keepInside = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;
			const focusable = tabbables(element);
			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		element.addEventListener('keydown', keepInside);
		return () => {
			element.removeEventListener('keydown', keepInside);
			previous?.focus?.();
		};
	}, [container, active]);
}

export { useFocusTrap };
