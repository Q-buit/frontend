import Link from "next/link";

type VerifyPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function SubscriptionVerifyPage({ searchParams }: VerifyPageProps) {
  const { status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="result-panel stack-md">
            <span className="pill">{isSuccess ? "인증 완료" : "인증 실패"}</span>
            <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.25 }}>
              {isSuccess ? "구독 인증이 완료되었습니다" : "인증 링크를 확인할 수 없습니다"}
            </h1>
            <p className="muted" style={{ margin: 0, lineHeight: 1.75 }}>
              {isSuccess
                ? "이제 선택한 직군의 질문 메일을 받을 수 있습니다."
                : "링크가 만료되었거나 이미 사용되었을 수 있습니다. 다시 구독 신청을 진행해 주세요."}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button" href="/">
                홈으로
              </Link>
              <Link className="button secondary" href="/frontend/questions/1">
                질문 예시 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
