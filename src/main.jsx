import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./redux/reducer/rootReducer";
//todo tạo ra store tổng của ứng dụng
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
