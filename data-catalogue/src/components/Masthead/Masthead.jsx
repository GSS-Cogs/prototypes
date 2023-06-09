import Button from "../Button";
import { useRouter } from "next/router";

export default function Masthead(props) {
  const router = useRouter();
  return (
    <div className="app-masthead" style={{ "--masthead-colour": props.colour }}>
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h1 className="govuk-caption-m app-masthead__caption">
              {props.caption}
            </h1>
            <h1 className="govuk-heading-xl app-masthead__title">
              {props.heading}
            </h1>
            <p className="app-masthead__description">{props.leadParagraph}</p>
            {props.children}
          </div>
        </div>

        <Button text="Explore data" href={router.basePath + "/dataset-list"} />
        <div>
          <Button
            text="Explore json data"
            href={router.basePath + "/dataset-list-json"}
          />
        </div>
      </div>
    </div>
  );
}
