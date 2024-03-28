import React from "react";
import { getAllDecks } from "../actions/actions";
import Link from "next/link";
export const dynamic = "force-dynamic";

const Decks = async () => {
  const decks = await getAllDecks();
  return (
    <div className="flex text-black gap-2 flex-wrap">
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
