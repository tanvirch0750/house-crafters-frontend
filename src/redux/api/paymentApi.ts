import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const PAYMENT = '/payment';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initiatePayment: build.mutation({
      query: (data) => ({
        url: `${PAYMENT}/initiate-payment/${data.bookingId}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
