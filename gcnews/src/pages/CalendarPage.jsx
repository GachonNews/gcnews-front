import { useOutletContext } from 'react-router-dom';
import Calendar from '../components/Calendar';
import CalendarGrid from '../components/CalendarGrid';

export default function CalendarPage() {
  const { year, month, data, onDateClick, selectedDate } = useOutletContext(); // ✅ 꼭 이렇게

  return (
    <div className="calendar-container">
      <h1 className="calendar-page-title"></h1>
      <Calendar
        year={year}
        month={month}
        data={data}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
      />
    </div>
  );
}