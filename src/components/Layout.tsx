import { ReactNode } from "react";
import Navbar from "./Navbar";
import ChatbotButton from "./ChatbotButton";
import EmergencyHospitalFinderButton from "./EmergencyHospitalFinderButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
      <ChatbotButton />
      <EmergencyHospitalFinderButton />
    </div>
  );
};

export default Layout;
