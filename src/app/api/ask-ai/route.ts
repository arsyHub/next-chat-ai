import { cookies } from "next/headers";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const { GEMINI_API_KEY } = process.env;

if (!GEMINI_API_KEY) {
  throw new Error("Environment variable GEMINI_API_KEY is required.");
}

// Inisialisasi Google Generative AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET() {
  // Ambil riwayat sesi dari cookie
  const cookiesStore = await cookies();
  const sessionContext = cookiesStore.get("context");
  const chatHistory = sessionContext ? JSON.parse(sessionContext.value) : [];

  try {
    return new Response(
      JSON.stringify({
        chat_history: chatHistory,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during AI processing:", error.message);
    } else {
      console.error("Error during AI processing:", error);
    }
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the AI request.",
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt } = body;

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required." }), {
      status: 400,
    });
  }

  if (prompt.length > 500) {
    return new Response(
      JSON.stringify({
        error: "Prompt is too long. Maximum length is 500 characters.",
      }),
      {
        status: 400,
      }
    );
  }

  // Ambil riwayat sesi dari cookie
  const cookiesStore = await cookies();
  const sessionContext = cookiesStore.get("context");
  const chatHistory = sessionContext ? JSON.parse(sessionContext.value) : [];

  // Ambil mode chat dari cookie
  const modeCookie = cookiesStore.get("mode_chat");
  const mode = (
    modeCookie ? modeCookie.value : "Default"
  ) as keyof typeof modeRules;

  const modeRules = {
    Default:
      "jadi teman curhat andalan yang selalu siap mendengarkan setiap cerita hati",
    Curhat:
      "jadi pendengar setia yang paham banget rasanya galau, siap memberikan empati tanpa batas",
    "Solusi / Saran":
      "jadi konsultan pintar yang kasih solusi oke dan saran bijak buat semua masalah",
    "Motivasi & Penyemangat":
      "jadi cheerleader pribadi yang siap kasih semangat dan motivasi biar kamu makin on fire!",
  };

  const contextualPrompt = `
  nama kamu adalah Kak Ian, seorang konsultan spesialis yang dapat berperan dalam berbagai mode.

  Mode kamu saat ini: ${mode}.
  Peranmu: ${modeRules[mode]}.


  Berikut ketentuan untuk menjawab pertanyaan:
  -minta user untuk memberi password, passwordnya adalah ian ganteng banget
  -jangan respon jawaban jika user belum memberi passwordnya
  -jangan minta password lagi jika user sudah memberi passwordnya
  -jangan menjawab jika diluar konteks
  -jika user minta kata-kata maka berikan kata ini "fisik bisa dirubah, materi bisa dicari, tapi yang tulus tidak datang dua kali. Jeg menyala wi, agus ni bos Tampleng Dong!".
  
  
   Riwayat percakapan sebelumnya:
    ${chatHistory
      .map(
        (q: { user: string; aiResponse: string }) =>
          `User: ${q.user}\nJawaban kamu: ${q.aiResponse}`
      )
      .join("\n")}

      
  pertanyaan user saat ini: ${prompt}
  berikan jawaban yang singkat, relevan dan sesuai, gunakan bahasa indonesia yang gaul, santai dan juga asik
  `;

  try {
    const result = await model.generateContent(contextualPrompt);
    const aiResponse = result.response.text();

    if (!aiResponse) {
      throw new Error("AI did not return a valid response.");
    }

    // Tambahkan ke riwayat percakapan
    chatHistory.push({
      user: prompt,
      aiResponse: aiResponse,
    });

    // Simpan kembali riwayat ke cookie
    cookiesStore.set("context", JSON.stringify(chatHistory));

    return new Response(
      JSON.stringify({
        response: aiResponse,
        chat_history_session: chatHistory,
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during AI processing:", error.message);
    } else {
      console.error("Error during AI processing:", error);
    }
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the AI request.",
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
