import React from "react";
import PullDown from "./pulldown";

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
            <td>{item.title}</td>
            <td>{item.date}</td>
            <td>{item.template}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const sampleData = [
  { title: "○✕商事 ES", date: "2024/6/30", template: "就活" },
  { title: "△△データ ES", date: "2024/7/10", template: "就活" },
  { title: "ライブに行った", date: "2024/6/25", template: "日記" },
  { title: "1日寝た", date: "2024/6/26", template: "日記" },
];

const makeDisplayData = (data, option) => {
  if (option === "") {
    return data;
  } else {
    return data.filter((item) => item.template === option);
  }
};

export default function Index() {
  return (
    <>
      <h1>メモリストのページです</h1>
      <div>
        <PullDown></PullDown>
      </div>

      <div className="memos-table">
        <Table data={makeDisplayData(sampleData, "就活")}></Table>
      </div>
    </>
  );
}
