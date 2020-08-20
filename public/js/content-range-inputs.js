import {
    getNumber,
    triggerError
} from './utils.js';

/**
 * Actions to be taken after the unit has been selected.
 * @param {string} unit selected unit
 */
export function executePostUnitSelected(unit) {
    updateRangeDisplayLabelsWhenSelectingUnit();
    updateGrowth();
}

/**
 * Actions to be taken when one the range boxes are clicked.
 * @param {object} e the action event
 */
export function executeOnRangeBoxClicked(e) {
    doExecuteOnRangeBoxClicked(e);
}

/**
 * Actions to be taken when one the range inputs loses focus.
 * @param {object} e the action event
 */
export function executeOnRangeInputFocusOut(e) {
    doExecuteOnRangeInputFocusOut(e);
}

/**
 * Actions to be taken when one the range boxes are clicked.
 * It should hide the span, fade in the input, focus it, disable the self event and enable the input event.
 */
function doExecuteOnRangeBoxClicked(e) {
    const rangeBox = $(e.target);
    rangeBox.children('span').hide();
    rangeBox.children('input').fadeIn(300).select();
    rangeBox.removeClass('clickable').off('click');
    rangeBox.children('input').on('focusout keyup', e => executeOnRangeInputFocusOut(e));
}

/**
 * Actions to be done once one of the input loses focus or the enter key is pressed. 
 * It should hide the input, fade in the span, reenable the click event on the wrapper and disable self.
 * Should also update the values for the span and for the range input.
 */
function doExecuteOnRangeInputFocusOut(e) {
    //ignores any key other than enter key
    if (e.type == 'keyup' && e.keyCode != 13) {
        return;
    }

    const inputElement = $(e.target);
    const parentDiv = inputElement.parent();
    inputElement.hide();
    parentDiv.children('span').fadeIn(300);
    parentDiv.addClass('clickable').click((e) => executeOnRangeBoxClicked(e));
    inputElement.off('focusout keyup');

    updateSpanAndRangeValuesFor(inputElement);

    e.stopImmediatePropagation();
}

/**
 * Updates the growth value to always be 1 once an unit is selected.
 */
function updateGrowth() {
    const growthInput = $('#unit-range-growth');
    growthInput.val(1);
    updateSpanAndRangeValuesFor(growthInput);

}

/**
 * Updates the <span> values of MIN, MAX and CURRENT to be a value of its related <input>, relative to the selected unit.
 */
function updateRangeDisplayLabelsWhenSelectingUnit() {
    updateSpanAndRangeValuesFor($('#unit-range-min'));
    updateSpanAndRangeValuesFor($('#unit-range-max'));
    updateSpanAndRangeValuesFor($('#unit-range-current'));
}

/**
 * Updates the <span> value linked to the given <input> element, as well as the range bar 
 * attributes - min, max, value or step - depending on which input was changed.
 * @param {object} inputElement the input element whose span should be updated
 */
export function updateSpanAndRangeValuesFor(inputElement) {
    const minInput = $('#unit-range-min');
    const currentInput = $('#unit-range-current');
    const maxInput = $('#unit-range-max');
    const growthInput = $('#unit-range-growth');

    let val, minVal, currentVal, maxVal, error;
    switch (inputElement.attr('id')) {
        case minInput.attr('id'):
            val = getNumber(inputElement.val());
            currentVal = getNumber(currentInput.val());
            if (val >= 0 && val <= currentVal) {
                updateSpanAndRangeValues(minInput, 'min');
            } else {
                error = 'Incorrect value: MIN should be >= 0 and <= CURRENT.';
            }
            break;

        case currentInput.attr('id'):
            val = getNumber(inputElement.val());
            minVal = getNumber(minInput.val());
            maxVal = getNumber(maxInput.val());
            if (val >= minVal && val <= maxVal) {
                updateMaxOfMinAndMinOfMax(val);
                updateSpanAndRangeValues(currentInput, 'value');
            } else {
                error = 'Incorrect value: CURRENT should be >= MIN and <= MAX.';
            }
            break;

        case maxInput.attr('id'):
            val = getNumber(inputElement.val());
            currentVal = getNumber(currentInput.val());
            if (val >= currentVal) {
                updateMaxGrowth(maxVal);
                updateSpanAndRangeValues(maxInput, 'max');
            } else {
                error = 'Incorrect value: MAX should be >= CURRENT.';
            }
            break;

        case growthInput.attr('id'):
            const growth = getNumber(growthInput.val());
            maxVal = getNumber(maxInput.val());
            if (growth >= 0 && growth <= maxVal) {
                updateSpanAndRangeValues(growthInput, 'step');
            } else {
                error = 'Incorrect value: GROWTH should be >= 0 and <= MAX.';
            }
            break;

        default:
            break;
    }
    revertInputValueIfSpanNotUpdated(inputElement, error);
}

/**
 * Updates the <span> value and the given attribute with the value provided.
 * @param {object} input the input that contains the value
 * @param {string} attr the attr that should be updated
 */
function updateSpanAndRangeValues(input, attr) {
    const span = input.parent().children('span');
    const rangeInput = $('#unit-range');
    const val = getNumber(input.val());

    span.text(val);
    if (attr == 'value') {
        rangeInput.val(val);
    } else {
        rangeInput.attr(attr, val);
    }
}

/**
 * Updates the max growth value to be the same as max value, as we can't have a GROWTH > MAX.
 * @param {number} val the new max growth value
 */
function updateMaxGrowth(val) {
    $('#unit-range-growth').attr('max', val);
}

/**
 * Every time the current value changes, update the attrs min of MAX and max of MIN to be = CURRENT,
 * as the MIN should be <= CURRENT and MAX should be >= current.
 * @param {number} val the new value for min and max 
 */
function updateMaxOfMinAndMinOfMax(val) {
    $('#unit-range-min').attr('max', val);
    $('#unit-range-max').attr('min', val);
}

/**
 * Revert the value of the <input> element to the previous one in case the user tries to input
 * an invalid value, and shows an error message.
 * @param {object} inputElement the element whose raised the error
 * @param {string} error the error message
 */
function revertInputValueIfSpanNotUpdated(inputElement, error) {
    const span = inputElement.parent().children('span');
    if (inputElement.val() != span.text()) {
        inputElement.val(span.text());
        triggerError(inputElement.parent(), error);
    }
}