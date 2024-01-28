type Role = "patient" | "doctor";

type PocketBaseFields = {
  id?: string;
  created?: string;
  updated?: string;
};
type User = PocketBaseFields & {
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  username: string;
  role: Role;
};

type Message = PocketBaseFields & {
  text: string;
  user: string;
  expand?: {
    user: User;
  };
};

type Exercise = PocketBaseFields & {
  category?: string;
  description: string;
  equipment?: string[];
  instructions?: string[];
  name: string;
  primary_muscles?: string[];
  secondary_muscles?: string[];
  variations_on?: string[];
  video?: string;
  owner?: string;
  expand?: {
    owner: User;
  };
};
