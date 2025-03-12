export type TWorkExperience = {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
};

export type TEducation = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
};

export type TContactDetails = {
  phoneNumber?: string;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
};

export type TProfileDetails = {
  bio?: string;
  profileImage?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
};
