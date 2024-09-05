"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface LeaseContextType {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

const LeaseContext = createContext<LeaseContextType | undefined>(undefined);

interface LeaseProviderProps {
  children: ReactNode;
}

function LeaseProvider({ children }: LeaseProviderProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <LeaseContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </LeaseContext.Provider>
  );
}

function useLeaseContext() {
  const context = useContext<LeaseContextType | undefined>(LeaseContext);
  if (context === undefined) {
    throw new Error("useLeaseContext must be used within a LeaseProvider");
  }
  return context;
}

export { LeaseProvider, useLeaseContext };
