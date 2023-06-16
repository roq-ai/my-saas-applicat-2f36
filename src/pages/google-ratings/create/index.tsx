import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createGoogleRating } from 'apiSdk/google-ratings';
import { Error } from 'components/error';
import { googleRatingValidationSchema } from 'validationSchema/google-ratings';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BusinessInterface } from 'interfaces/business';
import { UserInterface } from 'interfaces/user';
import { getBusinesses } from 'apiSdk/businesses';
import { getUsers } from 'apiSdk/users';
import { GoogleRatingInterface } from 'interfaces/google-rating';

function GoogleRatingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GoogleRatingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGoogleRating(values);
      resetForm();
      router.push('/google-ratings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GoogleRatingInterface>({
    initialValues: {
      rating: 0,
      comment: '',
      response: '',
      business_id: (router.query.business_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: googleRatingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Google Rating
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="rating" mb="4" isInvalid={!!formik.errors?.rating}>
            <FormLabel>Rating</FormLabel>
            <NumberInput
              name="rating"
              value={formik.values?.rating}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.rating && <FormErrorMessage>{formik.errors?.rating}</FormErrorMessage>}
          </FormControl>
          <FormControl id="comment" mb="4" isInvalid={!!formik.errors?.comment}>
            <FormLabel>Comment</FormLabel>
            <Input type="text" name="comment" value={formik.values?.comment} onChange={formik.handleChange} />
            {formik.errors.comment && <FormErrorMessage>{formik.errors?.comment}</FormErrorMessage>}
          </FormControl>
          <FormControl id="response" mb="4" isInvalid={!!formik.errors?.response}>
            <FormLabel>Response</FormLabel>
            <Input type="text" name="response" value={formik.values?.response} onChange={formik.handleChange} />
            {formik.errors.response && <FormErrorMessage>{formik.errors?.response}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<BusinessInterface>
            formik={formik}
            name={'business_id'}
            label={'Select Business'}
            placeholder={'Select Business'}
            fetcher={getBusinesses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'google_rating',
  operation: AccessOperationEnum.CREATE,
})(GoogleRatingCreatePage);
