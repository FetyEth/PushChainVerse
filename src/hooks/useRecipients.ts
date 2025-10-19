import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { supabase } from "@/integrations/supabase/client";

export interface Recipient {
  id: string;
  user_address: string;
  recipient_address: string;
  nickname: string | null;
  transaction_count: number;
  last_transaction_at: string;
  created_at: string;
}

export function useRecipients() {
  const { address } = useAccount();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipients = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("recipients")
        .select("*")
        .eq("user_address", address.toLowerCase())
        .order("last_transaction_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecipients(data || []);
    } catch (err) {
      console.error("Error fetching recipients:", err);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchRecipients();
  }, [fetchRecipients]);

  const addRecipient = async (recipientAddress: string, nickname?: string) => {
    if (!address) return;
    try {
      const { error } = await supabase.from("recipients").upsert(
        {
          user_address: address.toLowerCase(),
          recipient_address: recipientAddress.toLowerCase(),
          nickname: nickname || null,
          last_transaction_at: new Date().toISOString(),
        },
        { onConflict: "user_address,recipient_address" }
      );

      if (error) throw error;
      await fetchRecipients();
    } catch (err) {
      console.error("Error adding recipient:", err);
    }
  };

  const removeRecipient = async (recipientId: string) => {
    try {
      const { error } = await supabase.from("recipients").delete().eq("id", recipientId);
      if (error) throw error;
      setRecipients((prev) => prev.filter((r) => r.id !== recipientId));
    } catch (err) {
      console.error("Error removing recipient:", err);
    }
  };

  return { recipients, loading, addRecipient, removeRecipient };
}
