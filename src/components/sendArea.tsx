"use client";
import Image from "next/image";
import * as React from "react";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

export default function SendArea({ fetchData }: { fetchData: () => void }) {
  const [message, setMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const notify = () => toast.info("Pesan maksimal 500 karakter.");

  const onSubmit = async () => {
    if (!message) return;
    if (message.length > 500) {
      notify();
      return;
    }

    try {
      setLoading(true);
      await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify({
          prompt: message,
        }),
      });
      setMessage("");
      fetchData();
      // Scroll smoothly to the bottom after submission
      // const scrollToBottom = document.getElementById("scrollToBottom");
      // if (scrollToBottom) {
      //   scrollToBottom.scrollIntoView({ behavior: "smooth" });
      // }
      // notify();

      const audio = new Audio("/sounds/notif2.mp3");
      audio.play();
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="bottom-0 pb-3 pt-1 px-2  w-full flex justify-between gap-2 sticky bg-base-100 shadow-xl">
    <div className="fixed bottom-0  pb-3 pt-1 px-2 w-full md:w-[700px] flex justify-between gap-2 bg-base-100 shadow-xl">
      <button
        className="btn btn-circle text-2xl shadow-md"
        onClick={() => {
          const modal = document.getElementById("my_modal_2");
          if (modal instanceof HTMLDialogElement) modal.showModal();
        }}
      >
        <BsEmojiHeartEyes />
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex justify-center">
            <Image
              src="/images/agus.jpg"
              alt="emoji"
              width={300}
              height={100}
            />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <label className="input w-full input-bordered rounded-full flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Ketik Pesan"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span>
          <button className="btn btn-circle btn-sm" onClick={onSubmit}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <IoSend />
            )}
          </button>
        </span>
      </label>
    </div>
  );
}
