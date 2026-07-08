import {
    sortingEl,
    sortingBtnRelevantEl,
    sortingBtnRecentEl,
    state
} from '../global.js';

import renderJobList from './JobList.js';
import renderPageBtns from './pagination.js';

const sortHandler = event => {
    const sortBtnEl = event.target.closest('.sorting__button');
    if (!sortBtnEl) return;

    state.currentPage = 1;
    renderPageBtns();
    
    const recent = sortBtnEl.className.includes('--recent') ? true : false;
    const remActiveBtns = document.querySelector('.sorting__button--active')?.classList.remove('sorting__button--active');
    if (recent) {
        remActiveBtns;
        sortingBtnRecentEl.classList.add('sorting__button--active');
        state.searchJobItems.sort((a, b) => {
            return a.daysAgo - b.daysAgo;
        })
    } else {
        remActiveBtns;
        sortingBtnRelevantEl.classList.add('sorting__button--active');
        state.searchJobItems.sort((a, b) => {
            return a.relevanceScore - b.relevanceScore;
        })
    }
    renderJobList();
}
sortingEl.addEventListener('click', sortHandler);