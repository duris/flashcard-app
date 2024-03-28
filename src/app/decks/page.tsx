import React from "react";
import { getAllDecks } from "../actions/actions";
import Link from "next/link";

const Decks = async () => {
  const decks = await getAllDecks();
  return (
    <div className="flex text-black gap-2">
      {decks
        ? decks.map((deck) => (
            <Link
              href={`decks/${deck.id}`}
              key={deck.id}
              className="p-4 border bg-white"
            >
              {deck.name}
            </Link>
          ))
        : "No decks found"}
    </div>
  );
};

export default Decks;
