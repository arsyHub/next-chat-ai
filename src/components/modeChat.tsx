import { Activity, Lightbulb, MessageCircleHeart } from "lucide-react";
import Cookies from "js-cookie";
import React from "react";

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
  }: {
    title: string;
    icon: React.ReactNode;
  }) => {
    return (
      <div
        onClick={() => onSelectedModeChat(title)}
        className="py-2 px-3 border border-spacing-1 rounded-3xl w-[content] border-slate-400 shadow-lg cursor-pointer"
      >
        <h1 className="flex gap-1 ">
          <span>{icon}</span>
          {title}
        </h1>
      </div>
    );
  };

  const dataModeChat = [
    {
      title: "Curhat",
      icon: <MessageCircleHeart color="magenta" size={20} />,
    },
    {
      title: "Solusi / Saran",
      icon: <Lightbulb color="yellow" size={20} />,
    },
    {
      title: "Motivasi & Penyemangat",
      icon: <Activity color="#00A2FF" size={20} />,
    },
  ];
  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-4">
        Apa yang kamu butuhkan?
      </h1>
      <div className="flex gap-2 flex-wrap justify-center">
        {dataModeChat.map((item, index) => (
          <CardModeChat key={index} title={item.title} icon={item.icon} />
        ))}

        <div
          onClick={() => onSelectedModeChat("Lainnya")}
          className="py-2 px-3 border border-spacing-1 rounded-3xl w-[content] border-slate-400 shadow-lg cursor-pointer"
        >
          <h1 className="flex gap-1">Lainnya</h1>
        </div>
      </div>
    </div>
  );
}
