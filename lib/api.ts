export type Track = "frontend" | "backend";
export type QuestionType = "concept" | "experience";
export type AnswerFramework = "PREP" | "STAR";
export type FollowUpQuestion = {
  id: number;
  track: Track;
  questionOrder: number;
  title: string;
  questionText: string;
  questionType: QuestionType;
  recommendedFramework: AnswerFramework;
};

export type QuestionDetail = {
  id: number;
  track: Track;
  category: string;
  questionType: QuestionType;
  recommendedFramework: AnswerFramework;
  title: string;
  questionText: string;
  conceptSummary: string;
  modelAnswer: string;
  followUps: FollowUpQuestion[];
  questionOrder: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export async function getQuestionDetail(track: Track, questionOrder: string): Promise<QuestionDetail> {
  const response = await fetch(`${API_BASE_URL}/questions/${track}/${questionOrder}`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error("질문 정보를 불러오지 못했습니다.");
  }

  return response.json();
}
