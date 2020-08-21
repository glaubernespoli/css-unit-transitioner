import * as unitButton from './unit-buttons.js';
import * as mainContent from './content-main.js';
import * as contentRangeInput from './content-range-inputs.js';
import * as rangeSlider from './content-range.js';

/**
 * Actions to be taken once the unit button is clicked.
 * @param {object} e the action event
 */
export function unitButtonClicked(e) {
    unitButton.executeOnUnitButtonClicked(e);
    mainContent.executeOnUnitButtonClicked(e);
}

/**
 * Actions to be taken once one of the range boxes are clicked.
 * @param {object} e the action event
 */
export function rangeBoxClicked(e) {
    contentRangeInput.executeOnRangeBoxClicked(e);
}

/**
 * Actions to be taken once one of the range inputs loses focus.
 * @param {object} e the action event
 */
export function rangeBoxInputFocusOut(e) {
    contentRangeInput.executeOnRangeInputFocusOut(e);
}

/**
 * Actions to be taken once the range input is slided.
 * @param {object} e the action event
 */
export function rangeInputSlided(e) {
    rangeSlider.executeOnRangeInputSlided(e);
}