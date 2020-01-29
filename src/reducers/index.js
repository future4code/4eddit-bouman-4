import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {postReducer} from './posts'


export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    postReducer
  });
