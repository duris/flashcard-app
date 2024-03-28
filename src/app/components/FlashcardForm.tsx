"use client";
import React, { FormEvent } from "react";
import { createFlashcard, getOrCreateDeck } from "../actions/actions";

interface Flashcard {
  front: string;
  back: string;
}

const FlashcardForm = () => {
  const [flashcardData, setFlashcardData] = React.useState<string>("");
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);
  const [deckName, setDeckName] = React.useState<string>("");

  const generateFlashcards = (e: FormEvent) => {
    e.preventDefault();

    const cardPattern = /front: (.+?)\nback: '(.+?)',/g;
    let match;
    const generatedFlashcards: Flashcard[] = [];

    while ((match = cardPattern.exec(flashcardData)) !== null) {
      const front = match[1].trim();
      const back = match[2].trim().replace(/',?$/, ""); // Remove trailing commas or quotes
      generatedFlashcards.push({
        front: match[1].trim(),
        back: match[2].trim().replace(/',?$/, ""), // Remove trailing commas or quotes
      });
    }

    setFlashcards(generatedFlashcards);
  };

  const saveDeck = async () => {
    const deckId = await getOrCreateDeck(deckName);
    flashcards.forEach(async (flashcard) => {
      await createFlashcard(flashcard.front, flashcard.back, deckId);
    });
  };

  return (
    <>
      {flashcards.length > 0 ? (
        <button onClick={saveDeck} className="bg-blue-400 p-2">
          Save Deck
        </button>
      ) : (
        " "
      )}
      <form onSubmit={generateFlashcards} className=" flex flex-col">
        <label className="text-lg font-bold">Flashcard Deck Name</label>
        <input
          className="border w-[400px] text-black"
          placeholder="Enter Flashcard Deck Name"
          onChange={(e) => setDeckName(e.target.value)}
        />
        <label className="text-lg font-bold">Flashcard Content</label>
        <textarea
          onChange={(e) => setFlashcardData(e.target.value)}
          className="border w-[400px] h-[300px] text-black"
          placeholder={`Paste Your Flashcard content here, 
       format:
       front: 'What is the capital of France'?
       back: 'Paris',
       front: 'What is the capital of Germany?'
       back: 'Berlin',`}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      <h2>{deckName}</h2>
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
    </>
  );
};

export default FlashcardForm;
