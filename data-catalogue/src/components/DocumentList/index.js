import React, { useEffect, useState } from "react";
import useDataList from "@/hooks/useDataList";
import useSortData from "@/hooks/useSortData";

import { MdRssFeed } from "react-icons/md";
import Pagination from "../Pagination";
import Dropdown from "../Dropdown";

function DocumentListItem(props) {
  function makeWordBold(str, word) {
    var regex = new RegExp(`(${word})`, "gi");
    var bolded = str.split(regex).map((part, index) => {
      if (part.toLowerCase() === word.toLowerCase()) {
        return <b key={index}>{part}</b>;
      } else {
        return part;
      }
    });
    return bolded;
  }
  const boldedDescription =
    props?.description &&
    makeWordBold(props?.description?.split(".")[0] + ".", props.searchText);
  return (
    <li className="govuk-grid-row gem-c-document-list__item">
      <div className="gem-c-document-list__item-side govuk-grid-column-two-thirds">
        <a
          className="gem-c-document-list__item-title gem-c-document-list__item-title--context govuk-link"
          href={props.id}
        >
          {props.title}
        </a>
        <p className="gem-c-document-list__item-description">
          {boldedDescription}
        </p>
      </div>
      <div className="gem-c-document-list__item-side govuk-grid-column-one-third">
        <ul
          className="gem-c-document-list__item-metadata"
          style={{ textAlign: "right" }}
        >
          <li className="gem-c-document-list__tag-outer">
            <strong className="gem-c-document-list__tag-inner govuk-tag--blue">
              {props?.theme}
            </strong>
          </li>
          <li className="gem-c-document-list__publisher">
            <time dateTime={props.modified}>{props?.creator}</time>
          </li>
          <li className="gem-c-document-list__attribute">
            <time dateTime={props.modified}>
              Updated: {formatDate(props.modified)}
            </time>
          </li>
        </ul>
      </div>
    </li>
  );
}

function formatDate(date) {
  const d = new Date(date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return d
    .toLocaleDateString("en-GB", options)
    .replace(",", "")
    .replace(/( AM| PM)/g, (m) => m.trim().toLowerCase());
}

export default function DocumentList({ items, searchText, sortBy, setSortBy }) {
  const sortedData = useSortData(items, sortBy, searchText);
  const [page, setPage] = useState(1);
  const { slice, range, totalResults } = useDataList(
    sortedData,
    page,
    20,
    sortBy
  );

  const changePage = (index) => {
    const newPageIndex = page + index;
    if (newPageIndex > 0 && newPageIndex <= range.length) {
      setPage(newPageIndex);
    }
  };

  const changeSortBy = (e) => {
    const tempSortBy = e.target.value;
    setSortBy(tempSortBy);
  };

  return (
    <>
      <div className="gem-c-document-header">
        <h3 className="gem-c-document-header__results">
          {/* Showing 1 to {datasets.length < 10 ? datasets.length : 10} of{" "} */}
          {totalResults} results
        </h3>
        <div
          style={{
            display: "flex",
          }}
        >
          <MdRssFeed className="gem-c-document-header__icon" />
          <a className="gem-c-document-header__link govuk-link" href={"#"}>
            Subscribe to feed
          </a>
        </div>
      </div>
      <Dropdown
        options={[
          { value: "alphabetical", name: "Alphabetical" },
          { value: "date", name: "Release Date" },
          { value: "relevance", name: "Relevance" },
        ]}
        onChange={changeSortBy}
        value={sortBy}
      />
      <ul className="gem-c-document-list">
        {slice.map((item, index) => {
          return (
            <DocumentListItem {...item} key={index} searchText={searchText} />
          );
        })}
      </ul>
      <Pagination
        totalPages={range.length}
        page={page}
        changePage={changePage}
      />
    </>
  );
}
