import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";

const metrics = [
  { value: "하루 한 번", label: "질문 메일 발송" },
  { value: "프론트 / 백엔드", label: "두 직군 트랙 운영" },
  { value: "PREP · STAR", label: "질문 타입별 답변 구조" },
];

const steps = [
  {
    index: "01",
    title: "질문 확인",
    headline: "메일로 받은 질문을 바로 확인합니다",
    description: "매일 도착한 질문 링크를 열고, 오늘 답해볼 질문을 빠르게 파악합니다.",
  },
  {
    index: "02",
    title: "답변 연습",
    headline: "PREP 또는 STAR로 바로 말해봅니다",
    description: "개념형과 경험형 질문에 맞는 구조를 제안해서, 생각을 답변 형태로 정리하게 만듭니다.",
  },
  {
    index: "03",
    title: "개념 정리",
    headline: "모범 답변과 개념 학습으로 마무리합니다",
    description: "직접 답한 뒤에 모범 답변과 개념 설명, 꼬리 질문까지 이어서 복습합니다.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="container">
        <div className="hero-shell hero-shell-centered">
          <div className="stack-lg hero-content-centered">
            <div className="stack-md">
              <h1 style={{ fontSize: "clamp(42px, 7vw, 76px)", lineHeight: 1.04, margin: 0, letterSpacing: -2 }}>
                매일 받는 질문으로
                <br />
                답변 루틴을 만듭니다
              </h1>
              <p className="muted" style={{ maxWidth: 680, fontSize: 18, lineHeight: 1.75, margin: "0 auto", textAlign: "center" }}>
                프론트엔드와 백엔드 질문을 메일로 받고, 상세 페이지에서 답변 연습과 개념 학습을 바로 이어가는 구조입니다.
                홈에서는 설명만 간단히 두고, 실제 학습은 메일 링크에서 시작합니다.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <SubscribeForm />
              <Link className="button secondary" href="/questions/1">
                질문 상세 예시 보기
              </Link>
            </div>

            <div className="metric-grid">
              {metrics.map((metric) => (
                <div key={metric.label} className="metric-card stack-sm">
                  <strong style={{ fontSize: 24, letterSpacing: -0.5 }}>{metric.value}</strong>
                  <span className="muted">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-lg">
          <div className="section-heading">
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 5vw, 42px)", letterSpacing: -1 }}>
              질문을 받고, 답하고, 정리하는 흐름
            </h2>
            <p className="muted" style={{ margin: 0, maxWidth: 720, lineHeight: 1.75 }}>
              매일메일 랜딩처럼 홈에서 사용 흐름이 바로 보여야 합니다. 이 서비스도 메일 수신부터 답변 연습, 개념 정리까지 한 번에 이해되게 가져갑니다.
            </p>
          </div>

          <div className="step-grid">
            {steps.map((step) => (
              <article key={step.index} className="step-card stack-md">
                <div className="step-index">{step.index}</div>
                <div className="stack-sm">
                  <span className="pill">{step.title}</span>
                  <h3 style={{ margin: 0, fontSize: 24, lineHeight: 1.35 }}>{step.headline}</h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.75 }}>
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel stack-md">
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 5vw, 40px)", letterSpacing: -1, textAlign: "center" }}>
              메일 한 통으로 하루 학습을 시작합니다
            </h2>
            <p className="muted" style={{ margin: "0 auto", maxWidth: 700, lineHeight: 1.75, textAlign: "center" }}>
              홈은 설명만 간단히 두고, 실제 학습은 메일 링크에서 시작합니다. 가입은 가볍게 받고, 질문 상세 페이지에서 답변 연습과 개념 학습을 이어갑니다.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <SubscribeForm />
              <Link className="button secondary" href="/questions/1">
                질문 상세 예시 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
