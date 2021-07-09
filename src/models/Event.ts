export default interface Event {
  title: string;
  UserId: string;
  address: string;
  minExperience: string;
  startTime: string;
  endTime: string;
  interestedLocums?: number[]; // User Ids
  acceptedLocums?: number[];
  year: number;
  month: number;
  day: number;
}
