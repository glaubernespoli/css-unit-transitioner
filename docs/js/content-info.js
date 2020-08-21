import {
    units
} from './units.js';

/**
 * Actions to be done once an unit is selected.
 * @param {string} unit selected unit
 */
export function executeOnUnitSelected(unit) {
    updateInfoDisplay(unit);
}

/**
 * Updates the unit-info container with the new information for the given unit.
 * @param {unit} unit selected unit
 */
function updateInfoDisplay(unit) {
    $('.unit-info-wrapper').replaceWith(buildInfoDisplayFor(unit));
}

/**
 * Builds the informational HTML for the selected unit.
 * @param {string} unit selected unit
 */
function buildInfoDisplayFor(unit) {
    const currentUnit = units[unit];
    const conversions = currentUnit.conversion;

    let info = `<div class="unit-info-wrapper">
    <div class="unit-info">`;
    info += `<h4>${currentUnit.name} (<label class="${unit}">${unit}</label>)</h4><ul>`;
    for (let key in conversions) {
        info += `<li>1 <label class="${unit}">${unit}</label> = ${conversions[key]} <label class="${key}">${key}</label></li>`;
    }
    info += '</ul></div></div>';

    return info;
}