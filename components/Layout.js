import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {router.pathname !== "/" && !router.pathname.includes("/login") && (
        <Navbar />
      )}
      <div className="relative min-h-screen bg-gray-100">
        {children}
        <Footer />
      </div>
    </div>
  );
}

Layout.defaultProps = {
  title: "",
  description: "",
  keywords: ``,
};
