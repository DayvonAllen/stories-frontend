import Head from "next/head";
export default function Layout({
    title,
    keywords,
    description,
    children,
    categories,
  }) {
  
    return (
      <div className={`flex flex-col min-h-screen h-screen"`}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
        </Head>
      </div>
    );
  }
  
  Layout.defaultProps = {
    title: "",
    description:
      "",
    keywords: ``,
  };
  