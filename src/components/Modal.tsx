import React, { ReactNode } from "react";

import { GrFormClose } from "react-icons/gr";

const Modal = ({
  showModal,
  onClose,
  children,
}: {
  showModal: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      className={`${
        showModal ? "block" : "hidden"
      } fixed bg-black w-screen h-screen left-0 top-0 bg-opacity-50 flex flex-col items-center p-20`}
    >
      <div className="w-2/4 p-8 bg-white rounded-md relative">
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={onClose}
        >
          <GrFormClose className="text-xl" />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
