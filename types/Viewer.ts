import { Home } from './Home';

export interface Viewer {
  login: string;
  userId: string; // Unique user identifier
  name: string;
  accountType?: string[]; // The type of account for the logged-in user.
  homes?: Home[]; // All homes visible to the logged-in user
  home?: Home;
}
