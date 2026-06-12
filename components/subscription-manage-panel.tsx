"use client";

import { useState } from "react";
import {
  type SubscriptionManageData,
  type SubscriptionStatus,
  unsubscribeSubscription,
} from "@/lib/api";

type SubscriptionManagePanelProps = {
  initialData: SubscriptionManageData;
  token: string;
};

const trackLabels = {
  frontend: "프론트엔드",
  backend: "백엔드",
};

const statusLabels: Record<SubscriptionStatus, string> = {
  pending: "인증 대기",
  active: "활성",
  dormant: "휴면",
  unsubscribed: "구독 취소",
};

export function SubscriptionManagePanel({ initialData, token }: SubscriptionManagePanelProps) {
  const [data, setData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUnsubscribe = async () => {
    if (!window.confirm("전체 구독을 취소하시겠습니까?")) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const nextData = await unsubscribeSubscription(token);
      setData(nextData);
      setMessage("구독이 취소되었습니다.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "구독을 취소하지 못했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="result-panel stack-md">
      <span className="pill">구독 관리</span>
      <div className="stack-sm">
        <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.25 }}>구독 정보 관리</h1>
        <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
          {data.subscriber.email}
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {data.tracks.map((track) => (
          <div key={track.id} className="subscription-track-item">
            <strong>{trackLabels[track.track]}</strong>
            <span className="muted">{statusLabels[track.status]}</span>
          </div>
        ))}
      </div>

      {message ? <p className="form-message success">{message}</p> : null}
      {errorMessage ? <p className="form-message error">{errorMessage}</p> : null}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
        <button
          type="button"
          className="button secondary"
          onClick={handleUnsubscribe}
          disabled={isSubmitting || data.subscriber.status === "unsubscribed"}
        >
          {isSubmitting ? "처리 중..." : "전체 구독 취소"}
        </button>
      </div>
    </div>
  );
}
