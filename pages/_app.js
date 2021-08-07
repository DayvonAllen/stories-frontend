import { AuthProvider } from "context/AuthContext";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
