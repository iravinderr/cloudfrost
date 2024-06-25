import React from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieBanner() {

    const handleAccept = () => {
        document.cookie = "cookieConsent=true; max-age=31536000; path=/";
    }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="myCookieConsent"
      expires={365}
      onAccept={handleAccept}
    >
      This website uses cookies to enhance user experience.
    </CookieConsent>
  );
}
