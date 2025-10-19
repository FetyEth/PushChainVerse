import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRecipients } from "@/hooks/useRecipients";

export function RecipientAddressInput({ value, onChange }) {
  const { recipients, loading } = useRecipients();
  const [open, setOpen] = useState(false);

  const sortedRecipients = useMemo(
    () => recipients.sort((a, b) => b.transaction_count - a.transaction_count),
    [recipients]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          placeholder="Enter address or click to choose recipient"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          className="font-mono"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-2">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading recipients...</p>
        ) : sortedRecipients.length === 0 ? (
          <p className="text-sm text-muted-foreground">No saved recipients yet</p>
        ) : (
          sortedRecipients.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                onChange(r.recipient_address);
                setOpen(false);
              }}
              className="p-2 hover:bg-muted rounded-md cursor-pointer"
            >
              <p className="font-medium text-sm">{r.nickname || "Unnamed"}</p>
              <p className="text-xs text-muted-foreground font-mono">{r.recipient_address}</p>
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
