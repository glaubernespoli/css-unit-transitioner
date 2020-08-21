import * as contentInfo from './content-info.js';
import * as contentRangeBar from './content-range.js';
import * as contentRangeInput from './content-range-inputs.js';

/**
 * Actions to be taken once the unit button is clicked.
 * @param {object} e the action event
 */
export function executeOnUnitButtonClicked(e) {
    updateSelectedContentFor($(e.target).data('unit'));
}
/**
 * Updates the content area for the selected unit element.
 * @param {string} unit the unit whose the content should be displayed.
 */
function updateSelectedContentFor(unit) {
    $('.selected-wrapper')
        .fadeOut(300, () => {
            executeOnFadeOut(unit);
        })
        .fadeIn({
            duration: 300,
            start: () => {
                executeOnFadeIn(unit);
            }
        });
}

/**
 * Actions to be executed during the fadeOut of the main content.
 * @param {string} unit selected unit
 */
function executeOnFadeOut(unit) {
    contentInfo.executeOnUnitSelected(unit);
    contentRangeBar.executeOnUnitSelected(unit);
}

/**
 * Actions to be executed during the start of the fadeIn of the main content.
 * @param {string} unit selected unit
 */
function executeOnFadeIn(unit) {
    contentRangeBar.executePostUnitSelected(unit);
    contentRangeInput.executePostUnitSelected(unit);
}