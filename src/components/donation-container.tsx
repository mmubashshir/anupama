import Image from 'next/image';

// import Link from 'next/link';

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

        {/* <div>
          <Link
            className="rounded-lg bg-[#E73030] px-4 py-2 text-xl font-bold text-white"
            href="upi://pay?pa=209423582000966@cnrb&pn=ANUPAMA%MAHILA%MASIK&mc=1740&tr=1234567887654321&am=0&mam=0&cu=INR&refUrl=http://npci.org/upi/schema/"
          >
            ₹ ದೇಣಿಗೆ ನೀಡಿ
          </Link>
        </div> */}

        <div className="mt-10 h-2 w-full rounded-b-lg bg-[#E73030]" />
      </div>
    </>
  );
}

export default DonationContainer;
