import "server-only";
import type { QuestionDetail } from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export async function getAdminQuestions(): Promise<QuestionDetail[]> {
  const response = await fetch(`${API_BASE_URL}/admin/questions`, {
    cache: "no-store",
    headers: ADMIN_API_KEY
      ? {
          "x-admin-key": ADMIN_API_KEY,
        }
      : undefined,
  });

  if (!response.ok) {
    throw new Error("관리자 질문 목록을 불러오지 못했습니다.");
  }

  return response.json();
}
