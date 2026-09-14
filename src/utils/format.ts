export function egp(value: number): string {
  return `${value.toLocaleString('en-US')} ج.م`;
}

export function maskPhone(phone: string): string {
  // 01X XXX XXXX -> mask middle segment
  const digits = phone.replace(/\s/g, '');
  if (digits.length < 11) return phone;
  return `${digits.slice(0, 3)} ••• ${digits.slice(7)}`;
}

export function formatPhone(phone: string): string {
  const d = phone.replace(/\s/g, '');
  if (d.length < 11) return phone;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
}

export function maskNationalId(id: string): string {
  return `${id.slice(0, 4)} •••••• ${id.slice(-2)}`;
}

export function percent(value: number): string {
  return `${value}%`;
}