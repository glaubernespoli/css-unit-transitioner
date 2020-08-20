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
    const active = $('div.unit-wrapper').find('.active');
    if (active.length > 0) {
        $(active[0]).removeClass('active');
    }
    button.addClass('active');
}