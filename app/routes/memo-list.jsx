import React, { useState } from "react";
import { Link } from "@remix-run/react";
import PullDown from "./pulldown";
import { useNavigate } from "react-router-dom";

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>template</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.title}>
            <td>
              <Link to={item.linkTo}>{item.title}</Link>
            </td>
            <td>{item.date}</td>
            <td>{item.template}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const sampleData = [
  {
    title: "○✕商事 ES",
    date: "2024/6/30",
    template: "就活",
    linkTo: "/empty-page",
  },
  {
    title: "△△データ ES",
    date: "2024/7/10",
    template: "就活",
    linkTo: "/empty-page",
  },
  {
    title: "ライブに行った",
    date: "2024/6/25",
    template: "日記",
    linkTo: "/empty-page",
  },
  {
    title: "1日寝た",
    date: "2024/6/26",
    template: "日記",
    linkTo: "/empty-page",
  },
];

const makeDisplayData = (data, option) => {
  if (option === "") {
    return data;
  } else {
    return data.filter((item) => item.template === option);
  }
};

export default function Index() {
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <h1>メモ一覧</h1>
      <button onClick={() => navigate("/calender")}>Calender</button>
      <button>Memo List</button>
      <div>
        <PullDown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        ></PullDown>
      </div>

      <div className="memos-table">
        <Table data={makeDisplayData(sampleData, selectedOption)}></Table>
      </div>
    </>
  );
}
