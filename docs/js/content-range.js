import {
    units
} from './units.js';
import {
    getNumber
} from './utils.js';
import {
    updateSpanAndRangeValuesFor
} from './content-range-inputs.js';

/**
 * Actions to be taken once an unit is selected.
 * @param {string} unit selected unit
 */
export function executeOnUnitSelected(unit) {
    setSliderUnitClassFor(unit);
}

/**
 * Actions to be taken after the unit has been selected.
 * @param {string} unit selected unit
 */
export function executePostUnitSelected(unit) {
    updateRangeValues(unit);
}

/**
 * Actions to be taken once the range input is slided.
 * @param {e} the action event
 */
export function executeOnRangeInputSlided(e) {
    updateCurrentInputValueWhenRangeSlides(e);
}


/**
 * Gets the max range value for the given unit, by taking the current width of the display div in pixels and converting to the given unit.
 * @param {string} unitLabel the unit to get the max range value of
 */
function getMaxRangeValueFor(unitLabel) {
    const unit = units[unitLabel];
    const maxWidth = $('.unit-display-wrapper').width();
    return unitLabel === 'px' ? maxWidth : maxWidth / unit.conversion.px;
}

/**
 * Updates the span tags (min, current and max) of the range values for the given unit once the user selects an unit.
 * @param {string} unit the unit to get the max range value of
 */
function updateRangeValues(unit) {
    const maxWidth = getMaxRangeValueFor(unit);

    $('#unit-range-min').val(0);
    $('#unit-range-current').val(getNumber(maxWidth / 2));
    $('#unit-range-max').val(getNumber(maxWidth));
}

/**
 * Removes any previous class from the range bar and adds one from the selected one.
 * @param {string} unit selected unit
 */
function setSliderUnitClassFor(unit) {
    $('#unit-range').removeClass('cm mm in px pt pc').addClass(unit);
}

/**
 * Updates the CURRENT value as the user slides the range bar.
 * @param {object} e the input event
 */
function updateCurrentInputValueWhenRangeSlides(e) {
    const current = $('#unit-range-current');
    current.val($(e.target).val());
    updateSpanAndRangeValuesFor(current);
}