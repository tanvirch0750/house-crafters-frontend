import { useAddBookingMutation } from '@/redux/api/bookingApi';
import { useProfileQuery } from '@/redux/api/profileApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { responseMessage } from '@/utils/responseMessage';
import { Select, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import HCModal from '../ui/Modal/HCModal';

/* eslint-disable react/no-unescaped-entities */
type props = {
  slots: any;
  data: any;
  date: string;
};

function Slots({ slots, data: serviceData, date }: props) {
  const [open, setOpen] = useState<boolean>(false);
  const [slotData, setSlotData] = useState<string>('');
  const isUserLoggedIn = isLoggedIn();
  const { role, userId } = getUserInfo() as any;
  const [addBooking, { isLoading }] = useAddBookingMutation();
  const router = useRouter();
  const [paymentMethodSelect, setPaymentMethodSelect] =
    useState('cashOnDelivery');

  // @ts-ignore
  const { data: pData } = useProfileQuery();
  const profileData = pData?.profileData;

  const onChange = (value: string) => {
    setPaymentMethodSelect(value);
  };

  const bookingHandler = async (data: any) => {
    if (isLoading) {
      message.loading('Create Booking');
    }

    try {
      const bookingData = {
        date: date,
        userId: userId,
        slotId: data?.id,
        serviceId: serviceData.data?.id,
        paymentMethod: paymentMethodSelect,
      };

      const res = await addBooking(bookingData);

      if (res) {
        setOpen(false);

        responseMessage(res, 'Service Booked Successfully');
        if ('data' in res && res.data) {
          Swal.fire('Thank You', 'Service Booked Successfully', 'success');
          router.push('/my-bookings');
        }
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center mx-auto gap-6">
      {slots?.map((slot: any) => (
        <div key={slot?.id} className="text-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-2 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-center space-x-6">
              <div className="space-y-2 text-center">
                <p className="mb-2">
                  Start time:{' '}
                  <span className="bg-orange-50 px-2 py-1 rounded-md">
                    {slot?.startTime}
                  </span>
                </p>
                <p className="mt-2 text-sm">
                  Team:{' '}
                  <span className="bg-teal-50 px-2 py-1 rounded-md">
                    {slot?.serviceTeam?.teamName}
                  </span>
                </p>
                {isUserLoggedIn && role === 'customer' ? (
                  <div>
                    <button
                      className="text-white bg-teal-700 px-6 py-2 mt-2 rounded-md text-sm"
                      onClick={() => {
                        setOpen(true);
                        setSlotData(slot);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="text-white bg-teal-700 px-16 py-2 mt-2 rounded-md"
                  >
                    Login first
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <HCModal
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => bookingHandler(slotData)}
        confirmLoading={isLoading}
        okText="Confirm Booking"
      >
        <div>
          <h2 className="my-5 text-lg text-teal-700 font-bold">
            Book {serviceData?.data?.service?.serviceName} service
          </h2>
          <div>
            <p>Booking Date:</p>
            <input
              required
              value={date}
              // onChange={onChange}
              className="w-full py-3 px-3 rounded-md border border-gray-100"
              disabled
            />
          </div>
          <div className="mt-4">
            <p>Time:</p>
            <input
              placeholder="Give Your Feedback"
              required
              // @ts-ignore
              value={slotData?.startTime}
              // onChange={onChange}
              disabled
              className="w-full py-3 px-3 rounded-md border border-gray-100"
            />
          </div>
          <div className="mt-4">
            <p>Address:</p>
            <input
              placeholder="Give Your Feedback"
              required
              // value={review}
              // onChange={onChange}
              className="w-full py-3 px-3 rounded-md border border-gray-100"
              value={profileData?.address}
              disabled
            />
          </div>
          <div className="mt-4 mb-4">
            <p>Select Payment Method:</p>
            <Select
              onChange={onChange}
              style={{ width: '100%' }}
              options={[
                { value: 'cashOnDelivery', label: 'Cash On Delivery' },
                { value: 'online', label: 'Online' },
              ]}
            />
          </div>
        </div>
      </HCModal>
    </div>
  );
}

export default Slots;
