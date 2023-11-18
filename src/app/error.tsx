'use client';

import { Result, Row } from 'antd';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        color: 'red',
      }}
    >
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link className=" bg-teal-700 text-white px-3 py-2" href="/">
            Back Home
          </Link>
        }
      />
    </Row>
  );
};

export default ErrorPage;
