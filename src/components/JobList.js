import {
    pageSize_items,
    jobDetailsContentEl,
    spinnerJobDetailsEl,
    jobListSearchEl,
    Base_Api,
    getData,
    state,
    jobListBookmarksEl
} from '../global.js';

import renderSpinner from './Spinner.js';
import renderJobDetail from './JobDetails.js';
import renderError from './Error.js';

const renderJobList = (whichJobList = 'search') => {
    
    const jobListEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;
    jobListEl.innerHTML = '';

    let jobItems;

    whichJobList === 'search' ?
        jobItems = state.searchJobItems.slice(state.currentPage * pageSize_items - pageSize_items, state.currentPage * pageSize_items) :
        jobItems = state.bookmarkJobItems;        

    jobItems.forEach(jobItem => {
        const jobItemHtml = `
            <li class="job-item ${state.activeJobItem.id === jobItem.id && 'job-item--active'}">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(b => b.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>`;
        jobListEl.insertAdjacentHTML('beforeend', jobItemHtml);
    });
}

const jobItemHandler = async event => {
    event.preventDefault();
    // Focusing on job items as a selector:
    const eventCase = event.target;
    const jobItemEl = eventCase.closest('.job-item');

    // Activate job items in this event:
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    jobItemEl.classList.add('job-item--active');

    jobDetailsContentEl.innerHTML = '';
    renderSpinner('jobList');

    const jobId = jobItemEl.children[0].getAttribute('href');

    const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
    state.activeJobItem = allJobItems.find(item => item.id == jobId);

    history.pushState(null, '', `/joboWeb.html#${jobId}`);

    try {
        const data = await getData(`${Base_Api}/jobs/${jobId}`);
        renderSpinner('jobList');

        const { jobItem: info } = data;
        renderJobDetail(info);

    } catch (error) {
        renderSpinner('jobList');
        renderError();
    }
}

jobListSearchEl.addEventListener('click', jobItemHandler);
jobListBookmarksEl.addEventListener('click', jobItemHandler);

export default renderJobList;