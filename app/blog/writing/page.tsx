import ImprintIndex from '@/components/press/ImprintIndex';

export const revalidate = 3600;

/** Essays, the press's writing imprint. The URL keeps its old name. */
export default function EssaysPage() {
  return <ImprintIndex category="writing" />;
}
