import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../firebase";
import { Link } from "react-router-dom"; // React RouterのLinkコンポーネントをインポート

const DemoTemp1 = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setPosts(posts);
      console.log("データの読み取りに成功しました: ", posts); // データの読み取り成功を確認
    });

    // クリーンアップ関数で監視を解除
    return () => unsub();
  }, []);

  return (
    <div>
      <h1>React + Firebase Firestore: DemoTemp1</h1>
      {posts.map((post, index) => (
        <div key={index}>
          {/* pタグをLinkコンポーネントで囲み、クリックしたときにdemo-temp2に移動するようにする */}
          <Link to="/demo-temp2">
            {post.titele}, {post.text},{" "}
            {new Date(post.timestamp.seconds * 1000).toLocaleString()}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DemoTemp1;
