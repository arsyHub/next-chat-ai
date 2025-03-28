"use client";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="flex items-center flex-col bg-base-100">
        <div className="w-full lg:w-1/2 relative">{children}</div>
      </div>
    </>
  );
}
