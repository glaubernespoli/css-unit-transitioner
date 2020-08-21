import {
    getActiveUnit
} from './utils.js';

/**
 * Actions to be taken once the unit button is clicked.
 * @param {object} e the action event
 */
export function executeOnUnitButtonClicked(e) {
    setCurrentActiveUnit($(e.target));
}

/**
 * Adds .active class to the button when clicked, and removes from previous .active one.
 * @param {object} button the button element
 */
function setCurrentActiveUnit(button) {
    const active = getActiveUnit();
    active.removeClass('active');
    button.addClass('active');
}