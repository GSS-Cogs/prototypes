const Dropdown = ({ options, defaultValue, onChange }) => {
  return (
    <div class="govuk-form-group gem-c-document-dropdown__container">
      <label class="govuk-label govuk-!-margin-right-3" for="sort">
        Sort by
      </label>
      <select
        class="govuk-select"
        id="sort"
        name="sort"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option) => {
          return <option value={option.value}>{option.name}</option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
