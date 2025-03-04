import { Link } from "@remix-run/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const meta = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (SPA Mode)</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/guides/spa-mode"
            rel="noreferrer"
          >
            SPA Mode Guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <div>
        <Link to="/memo-list" className="navigation__link">
          メモ一覧
        </Link>
      </div>
      <div>
        <Link to="/demo-temp1" className="">
          demo-temp1
        </Link>
      </div>
      <div>
        <Link to="/demo-temp2" className="">
          demo-temp2
        </Link>
      </div>
      <div>
        <Link to="/temp-syukatu" className="">
          temp-syukatu
        </Link>
      </div>
    </div>
  );
}
