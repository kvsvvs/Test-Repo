// _app.js
import "../app/globals.css";
import RootLayout from "../app/layout";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
