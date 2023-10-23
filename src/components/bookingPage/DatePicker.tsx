'use client';

import { Calendar } from 'antd';
import { Dayjs } from 'dayjs';
import Slots from './Slots';

type pro = {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  slots: any;
  data: any;
  date: string;
};

/* eslint-disable @next/next/no-img-element */
// @ts-ignore
function DatePicker({ setDate, slots, data, date, refetch }: pro) {
  console.log(data);

  const onSelect = (newValue: Dayjs) => {
    setDate(newValue.format('YYYY-MM-DD'));
  };

  return (
    <section className="block border-b border-b-gray-200">
      <div className="pb-16 md:pb-16 lg:pb-16 pt-24 w-full">
        <div className="flex items-stretch max-[991px]:min-h-[auto] max-[991px]:w-full max-[991px]:flex-col grid-cols-1 lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
          <div className="max-w-[400px] max-h-[410px] p-6 bg-teal-50 text-center rounded-md">
            <h2 className="font-bold mb-4 text-xl md:text-2xl text-teal-700">
              Select Your Booking Date
            </h2>
            <div>
              <Calendar fullscreen={false} onSelect={onSelect} />
            </div>
          </div>
          <div className="mb-16 w-full">
            <h2 className="text-center mb-12 text-teal-700 text-2xl font-bold">
              {slots?.length === 0 ? (
                <span>
                  No slot is availavle for booking, please select another date
                </span>
              ) : (
                <span>
                  Available Slots for your selected date:{' '}
                  <span className="text-hcOrange-base">{date}</span>
                </span>
              )}
            </h2>
            <Slots slots={slots} data={data} date={date} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatePicker;
