import * as contactActions from "../actions/actions";
import initialState from './initialState.json'

const contactReducer = (state = initialState.contact, action) => {
    switch (action.type) {
        case contactActions.SET_CONTACT:
            return {
                ...state,
                contact: action.payload.contact
            }
        case contactActions.UPDATE_CONTACT:
            return {
                ...state,
                contact: action.payload.contact
            }
        default: return state;
    }

}

export default contactReducer