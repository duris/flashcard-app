import Image from "next/image";
import FlashcardForm from "./components/FlashcardForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FlashcardForm />
    </main>
  );
}
