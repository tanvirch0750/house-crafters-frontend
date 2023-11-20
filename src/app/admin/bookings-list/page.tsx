'use client';
import { ReloadOutlined } from '@ant-design/icons';

import ActionBar from '@/components/ui/ActionBar/ActionBar';
import HCTable from '@/components/ui/Table/HCTable';
import { useDebounced } from '@/hooks/useDebounced';

import HCModal from '@/components/ui/Modal/HCModal';
import {
  useBookingsQuery,
  useCacelBookingMutation,
  useFinishBookingMutation,
} from '@/redux/api/bookingApi';
import { useAddNotificationMutation } from '@/redux/api/notificationApi';
import { responseMessage } from '@/utils/responseMessage';
import { Button, Input, message } from 'antd';
import { useState } from 'react';

const BookingListPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [cancelOpen, setCancelOpen] = useState<boolean>(false);
  const [finishOpen, setFinishOpen] = useState<boolean>(false);
  const [reminderOpen, setReminderOpen] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<any>(null);

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }
  const { data, isLoading } = useBookingsQuery({ ...query });
  const [cacelBooking] = useCacelBookingMutation();
  const [finishBooking] = useFinishBookingMutation();
  const [addNotification] = useAddNotificationMutation();

  const bookings = data?.bookings;
  const meta = data?.meta;

  const cancelHandler = async () => {
    message.loading('Cancelling.....');
    try {
      const data = {
        bookingId: bookingData?.id,
        paymentId: bookingData?.payment.id,
      };

      const res = await cacelBooking(data);
      if (res) {
        setCancelOpen(false);
        responseMessage(res, 'Booking cancel Successfully');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const finishHandler = async () => {
    message.loading('Completing.....');
    try {
      const data = {
        bookingId: bookingData?.id,
        paymentId: bookingData?.payment.id,
      };

      const res = await finishBooking(data);
      if (res) {
        setFinishOpen(false);
        responseMessage(res, 'Booking completed Successfully');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const reminderHandler = async () => {
    message.loading('Sending reminder...');
    try {
      const data = {
        userId: bookingData?.userId,
        readStatus: false,
        message: `Reminder: We will provided this ${bookingData?.service?.serviceName} on this date: ${bookingData?.date}, time: ${bookingData?.slot?.startTime}`,
        type: 'reminder',
      };

      const res = await addNotification(data);
      if (res) {
        setReminderOpen(false);
        responseMessage(res, 'Reminder send Successfully');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: 'Service Name',
      dataIndex: ['service', 'serviceName'],
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Time',
      dataIndex: ['slot', 'startTime'],
    },
    {
      title: 'User',
      dataIndex: ['user', 'email'],
    },
    {
      title: 'Time',
      dataIndex: ['slot', 'startTime'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },

    {
      title: 'Action',
      render: function (data: any) {
        return (
          <div className="flex items-center">
            <Button
              style={{
                margin: '0px 5px',
              }}
              className="bg-red-700 flex items-center"
              onClick={() => {
                setCancelOpen(true);
                setBookingData(data);
              }}
              type="primary"
            >
              cancel
            </Button>
            <Button
              style={{
                margin: '0px 5px',
              }}
              className="bg-orange-700 flex items-center"
              onClick={() => {
                setReminderOpen(true);
                setBookingData(data);
              }}
              type="primary"
            >
              Reminder
            </Button>
            <Button
              onClick={() => {
                setFinishOpen(true);
                setBookingData(data);
              }}
              type="primary"
              className="flex items-center bg-teal-700"
              danger
            >
              Confirm
            </Button>
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div>
      <ActionBar title="Services List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: '20%',
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="flex items-center">
          {/* <Link href="/admin/service/create">
            <Button type="primary" className="bg-hcOrange-base">
              Create
            </Button>
          </Link> */}
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: '0px 5px' }}
              className=" bg-teal-700 flex items-center"
            >
              Reset
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <HCTable
        loading={isLoading}
        columns={columns}
        dataSource={bookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <HCModal
        title="Cancel Booking"
        isOpen={cancelOpen}
        closeModal={() => setCancelOpen(false)}
        handleOk={() => cancelHandler()}
      >
        <p className="my-5">Do you want to cancel this booking?</p>
      </HCModal>
      <HCModal
        title="Confirmed Booking"
        isOpen={finishOpen}
        closeModal={() => setFinishOpen(false)}
        handleOk={() => finishHandler()}
      >
        <p className="my-5">Do you want to complete this booking?</p>
      </HCModal>
      <HCModal
        title="Send Reminder"
        isOpen={reminderOpen}
        closeModal={() => setReminderOpen(false)}
        handleOk={() => reminderHandler()}
      >
        <p className="my-5">Do you want to send the reminder?</p>
      </HCModal>
    </div>
  );
};

export default BookingListPage;
