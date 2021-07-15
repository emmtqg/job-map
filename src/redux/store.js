import { createStore } from 'redux';
import reducer from './reducers/jobs';

const initialState = {
    jobs: {
      priorityFilter: 'test',
      statusFilter: '',
      dateFilter: ''
    }
};

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
export default store;
