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

export type CreateSubscriptionPayload = {
  email: string;
  tracks: Track[];
  consentToReceive: boolean;
};

export type CreateSubscriptionResponse = {
  message: string;
  data: {
    subscriber: {
      id: number;
      email: string;
      status: "pending" | "active" | "dormant" | "unsubscribed";
      consentToReceive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    verifyToken: string;
    verifyUrl: string;
  };
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

export async function createSubscription(
  payload: CreateSubscriptionPayload,
): Promise<CreateSubscriptionResponse> {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "구독 요청을 저장하지 못했습니다.";

    try {
      const error = (await response.json()) as { message?: string };
      if (error.message) {
        message = error.message;
      }
    } catch {
      // ignore malformed error body
    }

    throw new Error(message);
  }

  return response.json();
}
