import React from "react";
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
    </div>
  );
}

export default MyComponent;
