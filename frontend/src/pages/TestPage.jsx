import React from "react";
//import testmulti and language switcher components
import MyComponent from "../components/TestMulti";
import LanguageSwitcher from "../components/LanguageSwitcher";

function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <MyComponent />
      <LanguageSwitcher />
    </div>
  );
}

export default TestPage;
