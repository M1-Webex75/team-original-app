import React, { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase";

const DemoTemp2 = () => {
  const [posts, setPosts] = useState([]);
  const [titeles, setTiteles] = useState([]);
  const [texts, setTexts] = useState([]);

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
      setTiteles(posts.map((post) => post.titele || ""));
      setTexts(posts.map((post) => post.text || ""));
    }
  }, [posts]);

  const updatePosts = async () => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id) {
        // Firestoreのデータを更新
        await setDoc(doc(db, "posts", posts[i].id), {
          titele: titeles[i],
          text: texts[i],
          timestamp: serverTimestamp(),
        });
      } else {
        console.error("The post doesn't have an id");
      }
    }
  };

  return (
    <div>
      <h1>React + Firebase Firestore: DemoTemp2</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <p>
            {post.titele}, {post.text}
          </p>
          <label>
            Titele:
            <input
              type="text"
              value={titeles[index] || ""}
              onChange={(e) => {
                const newTiteles = [...titeles];
                newTiteles[index] = e.target.value;
                setTiteles(newTiteles);
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
    </div>
  );
};

export default DemoTemp2;
