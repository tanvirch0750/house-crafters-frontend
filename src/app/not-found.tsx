import { Result, Row } from 'antd';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link className=" bg-teal-700 text-white px-3 py-2" href="/">
            Back Home
          </Link>
        }
      />
    </Row>
  );
};

export default NotFoundPage;
