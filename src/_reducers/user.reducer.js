import {
  FETCH_USERS,
  FETCH_USER,
  USER_ERROR,
  USER_SUCCESS,
  USER_LOADING,
  USER_UNLOADING,
  FILE_SIZE_ERROR
} from '../_constants';

const INITIAL_STATE = { all: [] };

export const user = function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USERS:
      return { ...state, all: action.payload, userDetail: null, userError: '', userSuccess: false, userLoading: false, fileSizeError: false }

    case FETCH_USER:
      return { ...state, userDetail: action.payload, userError: '', userSuccess: false, userLoading: false, fileSizeError: false }

    case USER_ERROR:
      return { ...state, userDetail: null, userError: action.payload, userSuccess: false, userLoading: false, fileSizeError: false };

    case USER_SUCCESS:
      return { ...state, userDetail: null, userError: '', userSuccess: true, userLoading: false, fileSizeError: false };

    case USER_LOADING:
      return { ...state, userDetail: null, userError: '', userSuccess: false, userLoading: true, fileSizeError: false };

    case USER_UNLOADING:
      return { ...state, userDetail: null, userError: '', userSuccess: false, userLoading: false, fileSizeError: false };

    case FILE_SIZE_ERROR:
      return { ...state, userDetail: null, userError: '', userSuccess: false, userLoading: false, fileSizeError: true };

    default:
      return state;
  }
}
