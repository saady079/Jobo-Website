import {
    jobDetailsContentEl,
    Base_Api,
    getData,
    state,
} from '../global.js';

import renderSpinner from './Spinner.js';
import renderJobDetail from './JobDetails.js';
import renderError from './Error.js';

const loaderHandler = async () => {
    const id = window.location.hash.substring(1);

    if (id) {
        jobDetailsContentEl.innerHTML = '';
        renderSpinner('jobDetail');
        try {
            const data = await getData(`${Base_Api}/jobs/${id}`);
            renderSpinner('jobDetail');

            const { jobItem: info } = data;
            renderJobDetail(info);

        } catch (error) {
            renderError();
        }
    }
}

window.addEventListener('DOMContentLoaded', loaderHandler);
window.addEventListener('hashchange', loaderHandler);