export default function Search() {
  return (
    <div
      className="gem-c-search govuk-!-display-none-print  gem-c-search--on-white"
      data-module="gem-toggle-input-class-on-focus"
      data-gem-toggle-input-class-on-focus-module-started="true"
    >
      <div className="gem-c-search__item-wrapper">
        <input
          enterKeyHint="search"
          className="gem-c-search__item gem-c-search__input js-class-toggle"
          id="search-main-1e4f581b"
          name="q"
          title="Search"
          type="search"
          defaultValue=""
        />
        <div className="gem-c-search__item gem-c-search__submit-wrapper">
          <button
            className="gem-c-search__submit"
            type="submit"
            data-module="gem-track-click"
            enterKeyHint="search"
          >
            Search
            <svg
              className="gem-c-search__icon"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx="12.0161"
                cy="11.0161"
                r="8.51613"
                stroke="currentColor"
                strokeWidth="3"
              ></circle>
              <line
                x1="17.8668"
                y1="17.3587"
                x2="26.4475"
                y2="25.9393"
                stroke="currentColor"
                strokeWidth="3"
              ></line>
            </svg>
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
