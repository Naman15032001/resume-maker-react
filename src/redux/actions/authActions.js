import * as authActions from "./actions";

const registerReq = () => {

    return {
        type: authActions.SIGN_UP_REQUEST,
    }

}

const registerFail = (err) => {

    return {
        type: authActions.SIGN_UP_FAILED,
        payload: err.message
    }

}

const registerSuc = () => {

    return {
        type: authActions.SIGN_UP_SUCCESS,
    }

}

const removeError = () => {

    return {
        type: authActions.REMOVE_ERROR,
    }

}

export const register = (userData) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch(registerReq());

        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(async (data) => {
            const res = await firestore.collections('users').doc(data.user.uid).set({
                email: userData.email,
                resumeIds: []
            })
            //suc 
            dispatch(registerSuc())
        }).catch((err) => {
            dispatch(registerFail(err))
            setTimeout(() => {
                dispatch(removeError())
            }, 2000);
        })
    }
}

const signinReq = () => {

    return {
        type: authActions.SIGN_IN_REQUEST,
    }

}

const signinFail = (err) => {

    return {
        type: authActions.SIGN_IN_FAILED,
        payload: err.message
    }

}

const signinSuc = () => {

    return {
        type: authActions.SIGN_IN_SUCCESS,
    }

}


export const signin = (userData) => {

    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch(signinReq());

        const firebase = getFirebase();
        const firestore = getFirestore();

        try {
            const res = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
            dispatch(signinSuc());
        } catch (err) {
            dispatch(signinFail(err))
            setTimeout(() => {
                dispatch(removeError())
            }, 2000);
        }


    }
}

export const signout = () => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: authActions.SIGN_OUT_REQUEST })

        const firebase = getFirebase();

        firebase.auth.signOut().then(() => {
            dispatch({ type: authActions.SIGN_OUT_SUCCESS })
        }).catch((err) => {
            dispatch({ type: authActions.SIGN_OUT_FAILED, payload: err })
            setTimeout(() => {
                dispatch(removeError())
            }, 2000);
        })
    }
}