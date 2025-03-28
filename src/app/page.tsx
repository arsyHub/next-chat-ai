"use client";
import React from "react";
import useDataChats from "./utils/useDataChats";
import Navbar from "@/components/navbar";
import SendArea from "@/components/sendArea";
import ModeChat from "@/components/modeChat";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function Home() {
  const [mode, setMode] = React.useState<string>("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const { data, getData } = useDataChats();
  const modeCookie = Cookies.get("mode_chat");

  const reset = () => {
    Cookies.remove("mode_chat");
    getData();
    setMode("");
  };

  const copyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Pesan berhasil disalin!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  React.useEffect(() => {
    if (modeCookie) {
      setMode(modeCookie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const userMessageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const aiMessageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen relative md:w-[700px]">
      <Navbar fetchData={reset} />
      <div className="overflow-auto">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage: "url('/images/bg.png')",
          }}
        ></div>
        {data.length > 0 || modeCookie ? (
          <div className="pb-52 px-2 pt-20">
            <AnimatePresence>
              {data?.map(
                (q: { user: string; aiResponse: string }, index: number) => (
                  <React.Fragment key={index}>
                    {q.user && (
                      <motion.div
                        variants={userMessageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <div className="chat chat-end">
                          <div className="chat-image avatar">
                            <div className="w-8 rounded-full">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                alt="Tailwind CSS chat bubble component"
                                src="/images/avatar3.jpg"
                                className="transition-transform hover:scale-105 duration-200"
                              />
                            </div>
                          </div>
                          <div className="chat-bubble bg-accent text-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 relative group pr-8">
                            {q.user}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => copyMessage(q.user, index)}
                                className="p-1 hover:bg-white/10 rounded-full"
                              >
                                {copiedIndex === index ? (
                                  <Check size={16} className="text-white" />
                                ) : (
                                  <Copy size={16} className="text-white" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {q.aiResponse && (
                      <motion.div
                        variants={aiMessageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mt-2"
                      >
                        <div className="chat chat-start">
                          <div className="chat-image avatar">
                            <div className="w-8 rounded-full">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                alt="Tailwind CSS chat bubble component"
                                src="/images/avatar1.jpg"
                                className="transition-transform hover:scale-105 duration-200"
                              />
                            </div>
                          </div>
                          <div className="chat-bubble bg-gradient-to-r from-slate-200 to-slate-300 text-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-slate-400/20 relative group pr-8">
                            {q.aiResponse}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => copyMessage(q.aiResponse, index)}
                                className="p-1 hover:bg-slate-400/10 rounded-full"
                              >
                                {copiedIndex === index ? (
                                  <Check size={16} className="text-slate-800" />
                                ) : (
                                  <Copy size={16} className="text-slate-800" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </React.Fragment>
                )
              )}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="chat chat-start mt-2"
              >
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="/images/avatar1.jpg"
                    />
                  </div>
                </div>
                <div className="chat-bubble bg-slate-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div id="scrollToBottom" />
          </div>
        ) : (
          <div className="flex justify-center items-center h-[610px] relative">
            <ModeChat setterModeChat={setMode} />
          </div>
        )}
      </div>
      <SendArea fetchData={getData} setIsTyping={setIsTyping} />
    </div>
  );
}
