import { FieldKind, ParsedField } from "../types";

const RANGE_RE = /^([^/]+)-([^/]+)$/;
const STEP_RE = /^([^/]+)\/([^/]+)$/;

export function parseField(raw: string): ParsedField {
  const field = raw.trim();
  if (field === "*") {
    return { kind: "any", raw };
  }
  if (field === "?") {
    return { kind: "question", raw };
  }
  if (field.includes(",")) {
    return { kind: "list", raw, values: field.split(",") };
  }
  if (STEP_RE.test(field)) {
    const [, base, step] = field.match(STEP_RE) ?? [];
    return { kind: "step", raw, base, step };
  }
  if (RANGE_RE.test(field)) {
    const [, start, end] = field.match(RANGE_RE) ?? [];
    return { kind: "range", raw, start, end };
  }
  if (field === "LW") {
    return { kind: "lastWeekday", raw };
  }
  if (field.endsWith("W")) {
    const base = field.slice(0, -1);
    return { kind: "weekdayNearest", raw, base };
  }
  if (field.endsWith("L")) {
    const base = field.slice(0, -1);
    if (base) {
      return { kind: "lastWeekday", raw, base };
    }
    return { kind: "last", raw };
  }
  if (field.includes("#")) {
    const [weekday, nth] = field.split("#");
    return { kind: "nthWeekday", raw, values: [weekday], nth };
  }
  return { kind: "literal", raw };
}
