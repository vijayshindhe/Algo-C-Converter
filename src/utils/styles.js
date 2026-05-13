// styles.js — Bold & Professional Redesign

const isMobile = window.innerWidth <= 768;

export const styles = {

  /* ── CONTAINER ─────────────────────────────── */
  container: {
    minHeight: "100vh",
    padding: isMobile ? "40px 16px" : "80px 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  /* ── HEADER ─────────────────────────────────── */
  header: {
    textAlign: "center",
    marginBottom: isMobile ? "40px" : "60px",
    maxWidth: "1000px",
  },

  title: {
    fontSize: isMobile ? "42px" : "72px",
    fontWeight: "900",
    color: "#0f172a",
    margin: "0 0 32px 0",
    lineHeight: "1.1",
    letterSpacing: "0.02em", // Changed from negative to positive
    wordSpacing: "12px",     // Added word spacing
  },

  subtitle: {
    color: "#0f172a",
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: "800",
    maxWidth: "700px",
    margin: "0 auto 12px",
    lineHeight: "1.2",
    letterSpacing: "0.01em",
  },

  description: {
    color: "#475569",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "500",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },

  /* ── OBJECTIVE BOXES ────────────────────────── */
  objectivesWrapper: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "32px",
  },

  objectiveBox: {
    padding: "10px 24px",
    fontSize: "12px",
    fontWeight: "800",
    color: "#4f46e5",
    borderRadius: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  /* ── MAIN ───────────────────────────────────── */
  main: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  /* ── ACTION BAR ─────────────────────────────── */
  topButtonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "50px",
  },

  convertBtnTop: {
    padding: isMobile ? "16px 36px" : "20px 60px",
    fontSize: "18px",
    fontWeight: "800",
    borderRadius: "20px",
    cursor: "pointer",
    letterSpacing: "0.02em",
  },

  /* ── PANELS ──────────────────────────────────── */
  panelsWrapper: {
    display: "flex",
    gap: "30px",
    flexDirection: isMobile ? "column" : "row",
  },

  panel: {
    flex: 1,
    padding: isMobile ? "24px" : "36px",
    display: "flex",
    flexDirection: "column",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  panelTitle: {
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "800",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  panelActions: {
    display: "flex",
    gap: "12px",
  },

  /* ── BUTTONS ──────────────────────────────────── */
  secondaryBtn: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e293b",
    borderRadius: "14px",
    cursor: "pointer",
  },

  copyBtn: {
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: "800",
    color: "#4f46e5",
    background: "#eef2ff",
    border: "2px solid #c7d2fe",
    borderRadius: "14px",
    cursor: "pointer",
  },

  /* ── TEXTAREA & CODE ─────────────────────────── */
  textarea: {
    width: "100%",
    minHeight: isMobile ? "350px" : "550px",
    background: "rgba(255, 255, 255, 0.4)",
    borderRadius: "24px",
    padding: "24px",
    fontFamily: "'Fira Code', monospace",
    fontSize: "15px",
    color: "#1e293b",
    lineHeight: "1.7",
    resize: "none",
    border: "2px solid rgba(226, 232, 240, 0.5)",
    fontWeight: "500",
  },

  codeBlock: {
    width: "100%",
    minHeight: isMobile ? "350px" : "550px",
    background: "#0f172a",
    borderRadius: "24px",
    padding: "24px",
    fontFamily: "'Fira Code', monospace",
    fontSize: "15px",
    color: "#38bdf8",
    lineHeight: "1.7",
    overflow: "auto",
    margin: 0,
    whiteSpace: "pre-wrap",
    fontWeight: "500",
  },

};