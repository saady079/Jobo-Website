// -> CONSTANTS
export const Base_Api = 'https://bytegrad.com/course-assets/js/2/api';
export const Display_Time = 5000;
export const pageSize_items = 7;

// -> SELECTORS
export const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
export const errorEl = document.querySelector('.error');
export const errorTextEl = document.querySelector('.error__text');
export const jobDetailsEl = document.querySelector('.job-details');
export const jobDetailsContentEl = document.querySelector(".job-details__content");
export const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
export const jobListSearchEl = document.querySelector(".job-list--search");
export const numberEl = document.querySelector(".count__number");
export const paginationEl = document.querySelector(".pagination");
export const paginationBtnNextEl = document.querySelector(".pagination__button--next");
export const paginationBtnBackEl = document.querySelector(".pagination__button--back");
export const paginationNumberNextEl = document.querySelector(".pagination__number--next");
export const paginationNumberBackEl = document.querySelector(".pagination__number--back");
export const searchFormEl = document.querySelector(".search");
export const searchInputEl = document.querySelector(".search__input");
export const sortingEl = document.querySelector(".sorting");
export const sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
export const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
export const spinnerSearchEl = document.querySelector(".spinner--search");
export const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

// -> HOME
export const check_Refresh_Redirect = () => {
    // Getting information on how to load the page:
    const navigationEntries = performance.getEntriesByType("navigation");

    if (navigationEntries.length > 0) {
        const navigationType = navigationEntries[0].type;
        const targetUrl = "http://127.0.0.1:5501/joboWeb.html";

        // Set page address as default:
        if (navigationType === "reload" && window.location.href !== targetUrl) {
            window.location.href = targetUrl;
        }
    }
}

// -> UTILITY FUNCTION
export const getData = async Url => {
    const response = await fetch(Url);
    const data = await response.json();

    // 4xx 5xx: 
    if (!response.ok) {
        throw new Error(data.description);
    }
    return data;
}

// -> STATE
export const state = {
    searchJobItems: [],
    currentPage: 1,
    activeJobItem: {}
}