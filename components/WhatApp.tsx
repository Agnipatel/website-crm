
import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918217794751"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-4 z-50 animate-pulse "
    >
      <div className=" rounded-full shadow-lg p-1 transition-transform duration-300 hover:scale-110">
        <Image
          src="/logow.png" 
          alt="WhatsApp"
          width={60}
          height={60}
          className="w-20 h-20 md:w-16 md:h-16"
          priority
        />
      </div>
    </a>
  );
}