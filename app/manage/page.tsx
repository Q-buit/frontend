import Link from "next/link";
import { SubscriptionManagePanel } from "@/components/subscription-manage-panel";
import { getSubscriptionManageData } from "@/lib/api";

type ManagePageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ManagePage({ searchParams }: ManagePageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <InvalidManagePage />;
  }

  try {
    const data = await getSubscriptionManageData(token);
    return (
      <main>
        <section className="section">
          <div className="container">
            <SubscriptionManagePanel initialData={data} token={token} />
          </div>
        </section>
      </main>
    );
  } catch {
    return <InvalidManagePage />;
  }
}

function InvalidManagePage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="result-panel stack-md">
            <span className="pill">구독 관리</span>
            <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.25 }}>관리 링크를 확인할 수 없습니다</h1>
            <p className="muted" style={{ margin: 0, lineHeight: 1.75 }}>
              링크가 만료되었거나 잘못된 주소일 수 있습니다. 다시 구독 신청을 진행해 주세요.
            </p>
            <Link className="button" href="/">
              홈으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
