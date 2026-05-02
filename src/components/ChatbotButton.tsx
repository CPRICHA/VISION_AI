import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // When the iframe is visible, try to open the internal chat widget
  useEffect(() => {
    if (!isOpen) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const callToggle = () => {
      try {
        (iframe.contentWindow as any)?.toggleChatWidget?.();
      } catch {
        // ignore cross-origin or timing issues
      }
    };

    if (iframe.contentWindow && (iframe.contentWindow as any).toggleChatWidget) {
      callToggle();
    } else {
      const onLoad = () => {
        callToggle();
      };
      iframe.addEventListener("load", onLoad, { once: true });
      return () => iframe.removeEventListener("load", onLoad);
    }
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 bg-gradient-to-br from-primary to-accent z-50"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[450px] shadow-xl animate-scale-in rounded-xl overflow-hidden border border-border bg-background z-50">
          <iframe
            ref={iframeRef}
            src="/visionai_chatbot3_widget.html"
            title="VisionAI Eye Care Assistant"
            className="w-full h-full border-0"
          />
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
