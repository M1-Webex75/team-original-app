import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase";
import { Link, useParams } from "react-router-dom";

const TempNikki = () => {
  const { id } = useParams(); // 選択したデータのIDを取得
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(db, "posts", id));
      const postData = { id: postDoc.id, ...postDoc.data() };
      setPost(postData);
      setTitle(postData.title || "");
      setText(postData.text || "");
    };
    fetchPost();
  }, [id]);

  const updatePost = async () => {
    if (post.id) {
      // Firestoreのデータを更新
      await setDoc(doc(db, "posts", post.id), {
        title: title,
        text: text,
        timestamp: serverTimestamp(),
      });
      setMessage("更新が正しく行われました");
      setTimeout(() => setMessage(""), 3000);
    } else {
      console.error("The post doesn't have an id");
    }
  };

  return (
    <div>
      <h1>日記</h1>
      <Link to="/demo-temp1">戻る</Link>

      {post && (
        <div>
          <p>
            {post.title}, {post.text}
          </p>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Text:
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
      )}
      <button onClick={updatePost}>更新</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default TempNikki;
