export default interface Event {
  id?: string;
  title: string;
  UserId: string;
  minExperience: string;
  startTime: string;
  endTime: string;
  interestedLocums: number[]; // User Ids
  acceptedLocums: number[];
  year: number;
  month: number;
  day: number;
  interested?: boolean;
};
