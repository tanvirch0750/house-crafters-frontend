'use client';

import AddReview from '@/components/bookingPage/AddReview';
import AllReviews from '@/components/bookingPage/AllReviews';
/* eslint-disable jsx-a11y/alt-text */

import DatePicker from '@/components/bookingPage/DatePicker';
import HCLoading from '@/components/ui/Loading/HCLoading';
import { useRemainingServiceQuery } from '@/redux/api/availableServiceApi';
import { useGetAverageRatingQuery } from '@/redux/api/reviewAndRatingApi';
import { isLoggedIn } from '@/services/auth.service';
import { getTodaysDate } from '@/utils/getTodaysDate';
import { Rate } from 'antd';
import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */
type IDProps = {
  params: any;
};

function BookServiceSinglePage({ params }: IDProps) {
  const { serviceId } = params;
  const isUserLoggedIn = isLoggedIn();
  const [date, setDate] = useState(() => getTodaysDate());

  const paramData = {
    id: serviceId,
    date: date,
  };

  const { data, isLoading, refetch } = useRemainingServiceQuery(paramData);
  const { data: avgRatData, isLoading: avgRatLoading } =
    useGetAverageRatingQuery(serviceId);

  useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date, refetch]);

  if (isLoading || avgRatLoading) {
    return <HCLoading />;
  }

  console.log(avgRatData);

  const { serviceName, service, price, slots, totalServiceProvided } =
    data?.data;

  return (
    <div className="bg-white">
      <div className="pb-24 md:pb-32 lg:pb-3 mx-auto w-full max-w-7xl px-5 md:px-10 pt-24 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          <div className="bg-teal-50 rounded-md p-4 h-[400px]">
            <img
              src={service?.imageUrl}
              alt="service image"
              className="w-full h-full rounded-md"
            />
          </div>
          <div>
            <span className="text-white bg-hcOrange-base px-4 py-1 rounded-md text-lg font-semibold mb-4">
              {service?.serviceCategory?.categoryName}
            </span>
            <h2 className="font-bold text-3xl text-teal-950 md:text-3xl mt-6">
              {serviceName || 'Service Name'}
            </h2>

            <p className="text-teal-700 text-2xl font-semibold mt-2">
              Price: {price} BDT
            </p>

            <div className="mt-4 text-teal-950 text-lg font-bold">
              <span>Average Rating:</span>
              <Rate
                disabled
                defaultValue={avgRatData?.data || 5}
                className="ml-4"
              />
            </div>

            <p className="text-teal-950 text-lg mt-4">
              <span className="font-bold">Description:</span>{' '}
              {service?.description}
            </p>

            <p className="text-teal-950 text-lg mt-4">
              <span className="font-bold">Total Service Provided:</span>{' '}
              <span className="text-hcOrange-base font-semibold">
                {totalServiceProvided}
              </span>
            </p>
          </div>
        </div>

        <DatePicker
          setDate={setDate}
          date={date}
          slots={slots}
          data={data}
          // @ts-ignore
          refetch={refetch}
        />

        {/* <div className="mt-16">
            <BookForm />
          </div> */}
        <div className="mt-16">
          <h2 className="text-xl text-teal-950 mb-4 font-bold">
            Customer Reviews:
          </h2>
          {isUserLoggedIn && <AddReview serviceId={serviceId} />}
          <AllReviews serviceId={serviceId} />
        </div>
      </div>
    </div>
  );
}

export default BookServiceSinglePage;
