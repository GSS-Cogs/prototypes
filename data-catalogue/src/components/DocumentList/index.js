import { MdRssFeed } from "react-icons/md";

function DocumentListItem(props) {
  return (
    <li className="govuk-grid-row gem-c-document-list__item">
      <div className="gem-c-document-list__item-side govuk-grid-column-two-thirds">
        <a
          className="gem-c-document-list__item-title gem-c-document-list__item-title--context govuk-link"
          href={props.record.value}
        >
          {props.name.value}
        </a>
        <p className="gem-c-document-list__item-description">
          {props?.description?.value.split(".")[0]}
        </p>
      </div>
      <div className="gem-c-document-list__item-side govuk-grid-column-one-third">
        <ul
          className="gem-c-document-list__item-metadata"
          style={{ textAlign: "right" }}
        >
          <li className="gem-c-document-list__tag-outer">
            <strong class="gem-c-document-list__tag-inner govuk-tag--blue">
              {props?.themeName?.value}
            </strong>
          </li>
          <li className="gem-c-document-list__publisher">
            <time dateTime={props.modified.value}>
              {props?.creatorName?.value}
            </time>
          </li>
          <li className="gem-c-document-list__attribute">
            <time dateTime={props.modified.value}>
              Updated: {formatDate(props.modified.value)}
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

export default function DocumentList(props) {
  return (
    <>
      <div className="gem-c-document-header">
        <h3 className="gem-c-document-header__results">
          {/* Showing 1 to {datasets.length < 10 ? datasets.length : 10} of{" "} */}
          {props.items.length} results
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
      <ul className="gem-c-document-list">
        {props.items.map((item) => {
          return <DocumentListItem {...item} />;
        })}
      </ul>
    </>
  );
}
