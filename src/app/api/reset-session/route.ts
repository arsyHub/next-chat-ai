import { cookies } from "next/headers";

export async function POST() {
  try {
    // Hapus cookie sesi
    const cookiesStore = cookies();
    (await cookiesStore).delete("context");

    return new Response("Session has been reset.", { status: 200 });
  } catch (err) {
    console.error("Error resetting session:", err);
    return new Response("Failed to reset session.", { status: 500 });
  }
}
