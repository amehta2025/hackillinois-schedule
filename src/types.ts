export type Location = { //defines a rule for  what location must look like
  description: string;
  latitude: number;
  longitude: number;
};

export type Event = {
  eventId: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  locations: Location[];
  sponsor: string;
  eventType: string;
  points: number;
  isStaff: boolean;
  isPrivate: boolean;
  isAsync: boolean;
  isPro: boolean;
  isMandatory: boolean;
  displayOnStaffCheckIn: boolean;
  mapImageUrl: string;
  exp: number;
  menu: string[];
};