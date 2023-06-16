import { BusinessInterface } from 'interfaces/business';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GoogleRatingInterface {
  id?: string;
  rating: number;
  comment?: string;
  response?: string;
  business_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  user?: UserInterface;
  _count?: {};
}

export interface GoogleRatingGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  response?: string;
  business_id?: string;
  user_id?: string;
}
