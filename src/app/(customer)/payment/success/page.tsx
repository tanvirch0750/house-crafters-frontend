'use client';

import { Result } from 'antd';
import { useRouter } from 'next/navigation';

const PaymentSuccessPage = () => {
  const router = useRouter();

  return (
    <Result
      status="success"
      title="Payment is successfull!"
      subTitle="Thank you for trusting us"
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
    />
  );
};

export default PaymentSuccessPage;
