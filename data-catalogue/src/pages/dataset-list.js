import React, { useState } from "react";
import { useRouter } from "next/router";

import Breadcrumbs from "../components/Breadcrumbs";
import Search from "@/components/Search";
import DocumentList from "@/components/DocumentList";

// import datasets from "../data/rawData.json";
import useFilterData from "@/hooks/useFilterData";

import { useLazyQuery, useQuery, gql } from "@apollo/client";
import client from "../apollo-client";

export async function getServerSideProps({ query }) {
  const searchText = query.query;

  const { data } = await client.query({
    query: gql`
      query textQuery($query_string: String) {
        endpoint {
          catalog(id: "http://gss-data.org.uk/catalog/datasets") {
            catalog_query(search_string: $query_string) {
              datasets {
                id
                title
                description
                modified
              }
            }
          }
        }
      }
    `,
    variables: { query_string: searchText },
  });

  const initData = data.endpoint.catalog.catalog_query.datasets;
  return {
    props: {
      initialDatasets: initData,
    },
  };
}

export default function DatasetList({ initialDatasets }) {
  const [sortBy, setSortBy] = useState("date");
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const data = useFilterData(initialDatasets, searchText);
  const router = useRouter();

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const searchHandler = () => {
    // this will most likely be replaced once we can call to the api
    setSortBy("relevance");
    setSearchText(inputText);
    router.push(`/dataset-list?query=${inputText}`);
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
              searchText={searchText}
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
