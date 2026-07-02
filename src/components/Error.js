import {
    errorEl,
    errorTextEl,
    Display_Time
} from '../global.js';

const renderError = (message = 'something be wrong') => {
    errorEl.classList.add('error--visible');
    errorTextEl.innerText = message;

    setTimeout(() => {
        errorEl.classList.remove('error--visible');
    }, Display_Time);
}

export default renderError;