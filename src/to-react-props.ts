import type { TAttributes } from '@lotexiu/typescript';

const REACT_ATTRIBUTE_NAMES: Readonly<Record<string, string>> = {
	tabindex: 'tabIndex',
	for: 'htmlFor',
	readonly: 'readOnly',
	maxlength: 'maxLength',
	autocomplete: 'autoComplete',
	minlength: 'minLength',
	class: 'className',
};

const BOOLEAN_ATTRIBUTES: ReadonlySet<string> = new Set(['hidden', 'disabled', 'readonly', 'required']);

type TReactProps = Record<string, string | number | boolean>;

function toReactProps(attributes: TAttributes): TReactProps {
	const props: TReactProps = {};
	for (const [name, value] of Object.entries(attributes)) {
		if (value === undefined) continue;
		props[REACT_ATTRIBUTE_NAMES[name] ?? name] = BOOLEAN_ATTRIBUTES.has(name) ? value === '' || value === 'true' : value;
	}
	return props;
}

export { toReactProps };
export type { TReactProps };
