export default interface Event {
  id: number;
  title: string;
  UserId: number;
  address: string;
  minExperience: string;
  startTime: string;
  endTime: string;
  interestedLocums?: number[]; // User Ids
  acceptedLocums?: number[];
  year: number;
  month: number;
  day: number;
};
