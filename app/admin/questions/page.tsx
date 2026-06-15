import Link from "next/link";
import { getAdminQuestions } from "@/lib/admin-api";
import type { QuestionDetail } from "@/lib/api";

const trackLabels: Record<QuestionDetail["track"], string> = {
  frontend: "프론트엔드",
  backend: "백엔드",
};

const questionTypeLabels: Record<QuestionDetail["questionType"], string> = {
  concept: "개념형",
  experience: "경험형",
};

export default async function AdminQuestionsPage() {
  try {
    const questions = await getAdminQuestions();

    return (
      <main>
        <section className="container" style={{ padding: "48px 0 72px" }}>
          <div className="stack-lg">
            <div className="stack-sm">
              <span className="pill">Admin</span>
              <h1 style={{ margin: 0 }}>질문 관리</h1>
              <p className="muted" style={{ margin: 0 }}>
                등록된 질문의 직군, 순서, 공개 상태를 확인합니다.
              </p>
            </div>

            <section className="card stack-md">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <strong>등록된 질문 {questions.length}개</strong>
                <span className="muted">추가/수정은 API로 처리합니다.</span>
              </div>

              <div className="admin-question-list">
                {questions.map((question) => (
                  <article key={question.id} className="admin-question-item">
                    <div className="admin-question-meta">
                      <span className="pill">{trackLabels[question.track]}</span>
                      <span className="pill">#{question.questionOrder}</span>
                      <span className="pill">{question.category}</span>
                      <span className="pill">{questionTypeLabels[question.questionType]}</span>
                      <span className="pill">{question.recommendedFramework}</span>
                    </div>
                    <div className="stack-sm">
                      <strong>{question.title}</strong>
                      <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                        {question.questionText}
                      </p>
                    </div>
                    <Link className="button secondary" href={`/${question.track}/questions/${question.questionOrder}`}>
                      상세 보기
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    );
  } catch {
    return (
      <main>
        <section className="container" style={{ padding: "48px 0 72px" }}>
          <div className="result-panel stack-md">
            <span className="pill">Admin</span>
            <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.25 }}>질문 목록을 불러오지 못했습니다</h1>
            <p className="muted" style={{ margin: 0, lineHeight: 1.75 }}>
              API 서버가 실행 중인지, `ADMIN_API_KEY` 설정이 같은지 확인해 주세요.
            </p>
          </div>
        </section>
      </main>
    );
  }
}
