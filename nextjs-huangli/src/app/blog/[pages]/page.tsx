export default async function Page({
  params,
}: {
  params: Promise<{pages: string}>
}) {
  const {pages} = await params
  return <div>My Post: {pages}</div>
}
