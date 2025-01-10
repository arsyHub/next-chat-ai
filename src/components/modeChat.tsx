import { Activity, Lightbulb, MessageCircleHeart } from "lucide-react";
import React from "react";

export default function ModeChat() {
  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-2 ">
        Apa yang kamu butuhkan?
      </h1>
      <div className="flex gap-2 flex-wrap justify-center">
        <div className="py-2 px-3 border border-spacing-1 rounded-3xl w-[content] border-slate-400 shadow-lg cursor-pointer">
          <h1 className="flex gap-1">
            <span>
              <MessageCircleHeart color="magenta" size={20} />
            </span>
            Curhat
          </h1>
        </div>
        <div className="py-2 px-3 border border-spacing-1 rounded-3xl w-[content] border-slate-400 shadow-lg cursor-pointer">
          <h1 className="flex gap-1">
            <span>
              <Lightbulb color="yellow" size={20} />
            </span>
            Solusi / Saran
          </h1>
        </div>
        <div className="py-2 px-3 border border-spacing-1 rounded-3xl w-[content] border-slate-400 shadow-lg cursor-pointer">
          <h1 className="flex gap-1">
            <span>
              <Activity color="#00A2FF" size={20} />
            </span>
            Motivasi & Penyemangat
          </h1>
        </div>
        <div className="py-2 px-3 border border-spacing-1 rounded-3xl w-[content] border-slate-400 shadow-lg cursor-pointer">
          <h1 className="flex gap-1">Lainnya</h1>
        </div>
      </div>
    </div>
  );
}
