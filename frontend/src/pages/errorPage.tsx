import { Link } from "react-router-dom";

export default function ErrorPage() {

  return (
    <div id="error-page">
      <h1>Sorry, this page is currently not accessible.</h1>
      <Link to="/">Return to home page</Link>
    </div>
  );
}