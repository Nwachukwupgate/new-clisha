import React from "react";
function Welcome({ welcome }) {
  const teststring = window.location.pathname.slice();
  const route = teststring.split("/").pop();
  let username = localStorage.getItem("username");

  return (
    <div className="welcome my-4 ">
      <span className="text-muted font-weight-bold  text-capitalize">
        hello, {username}!
      </span>
      <h4 className=" text-capitalize mt-3">
        {welcome ?? `Your ${route} overview`}
      </h4>
    </div>
  );
}

export default Welcome;
