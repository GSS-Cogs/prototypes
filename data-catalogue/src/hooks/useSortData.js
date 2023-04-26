import { useState, useEffect } from "react";

const sortByDate = (data) => {
  const tempData = [...data];
  return tempData.sort(function (a, b) {
    return new Date(b.modified.value) - new Date(a.modified.value);
  });
};

const sortByAlphabetical = (data) => {
  return data.sort(function (a, b) {
    if (a.name.value < b.name.value) {
      return -1;
    }
    if (a.name.value > b.name.value) {
      return 1;
    }
    return 0;
  });
};

function sortByRelevance(objects) {
  const results = [...objects];

  results.sort((a, b) => b.score - a.score);
  return results;
}

const useSortData = (data, sortBy, searchText = "") => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // expand this when new sort by options are needed
    if (sortBy === "date") {
      const sortedByDate = sortByDate(data);
      setSortedData(sortedByDate);
    } else if (sortBy === "alphabetical") {
      const sortedByAlphabetical = sortByAlphabetical(data);
      setSortedData(sortedByAlphabetical);
    } else if (sortBy === "relevance") {
      const sortedByDate = sortByDate(data);
      const sortedData = sortByRelevance(sortedByDate);
      setSortedData(sortedData);
    } else {
      setSortedData(data);
    }
  }, [data, sortBy, searchText]);

  return sortedData;
};

export default useSortData;
