export default function ManagePage() {
  return (
    <main>
      <section className="container" style={{ padding: "64px 0" }}>
        <div className="card stack-md" style={{ maxWidth: 720, margin: "0 auto" }}>
          <span className="pill">구독 관리</span>
          <h1 style={{ margin: 0 }}>구독 정보 관리</h1>
          <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
            실제 구현에서는 메일의 토큰 링크를 통해 이 페이지에 들어오고, 직군별 구독 상태와 카테고리 선호를 수정할 수 있어야 합니다.
          </p>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="card" style={{ padding: 16 }}>
              <strong>프론트엔드</strong>
              <p className="muted">활성</p>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <strong>백엔드</strong>
              <p className="muted">휴면 후보 없음</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="button">저장</button>
            <button className="button secondary">전체 구독 취소</button>
          </div>
        </div>
      </section>
    </main>
  );
}
