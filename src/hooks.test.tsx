import { act, createElement, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { computed, selection, signal } from '@lotexiu/typescript';
import { useComputed, useMutableReactive, useReactive, useSignal, useSubscribe } from './index';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let host: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
	host = document.createElement('div');
	root = createRoot(host);
});
afterEach(() => act(() => root.unmount()));

const render = (element: React.ReactElement) => act(() => root.render(element));

describe('useReactive', () => {
	it('shows the value and re-renders when the signal changes', () => {
		const count = signal(1);
		render(createElement(() => createElement('b', null, useReactive(count))));
		expect(host.textContent).toBe('1');
		act(() => void count.set(2));
		expect(host.textContent).toBe('2');
	});

	it('follows a computed', () => {
		const a = signal(2);
		const double = computed(() => a() * 2);
		render(createElement(() => createElement('b', null, useReactive(double))));
		act(() => void a.set(5));
		expect(host.textContent).toBe('10');
	});

	it('does not re-render for writes that do not change the value', () => {
		const flag = signal(true);
		let renders = 0;
		render(createElement(() => (renders++, createElement('b', null, String(useReactive(flag))))));
		const before = renders;
		act(() => void flag.set(true));
		expect(renders).toBe(before);
	});

	it('switches subscription when the source changes', () => {
		const a = signal('a');
		const b = signal('b');
		const View = ({ source }: { source: typeof a }) => createElement('b', null, useReactive(source));
		render(createElement(View, { source: a }));
		render(createElement(View, { source: b }));
		act(() => void b.set('B'));
		expect(host.textContent).toBe('B');
		act(() => void a.set('A'));
		expect(host.textContent).toBe('B');
	});

	it('is SSR-safe (renders the current value on the server)', () => {
		const name = signal('server');
		expect(renderToString(createElement(() => createElement('b', null, useReactive(name))))).toContain('server');
	});
});

describe('useMutableReactive', () => {
	it('gives a fresh copy per version when the source is mutated in place', () => {
		const keys = signal(new Set<string>());
		const seen: Set<string>[] = [];
		const View = () => {
			const value = useMutableReactive(keys);
			seen.push(value);
			return createElement('b', null, [...value].join(','));
		};
		render(createElement(View));
		act(() => {
			keys().add('a');
			keys.notify();
		});
		expect(host.textContent).toBe('a');
		expect(seen.at(-1)).not.toBe(keys());
		expect(seen.at(-1)).not.toBe(seen.at(-2));
	});

	it('works with a selection (computed array)', () => {
		const picked = selection<string>();
		render(createElement(() => createElement('b', null, useMutableReactive(picked).join('|'))));
		act(() => picked.select('x', 'y'));
		expect(host.textContent).toBe('x|y');
	});
});

describe('useSignal / useComputed / useSubscribe', () => {
	it('useSignal is stable across renders and does not re-render by itself', () => {
		const instances = new Set<unknown>();
		let renders = 0;
		const View = () => {
			const s = useSignal(0);
			instances.add(s);
			renders++;
			return createElement('button', { onClick: () => s.update((n) => n + 1) }, String(useReactive(s)));
		};
		render(createElement(View));
		act(() => (host.firstElementChild as HTMLButtonElement).click());
		expect(host.textContent).toBe('1');
		expect(instances.size).toBe(1);
		expect(renders).toBe(2);
	});

	it('useComputed recomputes from signals and when deps change', () => {
		const base = signal(1);
		const View = ({ factor }: { factor: number }) => {
			const scaled = useComputed(() => base() * factor, [factor]);
			return createElement('b', null, useReactive(scaled));
		};
		render(createElement(View, { factor: 10 }));
		expect(host.textContent).toBe('10');
		act(() => void base.set(2));
		expect(host.textContent).toBe('20');
		render(createElement(View, { factor: 100 }));
		expect(host.textContent).toBe('200');
	});

	it('useSubscribe calls the latest listener and unsubscribes on unmount', () => {
		const s = signal(0);
		const calls: string[] = [];
		const View = ({ tag }: { tag: string }) => {
			useSubscribe(s, (v) => calls.push(`${tag}${v}`));
			useEffect(() => {}, []);
			return null;
		};
		render(createElement(View, { tag: 'a' }));
		act(() => void s.set(1));
		render(createElement(View, { tag: 'b' }));
		act(() => void s.set(2));
		act(() => root.unmount());
		s.set(3);
		expect(calls).toEqual(['a1', 'b2']);
		root = createRoot(host);
	});
});
