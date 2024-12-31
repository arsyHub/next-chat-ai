import * as React from "react";
import { IoSend } from "react-icons/io5";

export default function SendArea({ fetchData }: { fetchData: () => void }) {
  const [message, setMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async () => {
    if (!message) return;

    try {
      setLoading(true);
      await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message,
        }),
      });
      setMessage("");
      fetchData();
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bottom-10  w-full flex justify-between gap-2">
      <label className="input w-full input-bordered rounded-full flex items-center gap-2">
        <input
          type="text"
          className="grow text-black"
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
