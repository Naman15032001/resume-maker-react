import * as documentActions from "./actions";
import { v4 as uuidv4 } from 'uuid';

export const setDocument = (skincd) => {

    return {
        type: documentActions.SET_SKIN,
        payload: {
            id: uuidv4(),
            skincd: skincd
        }
    }

}

export const updateDocument = (skincd) => {

    return {
        type: documentActions.UPDATE_SKIN,
        payload: {
            skincd: skincd
        }
    }
}