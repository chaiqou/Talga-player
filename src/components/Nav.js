import React from "react";

import ContainedButtons from "../UI/Button";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1 id="siteName">ტალღა </h1>
      <ContainedButtons
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
    </nav>
  );
};

export default Nav;
