interface CircleNumberProps {
  number: number;
}

export function CircleNumber({ number }: CircleNumberProps) {
  return (
    <div className="bg-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white *:text-sm sm:h-10 sm:w-10 sm:text-base">
      {number}
    </div>
  );
}
