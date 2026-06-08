import { AnswerPractice } from "@/components/answer-practice";
import { getQuestionDetail } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuestionDetailPage({ params }: Props) {
  const { id } = await params;
  const question = await getQuestionDetail(id);

  return (
    <main>
      <section className="section">
        <div className="container stack-lg">
          <section className="card stack-md">
            <span className="pill">질문</span>
            <h2 style={{ margin: 0, fontSize: 28, lineHeight: 1.4 }}>{question.question}</h2>
          </section>

          <AnswerPractice defaultFramework={question.recommendedFramework} />

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <section className="card stack-md">
              <span className="pill">모범 답변</span>
              <p style={{ margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{question.modelAnswer}</p>
            </section>

            <section className="card stack-md">
              <span className="pill">개념 학습</span>
              <p style={{ margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{question.conceptSummary}</p>
            </section>
          </div>

          <section className="card stack-md">
            <span className="pill">꼬리 질문</span>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
              {question.followUps.map((followUp) => (
                <li key={followUp}>{followUp}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
