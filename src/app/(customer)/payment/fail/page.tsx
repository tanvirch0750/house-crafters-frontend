'use client';

import { Result, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const { Paragraph, Text } = Typography;

const PaymentFailPage = () => {
  const router = useRouter();

  return (
    <Result
      status="error"
      title="Payment Failed"
      subTitle="Please check and modify the information you are giving."
      extra={[
        <button
          className=" px-4 py-2 bg-teal-700 text-white"
          key="button"
          onClick={() => {
            router.push('/my-bookings');
          }}
        >
          My bookings
        </button>,
      ]}
    ></Result>
  );
};

export default PaymentFailPage;
