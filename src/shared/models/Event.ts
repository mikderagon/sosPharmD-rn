export default interface Event {
  id?: string;
  archived?: boolean;
  title: string;
  UserId: string;
  minExperience: string;
  startTime: string;
  endTime: string;
  interestedLocums: string[]; // User Ids
  acceptedLocums: string[];
  refusedLocums: string[];
  year: number;
  month: number;
  day: number;
  interested?: boolean;
};
