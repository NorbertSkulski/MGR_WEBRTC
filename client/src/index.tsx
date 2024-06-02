import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";


axios.defaults.baseURL= String(process.env.REACT_APP_API_URL);

if (process.env.NODE_ENV === 'development') {
  axios.defaults.withCredentials = true;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onSuccess: (registration) => {console.log("Success"); registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:"key"})},
  onUpdate: (registration) => {console.log("Update")},
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
