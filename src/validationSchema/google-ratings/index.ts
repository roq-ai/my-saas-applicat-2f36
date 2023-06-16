import * as yup from 'yup';

export const googleRatingValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  comment: yup.string(),
  response: yup.string(),
  business_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
