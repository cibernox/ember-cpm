import {parseComputedPropertyMacro} from '../utils';

export default parseComputedPropertyMacro(function (raw) {
  return parseFloat(raw);
});
