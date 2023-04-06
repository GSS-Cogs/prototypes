export default function Masthead(props) {
  return (
    <div className="app-masthead" style={{ "--masthead-colour": props.colour }}>
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h1 className="govuk-heading-xl app-masthead__title">
              {props.heading}
            </h1>
            <p className="app-masthead__description">{props.leadParagraph}</p>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
