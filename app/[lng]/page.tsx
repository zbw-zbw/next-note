import EmptyNote from "@/components/EmptyNote";

export default async function Page({
  params: { lng },
}: {
  params: { lng: string };
}) {
  return <EmptyNote lng={lng} />;
}
