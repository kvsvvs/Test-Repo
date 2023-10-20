import "./globals.css";
import Providers from "../redux/provider";

export default function RootLayout({ children }) {
  return (
    <>
      <Providers>
        <div>{children}</div>
      </Providers>
    </>
  );
}
