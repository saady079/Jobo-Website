import {
    state
} from '../global.js';

const storageJobItems = localStorage.getItem('bookmarkJobItems');
if(storageJobItems){
    state.bookmarkJobItems = JSON.parse(storageJobItems);
}