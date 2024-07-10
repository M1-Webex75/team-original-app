import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import timeGridPlugin from "@fullcalendar/timegrid";

const language = "ja";
export default function Index() {
  const navigate = useNavigate();
  return (
    <>
      <h1>カレンダー</h1>
      <button>Calender</button>
      <button onClick={() => navigate("/memo-list")}>Memo List</button>
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
          events={[
            { title: "TEST1", start: "2024-07-12" },
            { title: "TEST2", start: "2024-07-14" },
            {
              title: "TEST3",
              start: "2024-07-15",
              end: "2024-07-17",
            },
          ]}
        />
      </div>
    </>
  );
}
