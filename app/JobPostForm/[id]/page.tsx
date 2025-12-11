import JobForm from "../JobForm";

export default async function Page({ params }: any) {
  const { id } = await params;
  return <JobForm jobId={id} />;
}