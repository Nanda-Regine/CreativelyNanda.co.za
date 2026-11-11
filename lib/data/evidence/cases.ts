import type { CaseFile, EvidenceApp } from './types';
import { ADMINOS_CASE } from './adminos/case';
import { JARVIS_CASE } from './jarvis/case';
import { SANYU_CASE } from './sanyu/case';

export const CASES: Record<EvidenceApp, CaseFile> = {
  adminos: ADMINOS_CASE,
  jarvis: JARVIS_CASE,
  sanyu: SANYU_CASE,
};

export function getCase(app: string): CaseFile | undefined {
  return Object.prototype.hasOwnProperty.call(CASES, app) ? CASES[app as EvidenceApp] : undefined;
}

export const CASE_LIST: CaseFile[] = Object.values(CASES);
