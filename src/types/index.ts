export type EventType = 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'cultural' | 'tech' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  department: string;
  type: EventType;
  startAt: string;
  endAt: string;
  venue: string;
  capacity: number;
  registeredCount: number;
  images: string[];
  tags: string[];
  isPublished?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  profilePic?: string;
  department?: string;
  year?: number;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  status: 'registered' | 'attended' | 'cancelled';
  timestamp: string;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image?: string;
}

export interface EventFilters {
  department?: string;
  type?: EventType;
  search?: string;
  startDate?: string;
  endDate?: string;
}
