import { cn } from "@/lib/utils";
import { statusMeta, type BookingStatus } from "@/data/mockData";

export const StatusBadge = ({
  status,
  className,
}: {
  status: BookingStatus;
  className?: string;
}) => {
  const { label, tone } = statusMeta[status];
  const toneClasses: Record<typeof tone, string> = {
    warning: "bg-warning/15 text-warning-foreground border-warning/30",
    success: "bg-success/15 text-success border-success/30",
    destructive: "bg-destructive/10 text-destructive border-destructive/25",
    muted: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        tone === "warning" && "bg-warning",
        tone === "success" && "bg-success",
        tone === "destructive" && "bg-destructive",
        tone === "muted" && "bg-muted-foreground"
      )} />
      {label}
    </span>
  );
};
