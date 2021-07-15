const initialState = {
    priorityFilter: '',
    statusFilter: '',
    dateFilter: ''
};

export default function jobs(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_DATA_SUCCESS': {
        return {
          ...state,
          allJobs: action.data
        };
      }
      case 'SET_PRIORITY_FILTER': {
        return {
          ...state,
          priorityFilter: action.data
        };
      }
      case 'SET_STATUS_FILTER': {
        return {
          ...state,
          statusFilter: action.data,
        };
      }
      default:
        return state;
    }
  }
  