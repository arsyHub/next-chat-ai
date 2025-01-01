"use client";
import React from "react";
import useDataChats from "./utils/useDataChats";
import Navbar from "@/components/navbar";
import SendArea from "@/components/sendArea";

export default function Home() {
  const { data, getData } = useDataChats();

  return (
    <div>
      <Navbar fetchData={getData} />
      <div className="min-h-screen max-h-screen overflow-auto relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage: "url('/images/bg.png')",
          }}
        ></div>
        <div className="pb-52 px-2 pt-5">
          {data?.map(
            (q: { user: string; aiResponse: string }, index: number) => (
              <div key={index}>
                <div className={`chat ${q.user ? "chat-end" : "chat-start"}`}>
                  <div className="chat-image avatar ">
                    <div className="w-8 rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://upload.wikimedia.org/wikipedia/commons/1/13/Pig_icon_05.svg"
                      />
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      q.user ? "bg-accent" : "bg-slate-200"
                    } text-base-300`}
                  >
                    {q.user ? q.user : q.aiResponse}
                  </div>
                </div>

                <div
                  className={`chat ${q.aiResponse ? "chat-start" : "chat-end"}`}
                >
                  <div className="chat-image avatar ">
                    <div className="w-8 rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="/images/me.jpg"
                      />
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      q.aiResponse ? "bg-slate-300" : "bg-green-400"
                    } text-base-300`}
                  >
                    {q.aiResponse ? q.aiResponse : q.user}
                  </div>
                </div>
                <div id="scrollToBottom"></div>
              </div>
            )
          )}
        </div>
      </div>
      <SendArea fetchData={getData} />
    </div>
  );
}
