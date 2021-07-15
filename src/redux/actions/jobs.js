
export const setPriorityFilter = priority => dispatch => {
    dispatch({ type: 'SET_PRIORITY_FILTER', data: priority });
};

export const setStatusFilter = status => dispatch => {
    dispatch({ type: 'SET_STATUS_FILTER', data: status });
};