// @/src/hooks/useDataList.js
import { useState, useEffect } from "react";

const sortByDate = (data) => {
  console.log(data);
  if (data === undefined) {
    return data;
  }
  return data.sort(function (a, b) {
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

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);

  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useDataList = (data, page, rowsPerPage, sortBy) => {
  const [sortedData, setSortedData] = useState([]);
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (data !== undefined) {
      const range = calculateRange(data, rowsPerPage);
      setTableRange([...range]);

      const slice = sliceData(data, page, rowsPerPage);
      setSlice([...slice]);

      setTotalResults(data.length);
    }
  }, [data, sortedData, setTableRange, page, setSlice, sortBy]);

  return { slice, range: tableRange, totalResults };
};

export default useDataList;
