export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName?: string;
    lastName?: string;
    userName: string;
    role: string[];
    password: string;
  }
  