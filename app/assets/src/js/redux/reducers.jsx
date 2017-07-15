import { combineReducers } from 'redux';

import {
    UPDATE_TIMETABLE,
    FILTER_TOGGLE_CHECKBOX, FILTER_CHANGE_KEYWORD,
    SELECT_ITEM, SELECT_ITEMS,
    GENERATE_RESULT
} from './actions';

const timetable = combineReducers({
    items: (state = [], action) => {
        switch (action.type) {
        case UPDATE_TIMETABLE:
            return action.data;
        default:
            return state;
        }
    },
    selected: (state = {}, action) => {
        const newSelected = Object.assign({}, state);
        switch (action.type) {
        case SELECT_ITEM:
            if (action.checked) {
                newSelected[action.id] = true;
            } else {
                delete newSelected[action.id];
            }
            return newSelected;
        case SELECT_ITEMS:
            action.ids.forEach((id) => {
                newSelected[id] = true;
            });
            return newSelected;
        default:
            return state;
        }
    },
    result: (state = null, action) => {
        switch (action.type) {
        case GENERATE_RESULT:
            return action.src;
        default:
            return state;
        }
    }
});

const filter = combineReducers({
    day: (state = {
        '08-04': true,
        '08-05': true,
        '08-06': true
    }, action) => {
        switch(action.type) {
        case FILTER_TOGGLE_CHECKBOX:
            return Object.assign({}, state, {
                [action.name]: !state[action.name]
            });
        default:
            return state;
        }
    },
    stage: (state = {
        '#FA3D56': true,
        '#FF88B4': true,
        '#39CDFE': true,
        '#B1DD00': true,
        '#FFDF33': true,
        '#00C858': true,
        '#FB3CA6': true,
        '#FF783B': true,
        '#51D3F8': true
    }, action) => {
        switch(action.type) {
        case FILTER_TOGGLE_CHECKBOX:
            return Object.assign({}, state, {
                [action.name]: !state[action.name]
            });
        default:
            return state;
        }
    },
    keyword: (state = '', action) => {
        switch(action.type) {
        case FILTER_CHANGE_KEYWORD:
            return action.word;
        default:
            return state;
        }
    }
});

export default combineReducers({
    timetable,
    filter,
});
