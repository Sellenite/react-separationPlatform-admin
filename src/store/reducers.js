import { SET_COUNT_STATUS } from './actions.js';

export default function(state = {}, action) {
    switch (action.type) {
        case SET_COUNT_STATUS:
            return { countStatus: action.countStatus }
        default:
            return state;
    }
}