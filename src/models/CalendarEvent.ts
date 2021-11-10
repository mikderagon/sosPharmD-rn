type CalendarEvent = {
  id: string;
  archived: boolean;
  userId: string;
  startTime: string;
  endTime: string;
  year: number;
  month: number;
  day: number;
};

export default CalendarEvent;
