import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <>
      <h1>カレンダー</h1>
      <button>Calender</button>
      <button onClick={() => navigate("/demo-temp1")}>Memo List</button>
    </>
  );
}
