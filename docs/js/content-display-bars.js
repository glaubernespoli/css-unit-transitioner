import {
    getActiveUnit,
    getNumber
} from './utils.js';
import {
    units
} from './units.js';

export function executeUpdateDisplayBars(val) {
    const currentUnitStr = getActiveUnit().data('unit');
    const currentUnit = units[currentUnitStr];
    $('#unit-display-wrapper').children().each((idx, item) => {
        item = $(item);
        const idxUnit = item.children('.unit-display-bar').data('unit');
        const convertedValue = getNumber(currentUnitStr == idxUnit ? val : currentUnit.conversion[idxUnit] * val);
        const strConvertedValue = `${convertedValue}${idxUnit}`;
        item.children('span').text(`${units[idxUnit].name} = ${strConvertedValue}`);
        item.children('.unit-display-bar').width(strConvertedValue);
    });
}