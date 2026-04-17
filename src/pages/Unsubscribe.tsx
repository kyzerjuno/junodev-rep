import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const ENDPOINT = `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`;

type State =
  | { kind: "validating" }
  | { kind: "valid" }
  | { kind: "already" }
  | { kind: "invalid"; message: string }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<State>({ kind: "validating" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid", message: "No unsubscribe token provided." });
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch(`${ENDPOINT}?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON_KEY },
        });
        const data = await resp.json().catch(() => ({}));
        if (cancelled) return;

        if (!resp.ok) {
          setState({
            kind: "invalid",
            message: data?.error || "This unsubscribe link is invalid or has expired.",
          });
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setState({ kind: "already" });
          return;
        }
        if (data.valid === true) {
          setState({ kind: "valid" });
          return;
        }
        setState({ kind: "invalid", message: "Unexpected response from server." });
      } catch (e) {
        if (!cancelled) {
          setState({
            kind: "invalid",
            message: "Could not reach the server. Please try again later.",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const confirmUnsubscribe = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ token }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setState({
          kind: "error",
          message: data?.error || "Could not process your unsubscribe.",
        });
        return;
      }
      if (data.success) {
        setState({ kind: "success" });
      } else if (data.reason === "already_unsubscribed") {
        setState({ kind: "already" });
      } else {
        setState({ kind: "error", message: "Unexpected response." });
      }
    } catch {
      setState({ kind: "error", message: "Could not reach the server." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="glass-card-glow w-full max-w-md p-8 md:p-10 text-center">
        {state.kind === "validating" && (
          <>
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold mb-2">Checking your link…</h1>
            <p className="text-muted-foreground text-sm">Just a moment.</p>
          </>
        )}

        {state.kind === "valid" && (
          <>
            <h1 className="font-heading text-2xl font-bold mb-3">Unsubscribe from emails?</h1>
            <p className="text-muted-foreground text-sm mb-6">
              You won't receive any more emails from JunoDev at this address.
            </p>
            <button
              onClick={confirmUnsubscribe}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium glow-button transition-all duration-300 hover:scale-[1.02]"
            >
              Confirm unsubscribe
            </button>
          </>
        )}

        {state.kind === "submitting" && (
          <>
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold mb-2">Unsubscribing…</h1>
          </>
        )}

        {state.kind === "success" && (
          <>
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold mb-2">You're unsubscribed</h1>
            <p className="text-muted-foreground text-sm">
              You won't receive any more emails from JunoDev.
            </p>
          </>
        )}

        {state.kind === "already" && (
          <>
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold mb-2">Already unsubscribed</h1>
            <p className="text-muted-foreground text-sm">
              This email address has already been unsubscribed.
            </p>
          </>
        )}

        {state.kind === "invalid" && (
          <>
            <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold mb-2">Invalid link</h1>
            <p className="text-muted-foreground text-sm">{state.message}</p>
          </>
        )}

        {state.kind === "error" && (
          <>
            <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground text-sm">{state.message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
