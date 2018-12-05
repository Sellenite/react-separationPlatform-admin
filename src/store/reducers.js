import { SAVE_REGISTER_INFO } from './actions.js';

export default function(state = {}, action) {
    switch (action.type) {
        case SAVE_REGISTER_INFO:
            return { registerInfo: action.registerInfo }
        default:
            return state
    }
}