export interface User {
  UserHobby: {
    UserId: number;
    brand: null | string;
    createdAt: string;
    day: null | string;
    favourite_movie: null | string;
    food: null | string;
    game: null | string;
    id: number;
    place: null | string;
    player: null | string;
    singer: null | string;
    updatedAt: string;
  };
  address: null | string;
  birth_date: string;
  birth_place: null | string;
  clishaId: string;
  country: string;
  developer: null | string;
  email: string;
  email_verified_at: string;
  firstname: string;
  gender: string;
  hometown: null | string;
  id: number;
  language: string;
  lastname: string;
  phone: string;
  photo: null | string;
  postcode: null | string;
  referralId: null | string;
  region: string;
  roleId: number;
  status: number;
  username: string;
  vendoConnectStatus: boolean;
  vendoEmail: string;
  prevMonthTaskStatus: boolean;
}

export interface Rank {
  UserId: number;
  balance: number;
  bonus_eligibility: boolean;
  bonus_points: number;
  coinwallet_id: null | string;
  credits: number;
  earned_amount: number;
  id: number;
  position: string;
  rankId: null | number;
  rankName: string;
  total_earned: number;
  total_points: number;
  total_withdraw: number;
}

export interface Timezone {
  time: string;
  today: string;
}

export interface Wallet {
  wallet: any;
  pendings: any;
}

export interface VendoPackage {
  package_level: string;
  packages: string[];
  status: number;
  vqRatio: number;
  vqs: number;
}

export interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

export interface MessageType {
  id: string;
  message_english: string;
  message_deutsch?: string;
  message_french?: string;
  message_portuguese?: string;
}
