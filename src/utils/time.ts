export type FormatString =
  | "numeric"
  | "2-digit"
  | "long"
  | "short"
  | "narrow"
  | undefined;

export const toDDMMYYYY = (str: string, format?: FormatString) => {
  try {
    str = str.endsWith("Z") ? str : str + "Z";
    const date = new Date(str);
    return date.toLocaleDateString("id", {
      year: "numeric",
      month: format ? format : "long",
      day: "numeric",
    });
  } catch (err) {
    return "";
  }
};
