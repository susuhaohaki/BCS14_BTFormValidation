import { combineReducers } from "redux";
import FormReducer from "./FormReducer";

//store tồng ứng dụng
export const rootReducer = combineReducers({
  //nơi sẽ chứa các reducer cho nghiệp vụ (store con)
  formReducer: FormReducer,
});
