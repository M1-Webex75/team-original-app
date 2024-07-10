import React, { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase";
import { Link } from "react-router-dom";

const DemoTemp2 = () => {
  const [posts, setPosts] = useState([]);
  const [titles, setTitles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const postCollection = await getDocs(collection(db, "posts"));
      setPosts(
        postCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setTitles(posts.map((post) => post.title || ""));
      setTexts(posts.map((post) => post.text || ""));
    }
  }, [posts]);

  const updatePosts = async () => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id) {
        // Firestoreのデータを更新
        await setDoc(doc(db, "posts", posts[i].id), {
          title: titles[i],
          text: texts[i],
          timestamp: serverTimestamp(),
        });
      } else {
        console.error("The post doesn't have an id");
      }
    }
    setMessage("更新が正しく行われました");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      <h1>React + Firebase Firestore: DemoTemp2</h1>
      <Link to="/demo-temp1">Go to DemoTemp1</Link>
      {posts.map((post, index) => (
        <div key={index}>
          <p>
            {post.title}, {post.text}
          </p>
          <label>
            Title:
            <input
              type="text"
              value={titles[index] || ""}
              onChange={(e) => {
                const newTitles = [...titles];
                newTitles[index] = e.target.value;
                setTitles(newTitles);
              }}
            />
          </label>
          <label>
            Text:
            <input
              type="text"
              value={texts[index] || ""}
              onChange={(e) => {
                const newTexts = [...texts];
                newTexts[index] = e.target.value;
                setTexts(newTexts);
              }}
            />
          </label>
        </div>
      ))}
      <button onClick={updatePosts}>更新</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default DemoTemp2;
