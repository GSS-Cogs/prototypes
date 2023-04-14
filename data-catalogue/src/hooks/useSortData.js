import { useState, useEffect } from "react";

const useSortData = (data, sortBy) => {
  const [sortedData, setSortedData] = useState([]);

  const sortByDate = (data) => {
    return data.sort(function (a, b) {
      return new Date(b.modified.value) - new Date(a.modified.value);
    });
  };

  useEffect(() => {
    // expand this when new sort by options are needed
    if (sortBy === "date") {
      const sortedByDate = sortByDate(data);
      setSortedData(sortedByDate);
    }
  }, [data, sortBy]);

  return { sortedData };
};

export default useSortData;
