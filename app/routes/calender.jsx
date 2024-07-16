import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import timeGridPlugin from "@fullcalendar/timegrid";
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
import "../style-calender.css";

const language = "ja";
export default function Index() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          title: data.title,
          start: data.date.toDate().toISOString().split("T")[0],
          color:
            data.template === "就活"
              ? "blue"
              : data.template === "日記"
              ? "green"
              : "red",
        });
      });
      setEvents(posts);
    });

    // クリーンアップ関数で監視を解除
    return () => unsub();
  }, []);

  return (
    <>
      <div className="header-section">
        <div className="app-title">
          <h1>メモカレ</h1>
        </div>
        <button className="calender-button">Calender</button>
        <button
          className="memolist-button"
          onClick={() => navigate("/demo-temp1")}
        >
          Memo List
        </button>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          locale={language}
          headerToolbar={{
            // カレンダーヘッダー部分
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          // イベントを指定
          events={events}
        />
      </div>
    </>
  );
}
