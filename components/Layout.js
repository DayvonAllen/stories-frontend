import AuthContext from "context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {router.pathname !== "/" && !router.pathname.includes("/login") && (
        <Navbar user={user} logout={logout} />
      )}
      <div
        className={`relative min-h-screen ${
          router.pathname.includes("/stories/") &&
          router.pathname !== "/stories/create"
            ? "bg-white"
            : "bg-gray-100"
        }`}
      >
        {React.cloneElement(children, { user })}
        {router.pathname === "/" && <Footer />}
      </div>
    </div>
  );
}

Layout.defaultProps = {
  title: "",
  description: "",
  keywords: ``,
};
