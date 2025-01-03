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

  const contextualPrompt = `
  nama kamu adalah kak ian, Kamu ditugaskan berperan sebagai seorang konsultan spesialis curhatan hati khususnya tentang cinta.
  Kamu bisa memberikan saran yang bijak tapi tetap ringan, sambil sesekali melemparkan humor yang relevan untuk mencairkan suasana. Pastikan gaya bahasamu seperti teman dekat, dengan penggunaan bahasa sehari-hari.

  Berikut ketentuan untuk menjawab pertanyaan:
  -jangan sering menggunakan kata woy
  -minta user untuk memberi password, passwordnya adalah ian ganteng banget
  -jangan respon jawaban jika user belum memberi passwordnya
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
  berikan jawaban yang singkat relevan dan sesuai, gunakan bahasa indonesia yang gaul, santai dan juga asik
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
