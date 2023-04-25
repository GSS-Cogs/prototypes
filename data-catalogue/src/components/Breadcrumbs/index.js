import { useRouter } from "next/router";

export default function Breadcrumbs(props) {
  const router = useRouter();
  return (
    <div className="govuk-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {props.items.map((item) => {
          return (
            <li className="govuk-breadcrumbs__list-item" key={item.text}>
              <a
                className="govuk-breadcrumbs__link"
                href={router.basePath + item.href}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
