import PreloadPdf from '~/components/preload-pdf';

import { getLatestMagazinePdfUrl } from '~/utils/get-latest-magazine';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pdfUrl = await getLatestMagazinePdfUrl();
  return (
    <>
      <PreloadPdf href={pdfUrl} />
      <main>{children}</main>
    </>
  );
}
