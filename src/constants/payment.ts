export interface UpiApp {
  name: string;
  icon: string;
  url: string;
}

const VPA_PARAMS = process.env.NEXT_PUBLIC_UPI_PARAMS ?? '';

export const UPI_APPS: UpiApp[] = [
  {
    name: 'GPay',
    icon: '/gpay.png',
    url: `tez://upi/pay?${VPA_PARAMS}`,
  },
  {
    name: 'PhonePe',
    icon: '/phonepe.png',
    url: `phonepe://pay?${VPA_PARAMS}`,
  },
  {
    name: 'Paytm',
    icon: '/paytm.png',
    url: `paytmmp://pay?${VPA_PARAMS}`,
  },
];
