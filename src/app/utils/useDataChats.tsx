import * as React from "react";

export default function useDataChats(autoFetch = true) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const getData = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/ask-ai", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const result = await res.json();
      setData(result.chat_history || []);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Fetch Error:", errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (autoFetch) {
      getData();
    }
  }, [autoFetch, getData]);
  console.log("halo", data);

  return { data, loading, getData };
}
