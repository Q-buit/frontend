import { QuestionDetailPage } from "@/components/question-detail-page";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BackendQuestionDetailPage({ params }: Props) {
  const { id } = await params;

  return <QuestionDetailPage id={id} track="backend" />;
}
