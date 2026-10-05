/**
 * Represents an event in the system
 */
export interface Event {
  id: number;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
}

/**
 * Represents an attendee in the system
 */
export interface Attendee {
  id: number;
  name: string;
  email: string;
}