import { getFlashcardsByDeckId } from "@/app/actions/actions";
import React from "react";

const Deck = async ({ params }: { params: { id: number } }) => {
  1;
  const flashcards = await getFlashcardsByDeckId(params.id);
  return (
    <div>
      <h2></h2>Deck {params.id}
      <div>
        <div className=" flex flex-wrap gap-6">
          {flashcards.map((flashcard, index) => (
            <div key={index} className=" my-2 rounded-xl card">
              <div className="card-inner">
                <div className="card-front text-lg font-bold rounded-xl max-w-60 border p-2">
                  {flashcard.front}
                </div>
                <div className="card-back text-lg font-bold rounded-xl max-w-60 border p-2">
                  {flashcard.back}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deck;
