import {
    pageSize_items,
    paginationEl,
    paginationBtnBackEl,
    paginationNumberBackEl,
    paginationBtnNextEl,
    paginationNumberNextEl,
    state
} from '../global.js';

import renderJobList from './JobList.js';

const renderPageBtns = () => {
    state.currentPage > 1 ?
        paginationBtnBackEl.classList.remove('pagination__button--hidden') :
        paginationBtnBackEl.classList.add('pagination__button--hidden');

    (state.searchJobItems.length - state.currentPage * pageSize_items) <= 0 ?
        paginationBtnNextEl.classList.add('pagination__button--hidden') :
        paginationBtnNextEl.classList.remove('pagination__button--hidden');

    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;
    paginationBtnBackEl.blur();
    paginationBtnNextEl.blur();
}

const paginationHandler = event => {
    const pagingBtn = event.target.closest('.pagination__button');
    if (!pagingBtn) return;

    const nextPage = pagingBtn.className.includes('pagination__button--next') ? true : false;
    nextPage ? state.currentPage++ : state.currentPage--;

    renderPageBtns();
    renderJobList();
}

paginationEl.addEventListener('click', paginationHandler);

export default renderPageBtns;