import { Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";

interface IDrawerProps {
  open: boolean;
  onClose: ()=>void;
  title: string;
  children: ReactNode;
  maxWidth?: number;
}
export default function DrawerRight({
  open,
  onClose,
  title,
  children,
  maxWidth,
}: IDrawerProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative "
        style={{ zIndex: 9999 }}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950 backdrop-filter  backdrop-blur-[5px] bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  style={{ maxWidth: maxWidth }}
                  className="pointer-events-auto relative w-screen "
                >
                  <div  className="flex h-full bg-gray-950 flex-col overflow-y-scroll  py-6 shadow-xl">
                    <div className=" flex justify-end mb-1 px-4">
                      <div
                        onClick={onClose}
                        className="  cursor-pointer rounded-md bg-gray-50 bg-opacity-10  hover:bg-opacity-15 transition duration-300 text-gray-50 p-2"
                      >
                        <MdClose />
                      </div>
                    </div>
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-100">
                        {title}
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
