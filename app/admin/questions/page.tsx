const sampleQuestions = [
  { id: 1, track: "frontend", category: "React", type: "concept", title: "리렌더링은 언제 발생하나요?" },
  { id: 2, track: "backend", category: "Spring Boot", type: "experience", title: "트랜잭션 문제를 해결한 경험이 있나요?" },
];

export default function AdminQuestionsPage() {
  return (
    <main>
      <section className="container" style={{ padding: "48px 0 72px" }}>
        <div className="stack-lg">
          <div className="stack-sm">
            <span className="pill">Admin</span>
            <h1 style={{ margin: 0 }}>질문 관리</h1>
            <p className="muted" style={{ margin: 0 }}>
              MVP에서는 웹 앱 안에 간단한 관리 페이지를 두고, 나중에 인증을 붙이는 구조로 시작합니다.
            </p>
          </div>

          <section className="card stack-md">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <strong>등록된 질문</strong>
              <button className="button">새 질문 추가</button>
            </div>

            <div className="grid">
              {sampleQuestions.map((question) => (
                <div key={question.id} className="card" style={{ padding: 18 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                    <span className="pill">{question.track}</span>
                    <span className="pill">{question.category}</span>
                    <span className="pill">{question.type}</span>
                  </div>
                  <strong>{question.title}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
