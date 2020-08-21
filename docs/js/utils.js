/**
 * Triggers an error message for the user.
 * @param {object} errorOrigin the object whose generated the error, thus to be added the .error class
 * @param {string} errorMsg the error message to be shown to the user.
 */
export function triggerError(errorOrigin, errorMsg) {
    const errorField = $('#error');

    errorOrigin.addClass('error');
    errorField.html(`<span>${errorMsg}</span>`);
    errorField.slideDown(300)
        .delay(4000)
        .slideUp(300, () => {
            errorOrigin.removeClass('error');
            errorField.empty();
        });

}

/**
 * Converts a string value into a number, with a maximum of 2 digits.
 * @param {string} strVal the number in string format
 */
export function getNumber(strVal) {
    return Math.round((parseFloat(strVal) + Number.EPSILON) * 100) / 100;
}

/**
 * Get the current active unit.
 */
export function getActiveUnit() {
    return $('div.unit-wrapper').find('.active');
}