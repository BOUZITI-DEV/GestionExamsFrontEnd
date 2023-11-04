import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import "../CSS/main.css";

const SchedulerComponent = () => {
  const outletData = useOutletContext()
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedulerData, setSchedulerData] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [id, setSId] = useState(3);

  useEffect(() => {
    setSchedulerData(outletData.loginResponse.appointments)
  }, []);


  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = prevDate.getMonth();
      const prevYear = prevDate.getFullYear();
      return new Date(prevYear, prevMonth - 1, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 2;
      const nextYear = prevDate.getFullYear();
      return new Date(nextYear, nextMonth - 1, 1);
    });
  };
  const convoStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
    marginLeft: '4px'
  };
  return (
    <div>
      <div>
        <div style={convoStyle}>
          <h1>{currentDate.toLocaleDateString(undefined, { day: "numeric", month: 'long', year: "numeric" })}</h1> {/* Affichage du jour de la date actuelle */}
          <div class='col-1'></div>
          <button class='btn btn-block btnStyle col-2' onClick={handlePrevMonth}>Mois précédent</button>
          <div class='col-1'></div>
          <button class='btn btn-block btnStyle col-2' onClick={handleNextMonth}>Mois suivant</button>
        </div>

        <Scheduler data={schedulerData}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
          />
          <MonthView />
          <DayView
            startDayHour={8}
            endDayHour={18}
          />
          <Appointments />
        </Scheduler>
      </div>
    </div>
  );
};

export default SchedulerComponent;