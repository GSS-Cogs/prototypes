import React, { useState } from "react";

import Breadcrumbs from "../components/Breadcrumbs";
import Search from "@/components/Search";
import DocumentList from "@/components/DocumentList";

import datasets from "../data/rawData.json";
import useFilterData from "@/hooks/useFilterData";

export default function DatasetList() {
  const [sortBy, setSortBy] = useState("date");
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const data = useFilterData(datasets.results.bindings, searchText);

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const searchHandler = () => {
    // this will most likely be replaced once we can call to the api
    setSortBy("relevance");
    setSearchText(inputText);
  };

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
              searchText={inputText}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
          {/* <div className="govuk-grid-column-one-third">
            <h2 className="govuk-heading-m">Refine Results</h2>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="sort">
                Sort by
              </label>
              <select className="govuk-select" id="sort" name="sort">
                <option value="most_viewed">Most viewed</option>
                <option value="relevance">Relevance</option>
                <option value="updated_newest">Updated (newest)</option>
                <option value="updated_oldest">Updated (oldest)</option>
              </select>
            </div>
            <Checkboxes
              name="organisations"
              title="Organisations"
              items={organisations}
            />
          </div> */}
          <div className="govuk-width-container">
            {/* <div
              className="govuk-grid-row"
            > */}

            {/* </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
