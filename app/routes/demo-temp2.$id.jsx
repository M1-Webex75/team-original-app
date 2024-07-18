import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import db from "../firebase";
import { Link, useParams } from "react-router-dom";
import PullDown from "./pulldown";
import styleTemp from "../style-temple.css?url";

export const links = () => [{ rel: "stylesheet", href: styleTemp }];

const TempNo = () => {
  const { id } = useParams(); // 選択したデータのIDを取得
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [selectedOptionNewMemo, setselectedOptionNewMemo] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(db, "posts", id));
      const postData = { id: postDoc.id, ...postDoc.data() };
      setPost(postData);
      setTitle(postData.title || "");
      setText(postData.text || "");
      setDate(
        postData.date ? postData.date.toDate().toISOString().split("T")[0] : ""
      );
    };
    fetchPost();
  }, [id]);

  const updatePost = async () => {
    if (post.id) {
      // Firestoreのデータを更新
      const updatedData = {};
      if (title !== post.title) {
        updatedData.title = title;
      }
      if (text !== post.text) {
        updatedData.text = text;
      }
      if (
        date !==
        (post.date ? post.date.toDate().toISOString().split("T")[0] : "")
      ) {
        updatedData.date = Timestamp.fromDate(new Date(date));
      }
      if (selectedOptionNewMemo !== post.template) {
        updatedData.template = selectedOptionNewMemo;
      }

      if (Object.keys(updatedData).length > 0) {
        updatedData.timestamp = serverTimestamp();
        await setDoc(doc(db, "posts", post.id), updatedData, { merge: true });
        setMessage("更新が正しく行われました");
        setTimeout(() => setMessage(""), 3000);
      }
    } else {
      console.error("The post doesn't have an id");
    }
  };

  return (
    <div>
      <div className="header-section">
        <div className="app-title">
          <h1>メモカレ</h1>
        </div>
        <div className="header-title">
          <h2>未選択</h2>
        </div>
        <div className="return-button">
          <Link to="/demo-temp1">戻る</Link>
        </div>
      </div>

      {post && (
        <div>
          <div className="filter-title-section">
            <div className="filter-pulldown">
              <PullDown
                labelText="テンプレートの種類を選択："
                selectedOption={selectedOptionNewMemo}
                setSelectedOption={setselectedOptionNewMemo}
              ></PullDown>
            </div>
            <div className="post-title">
              <p>{post.title}</p>
            </div>
          </div>
          <div className="label-section">
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
        </div>
      )}
      <div className="foot-button">
        <button className="updata-button" onClick={updatePost}>
          更新
        </button>
      </div>
      <div className="updata-call">{message && <div>{message}</div>}</div>
    </div>
  );
};

export default TempNo;
