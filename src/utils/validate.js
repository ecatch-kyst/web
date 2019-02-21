export default {
  ZD: v => typeof v !== "string" && "error",
  ZT: v => typeof v !== "string" && "error",
  PD: v => typeof v !== "string" && "error",
  PT: v => typeof v !== "string" && "error",
  LA: v => typeof v !== "number" && "error",
  LO: v => typeof v !== "number" && "error"
}