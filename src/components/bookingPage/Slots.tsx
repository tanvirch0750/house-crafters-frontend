import { useAddBookingMutation } from '@/redux/api/bookingApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { responseMessage } from '@/utils/responseMessage';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  const bookingHandler = async (data: any) => {
    if (isLoading) {
      message.loading('Create Booking');
    }

    try {
      console.log(serviceData);
      const bookingData = {
        date: date,
        userId: userId,
        slotId: data?.id,
        serviceId: serviceData.data?.id,
        paymentMethod: 'cashOnDelivery',
      };
      console.log(bookingData);
      const res = await addBooking(bookingData);

      if (res) {
        setOpen(false);

        responseMessage(res, 'Service Booked Successfully');
        if ('data' in res && res.data) {
          router.push('/my-bookings');
        }
      }
    } catch (err: any) {
      //   console.error(err.message);
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
        title="Book Service"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => bookingHandler(slotData)}
      >
        <p className="my-5">Do you want to book this service?</p>
      </HCModal>
    </div>
  );
}

export default Slots;

{
  /* <div
          key={slot?.id}
          className="p-6 text-center bg-hcOrange-base rounded-lg text-white"
        >
          <p>Start Time: {slot.startTime}</p>
          {/* <p>Team Name: Apollo</p> */
}
// {isUserLoggedIn && role === 'customer' ? (
//   <button
//     className="text-white bg-teal-700 px-16 py-2 mt-2 rounded-md"
//     onClick={() => {
//       setOpen(true);
//       setSlotData(slot);
//     }}
//   >
//     Book Now
//   </button>
// ) : (
//   <button
//     disabled
//     className="text-white bg-teal-700 px-16 py-2 mt-2 rounded-md"
//   >
//     Login first
//   </button>
// )}
// </div> } */

{
  /* <div className="max-w-7xl mx-auto">
<div className="relative group">
  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
  <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
    <svg
      className="w-8 h-8 text-purple-600"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
      ></path>
    </svg>
    <div className="space-y-2">
      <p className="text-slate-800">
        Learn how to make a glowing gradient background!
      </p>
      <a
        href="https://braydoncoyer.dev/blog/tailwind-gradients-how-to-make-a-glowing-gradient-background"
        className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
        target="_blank"
      >
        Read Article →
      </a>
    </div>
  </div>
</div>
</div> */
}
