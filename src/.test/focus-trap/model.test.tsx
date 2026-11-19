import { act, createElement, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useFocusTrap, useOutsidePointer } from '../../index';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let host: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
	host = document.createElement('div');
	document.body.appendChild(host);
	root = createRoot(host);
});
afterEach(() => {
	act(() => root.unmount());
	host.remove();
});

function press(target: Element, key: string, shiftKey = false) {
	target.dispatchEvent(new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true }));
}

describe('useFocusTrap', () => {
	it('moves focus in, cycles Tab inside and gives it back when released', () => {
		let setOpen: (open: boolean) => void = () => undefined;
		function Trap() {
			const [open, setter] = useState(false);
			setOpen = setter;
			const container = useRef<HTMLDivElement>(null);
			useFocusTrap(container, open);
			return createElement('div', null, createElement('button', { id: 'outside' }), createElement('div', { ref: container }, createElement('button', { id: 'first' }), createElement('button', { id: 'last' })));
		}
		act(() => root.render(createElement(Trap)));
		const outside = host.querySelector<HTMLButtonElement>('#outside')!;
		outside.focus();
		act(() => setOpen(true));
		expect(document.activeElement?.id).toBe('first');
		host.querySelector<HTMLButtonElement>('#last')!.focus();
		act(() => press(document.activeElement!, 'Tab'));
		expect(document.activeElement?.id).toBe('first');
		act(() => press(document.activeElement!, 'Tab', true));
		expect(document.activeElement?.id).toBe('last');
		act(() => setOpen(false));
		expect(document.activeElement?.id).toBe('outside');
	});
});

describe('useOutsidePointer', () => {
	it('calls the handler only for pointer downs outside the given elements', () => {
		const handler = vi.fn();
		function Area() {
			const inside = useRef<HTMLDivElement>(null);
			useOutsidePointer([inside], handler, true);
			return createElement('div', null, createElement('div', { id: 'inside', ref: inside }), createElement('div', { id: 'outside' }));
		}
		act(() => root.render(createElement(Area)));
		act(() => void host.querySelector('#inside')!.dispatchEvent(new Event('pointerdown', { bubbles: true })));
		expect(handler).not.toHaveBeenCalled();
		act(() => void host.querySelector('#outside')!.dispatchEvent(new Event('pointerdown', { bubbles: true })));
		expect(handler).toHaveBeenCalledOnce();
	});
});
