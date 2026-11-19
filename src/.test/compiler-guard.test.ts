import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * O React Compiler de quem consome compila também pacotes do workspace e quebra estes hooks
 * (cache por identidade de dados mutados no lugar). A diretiva `'use no memo'` é a defesa — este teste impede removê-la sem querer.
 */
const HOOKS: Record<string, string[]> = {
	'version/model.ts': ['useVersion'],
	'reactive/model.ts': ['useReactive', 'useMutableReactive'],
	'signal/model.ts': ['useSignal', 'useComputed', 'useSubscribe'],
	'part/model.ts': ['useTracked', 'usePart'],
	'focus-trap/model.ts': ['useFocusTrap'],
	'outside-pointer/model.ts': ['useOutsidePointer'],
	'floating/model.ts': ['useFloating'],
};

describe("'use no memo' nos hooks", () => {
	for (const [file, names] of Object.entries(HOOKS)) {
		for (const name of names) {
			it(`${name} (${file})`, () => {
				const source = readFileSync(`src/${file}`, 'utf8');
				const body = source.slice(source.indexOf(`function ${name}`));
				expect(body.slice(0, body.indexOf('\n}'))).toContain("'use no memo'");
			});
		}
	}
});
