import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { getMostRecentResultId } from "@/lib/results/storage";

export type UnlockType = "resources" | "roadmap" | "todos" | "diagnosis" | "design-system";

interface EntryPointState {
  deviceId: string;
  attemptCount: number;
  unlocked: boolean;
  // Single-flow flag used by UI gating (persisted locally)
  hasAccess: boolean;
  // Paywall modal state
  isPaywallOpen: boolean;
  unlockType: UnlockType | null;
  isLoading: boolean;
  error: string | null;
}

interface EntryPointContextValue extends EntryPointState {
  canTakeQuiz: boolean;
  requirePayment: boolean;
  openPaywall: (unlockType: UnlockType) => void;
  closePaywall: () => void;
  markUnlocked: () => void;
  refreshStatus: () => Promise<void>;
  incrementAttempts: () => Promise<void>;
  startCheckout: (redirectTo?: string) => Promise<void>;
}

const EntryPointContext = createContext<EntryPointContextValue | undefined>(undefined);

const DEVICE_ID_KEY = "ux_quiz_device_id";
const ACCESS_FLAG_KEY = "uxlevel_hasAccess";
const API_BASE = "/api/premium";

// Helper to get or create device ID
function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  
  return deviceId;
}

export function EntryPointProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EntryPointState>({
    deviceId: "",
    attemptCount: 0,
    unlocked: false,
    hasAccess: false,
    isPaywallOpen: false,
    unlockType: null,
    isLoading: true,
    error: null,
  });

  // Fetch access status from backend
  const refreshStatus = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const deviceId = getOrCreateDeviceId();
      const response = await fetch(`${API_BASE}/access/status?deviceId=${encodeURIComponent(deviceId)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch access status");
      }
      
      const data = await response.json();
      const persistedAccess = localStorage.getItem(ACCESS_FLAG_KEY) === "true";
      
      setState({
        deviceId,
        attemptCount: data.attemptCount ?? 0,
        unlocked: data.premiumUnlocked ?? false,
        hasAccess: persistedAccess || (data.premiumUnlocked ?? false),
        isPaywallOpen: false,
        unlockType: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching access status:", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, []);

  // Increment attempt count
  const incrementAttempts = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/access/increment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: state.deviceId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to increment attempts");
      }
      
      const data = await response.json();
      
      setState(prev => ({
        ...prev,
        attemptCount: data.attemptCount ?? prev.attemptCount,
        unlocked: data.premiumUnlocked ?? prev.unlocked,
      }));
    } catch (error) {
      console.error("Error incrementing attempts:", error);
    }
  }, [state.deviceId]);

  // Paywall controls
  const openPaywall = useCallback((unlockType: UnlockType) => {
    setState(prev => ({ ...prev, isPaywallOpen: true, unlockType }));
  }, []);

  const closePaywall = useCallback(() => {
    setState(prev => ({ ...prev, isPaywallOpen: false }));
  }, []);

  const markUnlocked = useCallback(() => {
    localStorage.setItem(ACCESS_FLAG_KEY, "true");
    setState(prev => ({
      ...prev,
      unlocked: true,
      hasAccess: true,
      isPaywallOpen: false,
    }));
    // Success toast
    toast({
      title: "✅ Access unlocked",
      description: "Your full growth system is now available.",
    });
  }, []);

  // Start Razorpay checkout flow
  const startCheckout = useCallback(async (redirectTo?: string) => {
    try {
      // Check if Razorpay is loaded
      if (typeof (window as any).Razorpay === "undefined") {
        console.error("Razorpay checkout script not loaded");
        toast({
          title: "Payment Error",
          description: "Payment gateway not available. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      // Try to attach the most recent result ID so we can email a direct link
      let latestResultId: string | null = null;
      try {
        latestResultId = getMostRecentResultId();
      } catch (e) {
        console.warn("Unable to read most recent result ID:", e);
      }

      // Store device info for after payment
      const finalRedirectTo = redirectTo || window.location.pathname;
      sessionStorage.setItem("razorpay_redirectTo", finalRedirectTo);
      sessionStorage.setItem("razorpay_deviceId", state.deviceId);
      if (latestResultId) {
        sessionStorage.setItem("razorpay_resultId", latestResultId);
      }

      // Redirect to Razorpay Payment Link
      // Payment link: https://rzp.io/rzp/kfL1DqK
      const paymentLink = "https://rzp.io/rzp/kfL1DqK";
      
      // Add deviceId as a reference parameter (if payment link supports it)
      const paymentUrl = new URL(paymentLink);
      paymentUrl.searchParams.set("deviceId", state.deviceId);
      if (latestResultId) {
        paymentUrl.searchParams.set("resultId", latestResultId);
      }
      
      // Redirect to payment link
      window.location.href = paymentUrl.toString();
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  }, [state.deviceId, markUnlocked]);

  // Initialize on mount
  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const canTakeQuiz = state.unlocked || state.attemptCount < 2;
  const requirePayment = !state.unlocked && state.attemptCount >= 2;

  const value: EntryPointContextValue = {
    ...state,
    canTakeQuiz,
    requirePayment,
    openPaywall,
    closePaywall,
    markUnlocked,
    refreshStatus,
    incrementAttempts,
    startCheckout,
  };

  return (
    <EntryPointContext.Provider value={value}>
      {children}
    </EntryPointContext.Provider>
  );
}

export function useEntryPoint() {
  const context = useContext(EntryPointContext);
  
  if (context === undefined) {
    throw new Error("useEntryPoint must be used within an EntryPointProvider");
  }
  
  return context;
}

