import * as delegator from './delegator.js';

/**
 * Triggers an event when the unit button is clicked.
 */
$('div.unit-wrapper button').click(e => {
    delegator.unitButtonClicked(e);
});

/**
 * Triggers an event when one of the range boxes are clicked.
 */
$('div.unit-range-box').click(e => {
    delegator.rangeBoxClicked(e);
});

/**
 * Triggers an event when one of the text inputs for the range values loses focus, be it by focusout or keyup enter.
 */
$('div.unit-range-box input').on('focusout keyup', e => {
    delegator.rangeBoxInputFocusOut(e);
});

/**
 * Triggers an event when the input range bar changes its value.
 */
$('#unit-range').on('input', e => {
    delegator.rangeInputSlided(e);
});