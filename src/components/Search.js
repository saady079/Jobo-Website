import {
    sortingBtnRelevantEl,
    sortingBtnRecentEl,
    jobListSearchEl,
    searchInputEl,
    spinnerSearchEl,
    searchFormEl,
    numberEl,
    Base_Api,
    getData,
    state
} from '../global.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPageBtns from './pagination.js';

// -- CONTROLLING SEARCH.BOX
const submitHandler = async event => {
    event.preventDefault();
    jobListSearchEl.innerHTML = '';

    // Validation & get value of input:
    const searchText = searchInputEl.value;
    const patternText = /[0-9]/;
    const validText = patternText.test(searchText);
    if (validText) {
        renderError("incorrect value: number-lock is active;")
        return;
    }

    // Reset sorting buttons:  
    sortingBtnRelevantEl.classList.add('sorting__button--active');
    sortingBtnRecentEl.classList.remove('sorting__button--active');

    searchInputEl.blur();
    renderSpinner('search');

    try {
        const data = await getData(`${Base_Api}/jobs?search=${searchText}`);
        renderSpinner('search');

        const { jobItems } = data;
        state.searchJobItems = jobItems;
        numberEl.textContent = jobItems.length;
        renderJobList();

        state.currentPage = 1;
        renderPageBtns();
    } catch (error) {
        renderSpinner('search');
        renderError();
    }
}

searchFormEl.addEventListener('submit', submitHandler);