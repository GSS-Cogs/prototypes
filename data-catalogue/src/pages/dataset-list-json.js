import React, { useState } from "react";
import { useRouter } from "next/router";

import Breadcrumbs from "../components/Breadcrumbs";
import Search from "@/components/Search";
import DocumentList from "@/components/DocumentList";

import datasets from "../data/rawData.json";
import useFilterData from "@/hooks/useFilterData";

export default function DatasetList() {
  const [sortBy, setSortBy] = useState("date");
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");

  const data = useFilterData(
    processArray(datasets.results.bindings),
    searchText
  );

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const searchHandler = () => {
    // this will most likely be replaced once we can call to the api
    setSortBy("relevance");
    setSearchText(inputText);
  };

  function processArray(arr) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let newObj = {};

      for (let key in obj) {
        if (key === "name") {
          newObj.title = obj[key]?.value;
        } else if (key === "themeName") {
          newObj.theme = obj[key]?.value;
        } else if (key === "dataset") {
          newObj.id = obj[key]?.value;
        } else if (key === "creatorName") {
          newObj.creator = obj[key]?.value;
        } else if (key === "theme" || key === "creator") {
        } else {
          newObj[key] = obj[key]?.value;
        }
      }

      newArr.push(newObj);
    }

    return newArr;
  }

  return (
    <div className="govuk-width-container">
      <Breadcrumbs items={[{ text: "Home", href: "/" }]} />
      <main
        className="govuk-main-wrapper app-main-class"
        id="main-content"
        role="main"
      >
        <div className="govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <h1 className="govuk-caption-xl">Data Explorer</h1>
              <h1 className="govuk-heading-xl">Search dataset catalogue</h1>
            </div>
          </div>
        </div>
        <Search inputHandler={inputHandler} searchHandler={searchHandler} />
        <div className="govuk-grid-row">
          <div className="govuk-width-container">
            <DocumentList
              items={data}
              searchText={searchText}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
