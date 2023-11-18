import { Row, Space, Spin } from 'antd';

const HCLoading = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
      }}
    >
      <Space>
        <Spin tip="Loading" className="text-teal-700" size="large"></Spin>
      </Space>
    </Row>
  );
};

export default HCLoading;
