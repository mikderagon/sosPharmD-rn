export interface CalendarEvent {
  title: string;
  location: string;
  minExperience: string;
  startTime: string;
  endTime: string;
  interestedLocums?: number[]; // User Ids
  acceptedLocums?: number[];
}

export interface User {
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  pictureUrl: string;
  year: number;
  educationalInstitution: string;
  type: string;
}
