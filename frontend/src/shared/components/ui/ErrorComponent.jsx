import errorIllustration from "/images/error_icon2.png";

export default function ErrorComponent({
  code = "ERR_500 · INTERNAL_SERVER_ERROR",
  title = "Something went wrong",
  message = "We ran into an unexpected error while processing your request. Our team has been notified. Please try again or go back home.",
  detail = "TypeError: Cannot read properties of undefined (reading 'data')\nat fetchUser · api/users.ts:42:18",
  onRetry,
  onHome,
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "320px",
      padding: "2rem 1.25rem",
      textAlign: "center",
      fontFamily: "inherit",
    }}>
      
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: "1rem" }}>
        <img src={errorIllustration} alt="Error" style={{ width: 80, height: 80 }} />
      </div>

      <span style={{
        display: "inline-block", marginBottom: "0.75rem",
        padding: "0.2rem 0.6rem", borderRadius: "calc(var(--radius) / 2)",
        border: "1px solid var(--color-primary)",
        background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
        color: "var(--color-primary)", fontFamily: "monospace",
        fontSize: "0.65rem", letterSpacing: "0.07em",
      }}>
        {code}
      </span>

      {/* Title */}
      <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text)", margin: "0 0 0.35rem" }}>
        {title}
      </h2>

      {/* Message */}
      <p style={{
        fontSize: "0.8rem", color: "var(--color-text-muted)",
        lineHeight: 1.6, maxWidth: "320px", margin: "0 0 1.25rem",
      }}>
        {message}
      </p>

      {/* Actions */}
      {(onRetry || onHome) && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: detail ? "1.25rem" : 0 }}>
          {onRetry && (
            <button onClick={onRetry} style={{
              padding: "0.45rem 1.1rem", borderRadius: "var(--radius)", border: "none",
              background: "var(--color-primary)", color: "#fff",
              fontSize: "0.8rem", fontWeight: 500, fontFamily: "inherit", cursor: "pointer",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--color-primary-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--color-primary)"}
            >
              Try again
            </button>
          )}
          {onHome && (
            <button onClick={onHome} style={{
              padding: "0.45rem 1.1rem", borderRadius: "var(--radius)",
              border: "1px solid var(--color-border)", background: "var(--color-surface)",
              color: "var(--color-text-muted)", fontSize: "0.8rem", fontWeight: 500,
              fontFamily: "inherit", cursor: "pointer",
            }}>
              Go home
            </button>
          )}
        </div>
      )}

      {/* Detail / stack trace */}
      {detail && (
        <pre style={{
          padding: "0.6rem 1rem", borderRadius: "var(--radius)",
          border: "1px solid var(--color-border)", background: "var(--color-surface)",
          fontFamily: "monospace", fontSize: "0.65rem", color: "var(--color-text-muted)",
          textAlign: "left", lineHeight: 1.7, maxWidth: "360px", width: "100%",
          whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0,
        }}>
          {detail}
        </pre>
      )}

      <style>{`@keyframes ping { 75%,100% { transform: scale(1.6); opacity: 0; } }`}</style>
    </div>
  );
}