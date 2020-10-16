import { combineReducers } from 'redux';
import message from './message_reducer';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    message,
    auth: authReducer,
  errors: errorReducer
});

export default rootReducer;


