import axios from 'axios';
import queryString from 'query-string';
import { GoogleRatingInterface, GoogleRatingGetQueryInterface } from 'interfaces/google-rating';
import { GetQueryInterface } from '../../interfaces';

export const getGoogleRatings = async (query?: GoogleRatingGetQueryInterface) => {
  const response = await axios.get(`/api/google-ratings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGoogleRating = async (googleRating: GoogleRatingInterface) => {
  const response = await axios.post('/api/google-ratings', googleRating);
  return response.data;
};

export const updateGoogleRatingById = async (id: string, googleRating: GoogleRatingInterface) => {
  const response = await axios.put(`/api/google-ratings/${id}`, googleRating);
  return response.data;
};

export const getGoogleRatingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/google-ratings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGoogleRatingById = async (id: string) => {
  const response = await axios.delete(`/api/google-ratings/${id}`);
  return response.data;
};
