// context/TourContext.tsx
import { createContext, useContext, useState, useMemo, useEffect } from "react";

const TourContext = createContext(undefined);

export const TourProvider = ({ children }) => {
  const [triggerTour, setTriggerTour] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setTriggerTour(true);
    }
  }, []);

  const value = useMemo(() => ({ triggerTour, setTriggerTour }), [triggerTour]);

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour must be used within TourProvider");
  return context;
};
