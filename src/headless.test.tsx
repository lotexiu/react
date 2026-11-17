import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Slider, Switch } from '@lotexiu/typescript';
import { toReactProps, usePart, useReactive } from './index';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let host: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
	host = document.createElement('div');
	root = createRoot(host);
});
afterEach(() => act(() => root.unmount()));

describe('toReactProps', () => {
	it('renames attributes React spells differently, turns presence into booleans and drops undefined', () => {
		expect(toReactProps({ tabindex: 0, for: 'name', readonly: '', autocomplete: 'off', hidden: undefined, 'aria-checked': 'true', 'data-state': 'on' })).toEqual({
			autoComplete: 'off',
			tabIndex: 0,
			htmlFor: 'name',
			readOnly: true,
			'aria-checked': 'true',
			'data-state': 'on',
		});
	});
});

describe('usePart', () => {
	it('re-renders a headless part when its state changes', () => {
		const power = new Switch({ id: 'power' });
		function PowerSwitch() {
			const props = usePart(() => power.parts.root(), [power]);
			return createElement('button', { ...props, onClick: power.toggle, onKeyDown: power.keydown });
		}
		act(() => root.render(createElement(PowerSwitch)));
		const button = host.querySelector('button')!;
		expect(button.getAttribute('aria-checked')).toBe('false');
		expect(button.tabIndex).toBe(0);
		act(() => button.click());
		expect(button.getAttribute('aria-checked')).toBe('true');
		expect(button.dataset.state).toBe('on');
	});

	it('passes React keyboard events straight to keydown and prevents the default when handled', () => {
		const volume = new Slider({ value: 10 });
		function Volume() {
			const thumb = usePart(() => volume.parts.thumb(), [volume]);
			return createElement('div', { ...thumb, onKeyDown: volume.keydown }, useReactive(volume.text));
		}
		act(() => root.render(createElement(Volume)));
		const thumb = host.querySelector('[role="slider"]')!;
		const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
		act(() => void thumb.dispatchEvent(event));
		expect(event.defaultPrevented).toBe(true);
		expect(thumb.getAttribute('aria-valuenow')).toBe('11');
		expect(thumb.textContent).toBe('11');
	});
});
