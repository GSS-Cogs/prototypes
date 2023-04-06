import Head from "next/head";
import Image from "next/image";
// import styles from "@/styles/Home.module.scss";

// import LinksAndSearch from "../components/LinksAndSearch";
// import TopicSection from "../components/TopicSection";
import Masthead from "../components/Masthead/Masthead";

export default function Home() {
  return (
    <>
      <Masthead
        heading="A better way to connect with government data"
        leadParagraph="data.gov.uk is bringing together data from across the UK government and devolved administrations, providing new ways to give you the data you need."
      ></Masthead>

      {/* <LinksAndSearch links={links} /> */}
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          {/* <TopicSection /> */}
        </main>
      </div>
    </>
  );
}
