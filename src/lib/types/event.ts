export interface Event {
  id: number;
  type: string;
  code: string;
  name: string;
  description: string;
  campusCode: string;
  openRegistration: string;
  closedRegistration: string;
  status: string;
}

export interface EventRegistration {
  type: string;
  name: string;
  identifier: string;
  address: string;
  accountNumber?: string;
  code: string;
  eventCode: string;
  eventName: string;
  sessionCode: string;
  sessionName: string;
  status: string;
  otherRegister?: { name: string; address: string }[];
  registeredBy?: string;
}

export interface EventSession {
  id: number;
  code: string;
  name: string;
  eventCode: string;
  description: string;
  time: string;
  maxSeating: number;
  availableSeats: number;
  registeredSeats: number;
  scannedSeats: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EventResponse {
  type: string;
  name: string;
  identifier: string;
  accountNumber: string;
  code: string;
  registeredBy: string;
  updatedBy: string;
  status: string;
}
