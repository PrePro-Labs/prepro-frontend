import React, { useContext, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import CheckInContext, { CheckInProvider } from "./context/checkInContext";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import ViewCheckIn from "./components/ViewCheckIn";
import EditCheckIn from "./components/EditCheckIn";

const CheckInLog = () => {
  const [editMode, setEditMode] = useState(false);
  const { checkIns, checkInsLoading, getCheckIns } = useContext(CheckInContext);

  useEffect(() => {
    if (!checkIns && !checkInsLoading) getCheckIns();
  }, [checkIns, checkInsLoading]);

  const { date } = useParams();
  const navigate = useNavigate();

  // set the date in params if there isn't one given or if the date is invalid
  useEffect(() => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      navigate(`/checkins/${currentDate}`);
    }
  });

  const selectedDay = checkIns?.find((c) => c.date === date);

  return (
    <Segment>
      {selectedDay && !editMode ? (
        <ViewCheckIn selectedDay={selectedDay} setEditMode={setEditMode} />
      ) : (
        <EditCheckIn
          selectedDay={selectedDay}
          setEditMode={setEditMode}
          date={date}
        />
      )}
    </Segment>
  );
};

const CheckInLogs = () => {
  return (
    <CheckInProvider>
      <CheckInLog />
    </CheckInProvider>
  );
};

export default CheckInLogs;
