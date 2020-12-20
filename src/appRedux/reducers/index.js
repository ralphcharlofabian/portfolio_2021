import { combineReducers } from "redux";
import  { actionTypes } from '../constants/actionTypes';
import {userList, availableCandidate, columnsFromBackend, taskHistoryList} from '../../common/constants/miscellaneous';

const initialState = {
  userList: userList,
  availableCandidate: availableCandidate,
  columnsFromBackend: columnsFromBackend,
  taskHistoryList: taskHistoryList
}

function userListReducer(state = initialState, action) {
  let { type, payload } = action || {};
  console.log(payload,'payload')
  switch (type) {
    case actionTypes.UPDATE_PERSONEL_LIST:
      return {
        ...state,
        userList: payload,
      }
    
      case actionTypes.UPDATE_CANDIDATE_LIST:
        return {
          ...state,
          availableCandidate: payload,
        }

    
    default:
    return state
  }
}

function taskListReducer (state = initialState, action) {
  let { type, payload } = action || {};
  //console.log(payload,'payload')
  switch (type) {
    case actionTypes.UPDATE_TASK_LIST:
      return {
        ...state,
        columnsFromBackend: payload,
      }
    
    default:
    return state
  }
}

function taskListHistoryReducer (state = initialState, action) {
  let { type, payload } = action || {};
  console.log(payload,'payload')
  switch (type) {
    case actionTypes.UPDATE_TASK_LIST_HISTORY:
      return {
        ...state,
        taskHistoryList: payload,
      }
    
    default:
    return state
  }
}

const rootReducer = combineReducers({
  userListReducer,
  taskListReducer,
  taskListHistoryReducer,
});

export default rootReducer;