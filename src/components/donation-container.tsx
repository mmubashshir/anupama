import Image from 'next/image';

import UPIOptions from './upi-options';

function DonationContainer() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <Image
          className="h-auto w-full"
          src="/donation-desktop-frame.svg"
          alt=""
          width={1000}
          height={1000}
          draggable={false}
        />
      </div>

      {/* Mobile */}
      <div className="flex flex-col items-center rounded-lg bg-[#1B1818] md:hidden">
        <Image
          className="h-auto w-full"
          src="/donation-mobile-frame.svg"
          alt=""
          width={500}
          height={500}
          draggable={false}
        />
        <UPIOptions />
        <div className="mt-10 h-2 w-full rounded-b-lg bg-[#E73030]" />
      </div>
    </>
  );
}

export default DonationContainer;
