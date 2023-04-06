import Head from "next/head";
import CookieBanner from "../components/CookieBanner/CookieBanner";
import Layout from "../components/Layout/Layout";

import localFont from "next/font/local";

const gdsTransport = localFont({
  src: [
    {
      path: "../../public/assets/fonts/GDSTransportWebsite.ttf",
      weight: "400",
      style: "normal",
      display: "swap",
    },
  ],
  variable: "--font-grdtransport",
});

import "../../public/govuk-frontend/all.scss";
import "../all.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>data.gov.uk</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <main lang="en" className={gdsTransport.className}>
        <CookieBanner />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </>
  );
}
