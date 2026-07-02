import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../global.js';

const renderSpinner = elName => {
    const elCheck = elName === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    elCheck.classList.toggle('spinner--visible');
}

export default renderSpinner;