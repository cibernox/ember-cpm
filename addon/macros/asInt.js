import {parseComputedPropertyMacro} from '../utils';

export default parseComputedPropertyMacro(function (raw) {
  return parseInt(raw, 10);
});
