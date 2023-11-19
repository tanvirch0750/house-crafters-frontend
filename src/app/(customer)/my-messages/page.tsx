'use client';

import ActionBar from '@/components/ui/ActionBar/ActionBar';
import HCLoading from '@/components/ui/Loading/HCLoading';
import {
  useNotificationsQuery,
  useUpdateAllNotificationMutation,
} from '@/redux/api/notificationApi';
import { Alert, Button, Space } from 'antd';

function MyMessagePage() {
  const { data, isLoading } = useNotificationsQuery({});

  const [updateAllNotification, { isLoading: updateLoading }] =
    useUpdateAllNotificationMutation();

  const handleUpdateLoading = async () => {
    await updateAllNotification({});
  };

  if (isLoading) {
    return <HCLoading />;
  }

  const notifications = data?.notifications?.slice()?.reverse();

  function formatDateTime(originalDateString: string) {
    const originalDate = new Date(originalDateString);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'BST', // Assuming your original string is in UTC
    });

    return dateFormatter.format(originalDate);
  }

  return (
    <div>
      <ActionBar title="My Messages">
        <div className="flex items-center">
          <Button
            type="primary"
            className="bg-hcOrange-base"
            disabled={updateLoading}
            onClick={handleUpdateLoading}
          >
            Mark them as all read
          </Button>
        </div>
      </ActionBar>
      <Space direction="vertical" style={{ width: '100%' }}>
        {
          // @ts-ignore
          notifications?.map((noti) => {
            return (
              <Alert
                key={noti?.id}
                message={`Date: ${formatDateTime(noti?.createdAt)}`}
                description={noti?.message}
                type={noti?.readStatus === false ? 'info' : 'success'}
              />
            );
          })
        }
        {/* <Alert
          message="Success Text"
          description="Success Description Success Description Success Description"
          type="success"
        />
        <Alert
          message="Info Text"
          description="Info Description Info Description Info Description Info Description"
          type="info"
        /> */}
      </Space>
    </div>
  );
}

export default MyMessagePage;
