import {actionTypes} from '../constants/actionTypes';

export const updatePersonelList = (userList) => ({
    type: actionTypes.UPDATE_PERSONEL_LIST,
    payload: userList
})

export const updateCandidateList = (candidateList) => ({
    type: actionTypes.UPDATE_CANDIDATE_LIST,
    payload: candidateList
})


export const updateTaskList = (taskList) => ({
  type: actionTypes.UPDATE_TASK_LIST,
  payload: taskList 
})