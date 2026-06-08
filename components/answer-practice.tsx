"use client";

import { useMemo, useState } from "react";
import type { AnswerFramework } from "@/lib/api";

type Props = {
  defaultFramework: AnswerFramework;
};

const labels = {
  PREP: ["Point", "Reason", "Example", "Point"],
  STAR: ["Situation", "Task", "Action", "Result"],
} as const;

const guides = {
  PREP: [
    "결론부터 한 문장으로 적습니다.",
    "왜 그렇게 생각하는지 이유를 붙입니다.",
    "실무나 프로젝트 예시를 하나 덧붙입니다.",
    "마무리로 다시 짧게 정리합니다.",
  ],
  STAR: [
    "어떤 상황이었는지 짧게 설명합니다.",
    "그 상황에서 맡은 역할을 적습니다.",
    "실제로 어떤 행동을 했는지 구체적으로 씁니다.",
    "결과와 배운 점을 정리합니다.",
  ],
} as const;

export function AnswerPractice({ defaultFramework }: Props) {
  const [framework, setFramework] = useState<AnswerFramework>(defaultFramework);
  const currentLabels = useMemo(() => labels[framework], [framework]);
  const currentGuides = useMemo(() => guides[framework], [framework]);

  return (
    <section className="card stack-md">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div className="stack-sm">
          <span className="pill">답변 연습</span>
          <h2 style={{ margin: 0, fontSize: 30, letterSpacing: -0.8 }}>{framework} 프레임으로 답변하기</h2>
          <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
            질문 유형에 맞는 기본 프레임을 먼저 제안하고, 필요하면 사용자가 바꿔서 연습할 수 있게 둡니다.
          </p>
        </div>
        <select className="select" value={framework} onChange={(event) => setFramework(event.target.value as AnswerFramework)} style={{ width: 140 }}>
          <option value="PREP">PREP</option>
          <option value="STAR">STAR</option>
        </select>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {currentLabels.map((label, index) => (
          <label key={`${framework}-${label}-${index}`} className="stack-sm">
            <span style={{ fontWeight: 700 }}>
              {index + 1}. {label}
            </span>
            <textarea className="textarea" rows={5} placeholder={currentGuides[index]} />
            <span className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
              {currentGuides[index]}
            </span>
          </label>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button type="button" className="button">
          임시 저장
        </button>
        <button type="button" className="button secondary">
          모범 답변 보기
        </button>
      </div>
    </section>
  );
}
