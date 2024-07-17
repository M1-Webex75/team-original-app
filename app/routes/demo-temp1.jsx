import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  doc,
  setDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import { Link } from "@remix-run/react";
import PullDown from "./pulldown";
import { useNavigate } from "react-router-dom";
import stylesDemoTemp1 from "../style-demo-temp1.css?url";

export const links = () => [{ rel: "stylesheet", href: stylesDemoTemp1 }];

const Table = ({ data, updateTimestamp }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>template</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          let linkPath;
          if (item.template === "就活") {
            linkPath = "temp-syukatu";
          } else if (item.template === "日記") {
            linkPath = "temp-nikki";
          } else {
            linkPath = "demo-temp2";
          }

          return (
            <tr key={item.title}>
              <td>
                <Link
                  to={`/${linkPath}/${item.id}`}
                  onClick={() => updateTimestamp(item.id)}
                >
                  {item.title}
                </Link>
              </td>
              <td onClick={() => updateTimestamp(item.id)}>
                {new Date(item.date.seconds * 1000).toLocaleDateString()}
              </td>
              <td>{item.template}</td>
              <td>
                {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const saveDataToFirebase = async (data) => {
  const docRef = await addDoc(collection(db, "posts"), data);
  console.log("Document written with ID: ", docRef.id);
};

const makeDisplayData = (data, option) => {
  if (option === "") {
    return data;
  } else {
    return data.filter((item) => item.template === option);
  }
};

export default function DemoTemp1() {
  const [selectedOptionFilter, setSelectedOptionFilter] = useState("");
  const [selectedOptionNewMemo, setselectedOptionNewMemo] = useState("");
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortField, setSortField] = useState("timestamp");

  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy(sortField, sortOrder));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(posts);
      console.log("データの読み取りに成功しました: ", posts);
    });

    // クリーンアップ関数で監視を解除
    return () => unsub();
  }, [sortOrder, sortField]);

  // 昇順、降順を切り替える関数
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "desc" ? "asc" : "desc"
    );
  };

  // ソートの基準となるフィールドを切り替える関数
  const toggleSortField = () => {
    setSortField((prevSortField) =>
      prevSortField === "timestamp" ? "date" : "timestamp"
    );
  };

  const updateTimestamp = async (id) => {
    const newTimestamp = Timestamp.now();
    await setDoc(
      doc(db, "posts", id),
      { timestamp: newTimestamp },
      { merge: true }
    );
  };

  return (
    <div>
      <div className="header-section">
        <div className="app-title">
          <h1>メモカレ</h1>
        </div>
        <div className="header-buttons">
          <button
            className="calendar-button"
            onClick={() => navigate("/calendar")}
          >
            Calendar
          </button>
          <button className="memolist-button">Memo List</button>
        </div>
      </div>

      <div className="new-memo-section">
        <h2>新規作成</h2>
        <div className="filter-pulldown">
          <PullDown
            labelText="テンプレートの種類を選択："
            selectedOption={selectedOptionNewMemo}
            setSelectedOption={setselectedOptionNewMemo}
          ></PullDown>
        </div>

        <button
          className="new-memo-button"
          onClick={async () => {
            // 新しいメモのデータ
            const newMemoData = {
              title: "新しいメモのタイトル",
              date: Timestamp.now(),
              template: selectedOptionNewMemo,
              timestamp: Timestamp.now(),
              text: "",
              // 他の必要なフィールド...
            };

            // ページ遷移
            // if (selectedOptionNewMemo === "就活") {
            //   newMemoData.linkTo = "/temp-syukatu";
            //   navigate("/temp-syukatu");
            // } else {
            //   navigate("/demo-temp2");
            // }

            // Firebaseに新しいメモを保存
            await saveDataToFirebase(newMemoData);
          }}
        >
          新規作成
        </button>
      </div>

      {/* メモ一覧 */}
      <div className={"memo-list-section"}>
        <h2>メモ一覧</h2>
        <div className="sort-section">
          ソート：
          <button className="sort-target-button" onClick={toggleSortField}>
            {sortField === "timestamp" ? "Time" : "Date"}
          </button>
          <button className="sort-ascdesc-button" onClick={toggleSortOrder}>
            {sortOrder === "desc" ? "降順" : "昇順"}
          </button>
          <PullDown
            labelText="テンプレートでフィルター："
            selectedOption={selectedOptionFilter}
            setSelectedOption={setSelectedOptionFilter}
          ></PullDown>
        </div>

        <Table
          data={makeDisplayData(posts, selectedOptionFilter)}
          updateTimestamp={updateTimestamp}
        ></Table>
      </div>
    </div>
  );
}
