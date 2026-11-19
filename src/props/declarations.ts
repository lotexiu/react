/**
 * @internal
 * HTML attribute names React spells differently.
 */
const REACT_ATTRIBUTE_NAMES: Readonly<Record<string, string>> = {
	tabindex: 'tabIndex',
	for: 'htmlFor',
	readonly: 'readOnly',
	maxlength: 'maxLength',
	minlength: 'minLength',
	autocomplete: 'autoComplete',
	class: 'className',
};

/**
 * @internal
 * Attributes whose presence means `true` (React wants a boolean, not `''`).
 */
const BOOLEAN_ATTRIBUTES: ReadonlySet<string> = new Set(['hidden', 'disabled', 'readonly', 'required']);

export { REACT_ATTRIBUTE_NAMES, BOOLEAN_ATTRIBUTES };
