import { createStore /*configureStore*/ } from 'redux';
import { reducer } from './reducer';
;

export const store = createStore(reducer);