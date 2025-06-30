interface CircleNumberProps {
  number: number;
}

export function CircleNumber({ number }: CircleNumberProps) {
  return (
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-base">
      {number}
    </div>
  );
}
