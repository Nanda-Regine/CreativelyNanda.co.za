import ImprintIndex from '@/components/press/ImprintIndex';

export const revalidate = 3600;

/** Field Notes, the press's engineering imprint. The URL keeps its old name. */
export default function FieldNotesPage() {
  return <ImprintIndex category="dev" />;
}
