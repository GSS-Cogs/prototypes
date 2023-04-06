import { useEffect, useState } from "react";

function cookiePreferenceSet() {
  if (
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("cookies_preferences_set="))
  ) {
    return true;
  } else {
    return false;
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function bannerAccept() {
  setCookie("cookies_preferences_set", "true", 365);
  document.getElementById("cookie-banner").style.display = "none";
}

function bannerReject() {
  document.getElementById("cookie-banner").style.display = "none";
}

export default function CookieBanner() {
  useEffect(() => {
    if (!cookiePreferenceSet()) {
      document.getElementById("cookie-banner").style.display = "block";
    }
  });

  return (
    <div
      className="govuk-cookie-banner"
      id="cookie-banner"
      data-nosnippet
      role="region"
      aria-label="Cookies on data.gov.uk"
      style={{ display: "none" }}
    >
      <div className="govuk-cookie-banner__message govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-cookie-banner__heading govuk-heading-m">
              Cookies on data.gov.uk
            </h2>

            <div className="govuk-cookie-banner__content">
              <p className="govuk-body">
                We use some essential cookies to make this service work.
              </p>
              <p className="govuk-body">
                We'd also like to use analytics cookies so we can understand how
                you use the service and make improvements.
              </p>
            </div>
          </div>
        </div>

        <div className="govuk-button-group">
          <button
            onClick={() => bannerAccept()}
            value="accept"
            type="button"
            name="cookies"
            className="govuk-button"
            data-module="govuk-button"
          >
            Accept analytics cookies
          </button>
          <button
            onClick={() => bannerReject()}
            value="reject"
            type="button"
            name="cookies"
            className="govuk-button"
            data-module="govuk-button"
          >
            Reject analytics cookies
          </button>
          <a className="govuk-link" href="/cookies">
            View cookies
          </a>
        </div>
      </div>
    </div>
  );
}
