'use client';

import HCLoading from '@/components/ui/Loading/HCLoading';
import { useGetSingleBookingQuery } from '@/redux/api/bookingApi';
import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';

type IDProps = {
  params: any;
};

const SingleBookingPage = ({ params }: IDProps) => {
  const { bookingId } = params;
  const { data, isLoading, refetch } = useGetSingleBookingQuery({
    bookingId: bookingId,
  });

  if (isLoading) {
    return <HCLoading />;
  }

  const { date, payment, service, status, time, weekDay } = data?.data;

  const items: DescriptionsProps['items'] = [
    {
      label: 'Sevice Name',
      children: service?.serviceName,
    },
    {
      label: 'Booking Status',
      children: status,
    },
    {
      label: 'Date',
      span: { xl: 2, xxl: 2 },
      children: date ? date : '',
    },
    {
      label: 'Time',

      children: time,
    },
    {
      label: 'Price',
      // span: { xl: 2, xxl: 2 },
      children: service?.price,
    },
    {
      label: 'Payment Status',
      span: { xl: 2, xxl: 2 },
      children:
        payment?.paymentStatus === 'notPaid'
          ? 'Not Paid'
          : payment?.paymentStatus === 'rejected'
          ? 'Rejected'
          : 'Paid',
    },
    {
      label: 'Transaction Id',

      children: <>{payment?.transactionId}</>,
    },
    {
      label: 'Week Day',

      children: <>{weekDay}</>,
    },
    {
      label: 'Payment Method',
      span: { xl: 2, xxl: 2 },
      children:
        payment?.paymentMethod === 'online' ? 'Online' : 'Cash On Delivery',
    },
  ];

  return (
    <div className=" pt-7">
      <h2 className="text-center mb-12 text-teal-950 text-2xl font-bold">
        Booking Details
      </h2>
      <Descriptions
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={items}
      />
    </div>
  );
};

export default SingleBookingPage;
