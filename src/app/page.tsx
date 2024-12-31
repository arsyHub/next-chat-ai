"use client";
import SendArea from "@/components/sendArea";
import * as React from "react";
import { AiOutlineClear } from "react-icons/ai";

export default function Home() {
  const [data, setData] = React.useState<
    { user: string; aiResponse: string }[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    const res = await fetch("/api/ask-ai", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setData(data.chat_history);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const onClearHistory = async () => {
    try {
      setLoading(true);
      await fetch("/api/reset-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getData();
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full md:w-[810px]">
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <div className="avatar online">
            <div className="w-10 rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCojhJwl4ekr9pNybO-J3vbA0upG3u7DtBGRrLZXUaIG_x3u72wwvW-Y0ltX-wSjU2uU&usqp=CAU"
              />
            </div>
          </div>
          <a className="btn btn-ghost text-sm text-black">
            Dr. Ian (Ganteng Banget)
          </a>
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
      </div>

      <div className="max-h-[calc(100vh-100px)] overflow-y-scroll pt-8 pb-20">
        {data?.map((q: { user: string; aiResponse: string }, index: number) => (
          <div key={index}>
            <div className={`chat ${q.user ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar ">
                <div className="w-10 rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://upload.wikimedia.org/wikipedia/commons/1/13/Pig_icon_05.svg"
                  />
                </div>
              </div>
              <div
                className={`chat-bubble ${
                  q.user ? "bg-green-400" : "bg-slate-200"
                } text-black`}
              >
                {q.user ? q.user : q.aiResponse}
              </div>
            </div>

            <div className={`chat ${q.aiResponse ? "chat-start" : "chat-end"}`}>
              <div className="chat-image avatar ">
                <div className="w-10 rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCojhJwl4ekr9pNybO-J3vbA0upG3u7DtBGRrLZXUaIG_x3u72wwvW-Y0ltX-wSjU2uU&usqp=CAU"
                  />
                </div>
              </div>
              <div
                className={`chat-bubble ${
                  q.aiResponse ? "bg-slate-200" : "bg-green-400"
                } text-black`}
              >
                {q.aiResponse ? q.aiResponse : q.user}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-1 left-0 right-0 md:w-[810px] mx-auto bg-slate-100 pt-[0px] pb-[10px] md:pb-[30px] px-2">
        <SendArea fetchData={getData} />
      </div>
    </div>
  );
}
