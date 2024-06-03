import { type FC, type PropsWithChildren } from "react";
import { cn } from "../../lib";

interface ModalProps extends PropsWithChildren {
  close: () => void;
  open: boolean;
  className?: string
}

export const Modal: FC<ModalProps> = ({ close, open, children, className }) => {
  return (
    <div
      className={
        !open
          ? "opacity-0 w-0 overflow-hidden h-0"
          : "transition-opacity z-10 duration-300 ease-out opacity-100 inset-0 fixed bg-black/80 flex justify-center items-center"
      }
      onClick={close}
    >
      <div
        className={
          cn(
            "p-4 bg-black/80 backdrop-blur text-white rounded min-w-[80%] md:min-w-[30rem] min-h-[20rem] flex flex-col ring-1 ring-stone-950",
            className
          )
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
