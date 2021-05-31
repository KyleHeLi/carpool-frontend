import React from "react";

// import "../css/style.css";

const NotMatch = () => {
  return (
    <div className="page-wrap">
      <main className="article-content" id="maincontent">
        <h1>
          <div className="subhead">404 Error</div>
        </h1>
        <h2>Sorry, we can’t seem to find what you’re looking for.</h2>
        <p>
          You've landed on a URL that doesn't seem to exist on CSS-Tricks.
          Here's some options:
        </p>
        <ul>
          <li>
            If you think this is an error on our part, please{" "}
            <a href="https://css-tricks.com/contact/">let us know</a>.
          </li>
          <li>
            You could try a search up ↗️ there in the header, that should turn
            up whatever you were looking for.
          </li>
          <li>
            If you'd like to just browse, head over to the{" "}
            <a href="https://css-tricks.com/archives/">articles page</a>.
          </li>
        </ul>
      </main>
    </div>
  );
};

export default NotMatch;
