import { Suspense } from "react";
import { AuditView } from "@/components/AuditView";

export const dynamic = "force-dynamic";

export default function AuditFallback() {
  return (
    <Suspense fallback={<AuditLoading />}>
      <AuditView />
    </Suspense>
  );
}

function AuditLoading() {
  return (
    <div className="bg-bg min-h-[60vh] flex items-center justify-center">
      <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted flex items-center gap-3">
        <span className="w-2 h-2 bg-pink anim-blink" />
        loading audit…
      </div>
    </div>
  );
}
