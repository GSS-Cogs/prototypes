import { useState, useEffect } from "react";

function filterData(objects, searchText) {
  const results = [];

  for (const obj of objects) {
    // give weight to different parameters
    const titleScore = obj.title
      .toLowerCase()
      .includes(searchText.toLowerCase())
      ? 2
      : 0;
    const descriptionScore = obj.description
      ?.toLowerCase()
      .includes(searchText.toLowerCase())
      ? 1
      : 0;
    const totalScore = titleScore + descriptionScore;
    obj.score = totalScore;
    if (totalScore > 0) {
      results.push(obj);
    }
  }

  return results;
}

const useFilterData = (data, searchText = "") => {
  // this will most likely get replaced once we have an api to call from
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const tempFilteredData = filterData(data, searchText);
    setFilteredData(tempFilteredData);
  }, [data, searchText]);

  return filteredData;
};

export default useFilterData;
