import { Activity, Lightbulb, MessageCircleHeart } from "lucide-react";
import Cookies from "js-cookie";
import React from "react";
import { motion } from "framer-motion";

export default function ModeChat({
  setterModeChat,
}: {
  setterModeChat: (value: string) => void;
}) {
  const onSelectedModeChat = async (title: string) => {
    if (title === "Lainnya") title = "Default";
    Cookies.set("mode_chat", title);
    setterModeChat(title);
  };

  const CardModeChat = ({
    title,
    icon,
    index,
  }: {
    title: string;
    icon: React.ReactNode;
    index: number;
  }) => {
    return (
      <motion.div
        onClick={() => onSelectedModeChat(title)}
        className="py-3 px-4 border border-spacing-1 rounded-3xl w-[content] border-slate-400/20 
        backdrop-blur-sm bg-white/10 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 
        transition-all duration-300 hover:bg-accent/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <h1 className="flex gap-2 items-center font-medium">
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
          {title}
        </h1>
      </motion.div>
    );
  };

  const dataModeChat = [
    {
      title: "Curhat",
      icon: <MessageCircleHeart className="text-pink-500" size={20} />,
    },
    {
      title: "Solusi / Saran",
      icon: <Lightbulb className="text-yellow-500" size={20} />,
    },
    {
      title: "Motivasi & Penyemangat",
      icon: <Activity className="text-blue-500" size={20} />,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.h1
        className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Apa yang kamu butuhkan?
      </motion.h1>
      <div className="flex gap-3 flex-wrap justify-center text-white">
        {dataModeChat.map((item, index) => (
          <CardModeChat
            key={index}
            title={item.title}
            icon={item.icon}
            index={index}
          />
        ))}

        <motion.div
          onClick={() => onSelectedModeChat("Lainnya")}
          className="py-3 px-4 border border-spacing-1 rounded-3xl w-[content] border-slate-400/20 
          backdrop-blur-sm bg-white/10 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 
          transition-all duration-300 hover:bg-accent/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="flex gap-2 items-center font-medium text-white">
            Lainnya
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
