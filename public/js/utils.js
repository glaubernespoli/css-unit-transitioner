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

export function getNumber(strVal) {
    return Math.round((parseFloat(strVal) + Number.EPSILON) * 100) / 100;
}