type NumFmtOpts = {
  locale?: string;   // 'es-PE' o 'es-ES'
  decimals?: number; // 0 para contadores
  fallback?: string; // qué mostrar si no es parseable
};

function parseFlexibleNumber(input: number | string | null | undefined): number | null {
  if (input === null || input === undefined) return null;
  if (typeof input === "number") return Number.isFinite(input) ? input : null;

  let s = String(input).trim();
  if (!s) return null;

  // Quita espacios y basura
  s = s.replace(/\s+/g, "").replace(/[^\d.,+\-]/g, "");

  const hasComma = s.includes(",");
  const hasDot = s.includes(".");
  const lastDot = s.lastIndexOf(".");
  const lastComma = s.lastIndexOf(",");

  // Caso especial: sin coma y con puntos que parecen separador de miles
  // Ejemplos válidos: "14.817.331", "10.240", "1.000.000"
  if (!hasComma && hasDot) {
    const parts = s.split(".");
    const allGroupsAreThousands =
      parts.length > 1 &&
      parts.slice(1).every(g => g.length === 3) &&
      parts[0].length >= 1 && parts[0].length <= 3;

    if (allGroupsAreThousands) {
      // Quita puntos de miles → número entero
      s = s.replace(/\./g, "");
      const n = Number(s);
      return Number.isFinite(n) ? n : null;
    }
  }

  // Regla general: el último separador entre . y , es el decimal
  let decimalSep: "." | "," | null = null;
  if (!hasDot && !hasComma) {
    decimalSep = null;
  } else if (lastDot > lastComma) {
    decimalSep = ".";
  } else {
    decimalSep = ",";
  }

  if (decimalSep) {
    const thousandsSep = decimalSep === "." ? "," : ".";
    s = s.replace(new RegExp(`\\${thousandsSep}`, "g"), "");
    if (decimalSep === ",") s = s.replace(/,/g, ".");
  } else {
    s = s.replace(/[.,]/g, "");
  }

  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export default function NumeroFormateado(
  valor: number | string | null | undefined,
  opts: NumFmtOpts = {}
): string {
  const { locale = "es-PE", decimals = 0, fallback = "0" } = opts;
  const num = parseFlexibleNumber(valor);
  if (num === null) return fallback;
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}
