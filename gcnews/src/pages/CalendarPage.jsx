// CalendarPage.jsx
import { useOutletContext } from 'react-router-dom';
import Calendar from '../components/Calendar';

export default function CalendarPage() {
  // ✨ useOutletContext에서 today 객체 받기
  const { year, month, data, onDateClick, selectedDate, setYear, setMonth, today } = useOutletContext();

  return (
    <div className="calendar-container">
      {/* <h1 className="calendar-page-title"></h1> */} {/* 현재 비어있으므로 주석 처리 또는 제거 가능 */}
      <Calendar
        year={year}
        month={month}
        data={data}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
        setYear={setYear}
        setMonth={setMonth}
        today={today} // ✨ Calendar 컴포넌트로 today 정보 전달
      />
    </div>
  );
}