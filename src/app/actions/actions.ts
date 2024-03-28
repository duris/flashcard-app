"use server";
import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { ssl: true });

export const createFlashcard = async (
  front: string,
  back: string,
  deckId: number
) => {
  await sql`insert into flashcards (front, back, deck_id) values (${front}, ${back}, ${deckId})`;
};

export const getOrCreateDeck = async (deckName: string) => {
  // Check if the deck exists and get its ID
  const existingDeck = await sql`SELECT id FROM deck WHERE name = ${deckName}`;

  if (existingDeck.length > 0) {
    // Return the existing deck's ID
    return existingDeck[0].id;
  } else {
    // Create a new deck and return its ID
    const result =
      await sql`INSERT INTO deck (name) VALUES (${deckName}) RETURNING id`;
    return result[0].id;
  }
};

export const getAllDecks = async () => {
  return await sql`SELECT * FROM deck`;
};

export const getFlashcardsByDeckId = async (deckId: number) => {
  return await sql`SELECT * FROM flashcards WHERE deck_id = ${deckId}`;
};
