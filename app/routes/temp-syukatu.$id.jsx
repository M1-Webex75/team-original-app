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
import styleTemp from "../style-temple.css?url";

export const links = () => [{ rel: "stylesheet", href: styleTemp }];

const TempSyukatu = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(db, "posts", id));
      const postData = { id: postDoc.id, ...postDoc.data() };
      setPost(postData);
      setTitle(postData.title || "");
      setText1(postData.text1 || "");
      setText2(postData.text2 || "");
      setText3(postData.text3 || "");
      setText4(postData.text4 || "");
      setDate(
        postData.date ? postData.date.toDate().toISOString().split("T")[0] : ""
      );
      setFields(
        postData.fields
          ? postData.fields.map((text, index) => ({
              text,
              name: `text${index}`,
            }))
          : []
      );
    };
    fetchPost();
  }, [id]);

  const addField = () => {
    setFields([...fields, { text: "", name: `text${fields.length}` }]);
  };

  const handleFieldChange = (index, event) => {
    const values = [...fields];
    values[index].text = event.target.value;
    setFields(values);
  };

  const updatePost = async () => {
    if (post.id) {
      const updatedData = {};
      if (title !== post.title) {
        updatedData.title = title;
      }
      if (text1 !== post.text1) {
        updatedData.text1 = text1;
      }
      if (text2 !== post.text2) {
        updatedData.text2 = text2;
      }
      if (text3 !== post.text3) {
        updatedData.text3 = text3;
      }
      if (text4 !== post.text4) {
        updatedData.text4 = text4;
      }
      if (
        date !==
        (post.date ? post.date.toDate().toISOString().split("T")[0] : "")
      ) {
        updatedData.date = Timestamp.fromDate(new Date(date));
      }
      if (fields !== post.fields) {
        updatedData.fields = fields.map((field) => field.text);
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
          <h2>就活</h2>
        </div>
        <div className="return-button">
          <Link to="/demo-temp1">戻る</Link>
        </div>
      </div>

      {post && (
        <div>
          <div className="post-title-temp">
            <p>{post.title}</p>
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
          <div className="label-component">
            <label>
              ES:
              <input
                className="textbox"
                type="text"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
              />
            </label>
            <label>
              ガクチカ:
              <input
                className="textbox"
                type="text"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </label>
            <label>
              企業分析:
              <input
                className="textbox"
                type="text"
                value={text3}
                onChange={(e) => setText3(e.target.value)}
              />
            </label>
            <label>
              面接で聞かれたこと:
              <input
                className="textbox"
                type="text"
                value={text4}
                onChange={(e) => setText4(e.target.value)}
              />
            </label>
          </div>
          <div className="add-label-set">
            {fields.map((field, index) => (
              <div key={index}>
                <label className="add-label">
                  {field.name}:
                  <input
                    className="add-textbox"
                    type="text"
                    value={field.text}
                    onChange={(e) => handleFieldChange(index, e)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="foot-button">
        <button className="updata-button" onClick={updatePost}>
          更新
        </button>
        <button className="add-button" onClick={addField}>
          追加
        </button>
      </div>
      {message && <div>{message}</div>}
    </div>
  );
};

export default TempSyukatu;
