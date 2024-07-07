import React, { useState } from "react";
import { Link } from "@remix-run/react";
import PullDown from "./pulldown";
import { useNavigate } from "react-router-dom";

// メモ一覧表の作成
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

// サンプルデータ
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
  const [selectedOptionFilter, setSelectedOptionFilter] = useState("");
  const [selectedOptionNewMemo, setselectedOptionNewMemo] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <h1>メモ一覧</h1>
      {/* カレンダー・メモ一覧切り替えボタン */}
      <div>
        <button onClick={() => navigate("/calender")}>Calender</button>
        <button>Memo List</button>
      </div>

      {/* 新規作成 */}
      <div>
        <h2>新規作成</h2>
        <PullDown
          labelText="テンプレートの種類を選択："
          selectedOption={selectedOptionNewMemo}
          setSelectedOption={setselectedOptionNewMemo}
        ></PullDown>

        <button onClick={() => navigate("/demo-temp2")}>新規作成</button>
      </div>

      {/* メモ一覧 */}
      <div>
        <h2>メモ一覧</h2>
        <PullDown
          labelText="テンプレートでフィルター："
          selectedOption={selectedOptionFilter}
          setSelectedOption={setSelectedOptionFilter}
        ></PullDown>
      </div>
      <div className="memos-table">
        <Table data={makeDisplayData(sampleData, selectedOptionFilter)}></Table>
      </div>
    </>
  );
}
