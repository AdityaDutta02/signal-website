const DOMAIN_RE = /^(?:https?:\/\/)?([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validDomain(input: string | undefined | null): input is string {
  if (!input) return false;
  return DOMAIN_RE.test(input.trim());
}

export function validEmail(input: string | undefined | null): input is string {
  if (!input) return false;
  return EMAIL_RE.test(input.trim());
}

export function trimMax(input: string | undefined | null, max: number): string {
  if (!input) return "";
  return input.trim().slice(0, max);
}
