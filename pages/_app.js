// _app.js
import "../app/globals.css";
import RootLayout from "../app/layout";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </RootLayout>
  );
}

export default MyApp;
