"use client";
import React from "react";
import { AiOutlineClear } from "react-icons/ai";

export default function Navbar({ fetchData }: { fetchData: () => void }) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const onClearHistory = async () => {
    try {
      setLoading(true);
      await fetch("/api/reset-session", {
        method: "POST",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
      });
      fetchData();
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="navbar bg-base-200 shadow-sm sticky top-0 w-full z-50">
      <div className="flex-1">
        <div className="avatar ml-2">
          <div className="ring-accent ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Tailwind CSS chat bubble component"
              src="/images/me.jpg"
            />
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm">Dr. Ian (Ganteng Banget)</p>
          <p className="text-xs text-accent">Online</p>
        </div>
      </div>

      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost text-slate-600"
          onClick={onClearHistory}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <AiOutlineClear size={24} />
          )}
        </button>
      </div>
    </nav>
  );
}
