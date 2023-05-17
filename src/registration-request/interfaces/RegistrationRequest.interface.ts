export interface RegistrationRequest {
    name: string;
    nid: string;
    dob: Date;
    email: string;
    faculty: string;
    phone_number: number;
    accepted: boolean;
    rejected_reason: string;
  }
  