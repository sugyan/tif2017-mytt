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
        'hot_stage':      true,
        'heat_garage':    true,
        'smile_garden':   true,
        'doll_factory':   true,
        'sky_stage':      true,
        'festival_stage': true,
        'dream_stage':    true,
        '5g_stage':       true,
        'info_centre':    true,
        'greeting':       false,
        'tgif':           false,
        'ennichi':        false,
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
