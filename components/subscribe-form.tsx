"use client";

import { useEffect, useState } from "react";

type Track = "frontend" | "backend" | "both";

const trackOptions: Array<{ value: Track; title: string }> = [
  { value: "frontend", title: "프론트엔드" },
  { value: "backend", title: "백엔드" },
  { value: "both", title: "둘 다" },
];

export function SubscribeForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState<Track>("frontend");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button type="button" className="button" onClick={() => setIsOpen(true)}>
        구독 시작
      </button>

      {isOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="subscribe-title">
          <div className="modal-panel stack-md">
            <div className="stack-sm" style={{ textAlign: "left" }}>
              <div className="stack-sm">
                <h2 id="subscribe-title" style={{ margin: 0, fontSize: 28 }}>
                  이메일과 직군만 먼저 받습니다
                </h2>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                  카테고리는 일단 빼고, 메일 인증과 직군 선택만 최소 입력으로 받는 구조입니다.
                </p>
              </div>
            </div>

            <form className="stack-md">
              <label className="stack-sm">
                <span style={{ fontWeight: 600 }}>이메일</span>
                <input className="input" type="email" placeholder="hello@q-ubit.com" />
              </label>

              <div className="stack-sm">
                <span style={{ fontWeight: 600 }}>직군</span>
                <div className="track-grid">
                  {trackOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`track-option ${track === option.value ? "active" : ""}`}
                      onClick={() => setTrack(option.value)}
                    >
                      <strong style={{ display: "block" }}>{option.title}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <label className="checkbox-row">
                <input type="checkbox" defaultChecked />
                <span className="muted" style={{ lineHeight: 1.6 }}>
                  질문 메일 발송과 서비스 운영에 필요한 개인정보 처리에 동의합니다.
                </span>
              </label>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button type="button" className="button secondary" onClick={() => setIsOpen(false)}>
                  취소
                </button>
                <button type="submit" className="button">
                  구독 신청
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
