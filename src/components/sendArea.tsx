"use client";
import Image from "next/image";
import * as React from "react";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import { X } from "lucide-react";

export default function SendArea({
  fetchData,
  setIsTyping,
}: {
  fetchData: () => void;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [message, setMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const notify = () => toast.info("Pesan maksimal 500 karakter.");

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const onSubmit = async () => {
    if (!message) return;
    if (message.length > 500) {
      notify();
      return;
    }

    try {
      setLoading(true);
      setIsTyping(true);
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
      const scrollToBottom = document.getElementById("scrollToBottom");
      if (scrollToBottom) {
        scrollToBottom.scrollIntoView({ behavior: "smooth" });
      }
      // notify();

      // const audio = new Audio("/sounds/notif2.mp3");
      // audio.play();
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-0 pb-3 pt-1 px-2 w-full md:w-[700px] flex justify-between gap-2 bg-base-100 shadow-xl backdrop-blur-sm bg-opacity-90">
      <button
        className="btn btn-circle text-2xl shadow-md hover:scale-110 transition-transform duration-200 hover:bg-accent/10"
        onClick={handleOpenModal}
      >
        <BsEmojiHeartEyes className="text-accent" />
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-base-100 rounded-2xl relative">
          <button
            onClick={handleCloseModal}
            className="btn btn-circle btn-ghost absolute right-2 top-2 z-10"
          >
            <X size={24} />
          </button>
          <div className="flex justify-center">
            <Image
              src="/images/agus.jpg"
              alt="emoji"
              width={300}
              height={100}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
        <div className="modal-backdrop" onClick={handleCloseModal}></div>
      </dialog>

      <label className="input w-full input-bordered rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow duration-200">
        <input
          type="text"
          className="grow focus:outline-none text-white"
          placeholder="Ketik Pesan"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
        <span>
          <button
            className={`btn btn-circle btn-sm transition-all duration-200 ${
              message ? "bg-accent hover:bg-accent-focus" : "bg-base-300"
            }`}
            onClick={onSubmit}
            disabled={!message}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <IoSend
                className={message ? "text-white" : "text-base-content/50"}
              />
            )}
          </button>
        </span>
      </label>
    </div>
  );
}
