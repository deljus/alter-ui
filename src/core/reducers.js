import { REQUEST } from './constants';

const requestState = {
    loading: false,
    error: false,
    errorText: '',
    lastActions: '',
};

const request = (state = requestState, action) => {
    switch (action.type) {
        case REQUEST.START_REQUEST:
            return { loading: true, error: false, errorText: '', lastActions: '' };

        case REQUEST.SUCCESS_REQUEST:
            return { loading: false, error: false, errorText: '', lastActions: '' };

        case REQUEST.ERROR_REQUEST:
            return { loading: false, error: true, errorText: action.errText, lastActions: action.lastActions };

        default:
            return state;
    }
};

export { request };