"use client";

import { useEffect, useMemo, useState } from "react";
import { createSubscription, type Track as ApiTrack } from "@/lib/api";

type Track = "frontend" | "backend" | "both";

const trackOptions: Array<{ value: Track; title: string }> = [
  { value: "frontend", title: "프론트엔드" },
  { value: "backend", title: "백엔드" },
  { value: "both", title: "둘 다" },
];

const initialSuccessMessage = "인증 메일을 보냈습니다. 메일함에서 링크를 확인해 주세요.";

export function SubscribeForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState<Track>("frontend");
  const [email, setEmail] = useState("");
  const [consentToReceive, setConsentToReceive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const tracks = useMemo<ApiTrack[]>(() => {
    if (track === "both") {
      return ["frontend", "backend"];
    }

    return [track];
  }, [track]);

  const resetForm = () => {
    setTrack("frontend");
    setEmail("");
    setConsentToReceive(true);
    setErrorMessage(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const openModal = () => {
    setIsOpen(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!consentToReceive) {
      setErrorMessage("개인정보 처리 동의가 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createSubscription({
        email,
        tracks,
        consentToReceive,
      });

      setSuccessMessage(initialSuccessMessage);
      resetForm();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "구독 요청을 저장하지 못했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button type="button" className="button" onClick={openModal}>
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

            <form className="stack-md" onSubmit={handleSubmit}>
              <label className="stack-sm">
                <span style={{ fontWeight: 600 }}>이메일</span>
                <input
                  className="input"
                  type="email"
                  placeholder="hello@q-ubit.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isSubmitting}
                  required
                />
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
                      disabled={isSubmitting}
                    >
                      <strong style={{ display: "block" }}>{option.title}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={consentToReceive}
                  onChange={(event) => setConsentToReceive(event.target.checked)}
                  disabled={isSubmitting}
                />
                <span className="muted" style={{ lineHeight: 1.6 }}>
                  질문 메일 발송과 서비스 운영에 필요한 개인정보 처리에 동의합니다.
                </span>
              </label>

              {errorMessage ? <p className="form-message error">{errorMessage}</p> : null}
              {successMessage ? <p className="form-message success">{successMessage}</p> : null}

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button type="button" className="button secondary" onClick={closeModal} disabled={isSubmitting}>
                  취소
                </button>
                <button type="submit" className="button" disabled={isSubmitting}>
                  {isSubmitting ? "구독 신청 중..." : "구독 신청"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
