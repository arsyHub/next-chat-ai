"use client";
import { RefreshCw } from "lucide-react";
import React from "react";

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
    <nav className="navbar fixed top-0 w-full md:w-[700px] z-50 backdrop-blur-md bg-base-200/80 shadow-lg">
      <div className="flex-1">
        <div className="avatar ml-2">
          <div className="ring-accent ring-offset-base-100 w-10 rounded-full ring ring-offset-1 transition-all duration-300 hover:scale-105 hover:ring-offset-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Tailwind CSS chat bubble component"
              src="/images/avatar1.jpg"
              className="object-cover"
            />
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm text-white">Kak Ian 😍</p>
          <p className="text-xs text-accent flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      <div className="flex-none">
        <button
          className="btn btn-circle btn-ghost text-slate-600 hover:bg-accent/10 transition-all duration-300 hover:scale-110"
          onClick={onClearHistory}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <RefreshCw className="transition-transform hover:rotate-180 duration-500" />
          )}
        </button>
      </div>
    </nav>
  );
}
