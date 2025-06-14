import { BsCart3 } from "react-icons/bs";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative text-xl text-text-dark hover:text-primary  ">
      <BsCart3 className={className} />

      {quantity ? (
        <div className="bg-black text-white   text-xs rounded-full p-1 absolute -top-1 md:-top-2 -right-3 md:-right-4 w-5 h-5 flex items-center justify-center">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
