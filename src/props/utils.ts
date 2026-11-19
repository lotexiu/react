import type { TAttributes } from '@lotexiu/typescript';
import { BOOLEAN_ATTRIBUTES, REACT_ATTRIBUTE_NAMES } from './declarations';
import type { TReactProps } from './types';

/** Turns the framework-neutral attributes of headless parts into React props. */
class ReactPropsUtils {
	/**
	 * Renames the attributes React spells differently (`tabindex` → `tabIndex`, `for` → `htmlFor`…), turns presence
	 * attributes (`hidden: ''`) into booleans and drops `undefined` ones.
	 * @example
	 * <div {...ReactPropsUtils.from(slider.parts.thumb())} />
	 */
	static from(attributes: TAttributes): TReactProps {
		const props: TReactProps = {};
		for (const [name, value] of Object.entries(attributes)) {
			if (value === undefined) continue;
			props[REACT_ATTRIBUTE_NAMES[name] ?? name] = BOOLEAN_ATTRIBUTES.has(name) ? value === '' || value === 'true' : value;
		}
		return props;
	}
}

export { ReactPropsUtils };
