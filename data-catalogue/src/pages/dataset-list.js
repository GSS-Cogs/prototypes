import Breadcrumbs from "../components/Breadcrumbs";
import Search from "@/components/Search";
import DocumentList from "@/components/DocumentList";

import datasets from "../data/rawData.json";

export default function DatasetList() {
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
        {/* <Search /> */}
        <div className="govuk-grid-row">
          <div className="govuk-width-container">
            <DocumentList items={datasets.results.bindings} />
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
