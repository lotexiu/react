import { defineConfig } from 'vite';

// `react` e `@lotexiu/typescript` são peer dependencies: nunca entram no bundle.
const external = [/^react($|\/)/, /^@lotexiu\/typescript($|\/)/];

export default defineConfig({
	build: {
		minify: false,
		lib: {
			entry: './src/index.ts',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
		},
		rollupOptions: { external },
	},
});
