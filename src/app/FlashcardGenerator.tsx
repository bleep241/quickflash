"use client"

import { invokeBot } from "./actions";
import { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Loader2, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/CardContainer";

export interface Flashcard {
  front: string;
  back: string;
}

export default function Home() {
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  // const [cards, setCards] = useState<string | undefined>('');

  const handleClick = async () => {
    setIsLoading(true);
    const info = await invokeBot(inputUrl);
    setIsLoading(false);
    console.log('INFO FROM THE BOT:', info);
    setFlashcards(info);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex justify-center flex-col items-center gap-5 mt-20">
          <div className="flex">
            <h1 className="font-bold text-3xl">QUICKFLA<Zap className="size-8 text-yellow-300 -mt-1 inline-block" />H</h1>
          </div>
          <div className="flex w-full gap-2 justify-center">
            <Input type="text" onChange={handleInput} placeholder="Enter url here..." className="w-[50%]" />
            <Button variant={"default"} disabled={isLoading} className="bg-blue-800 hover:bg-blue-900 transition duration-300" onClick={handleClick}>
              Generate flashcards
              {isLoading && <Loader2 className="size-4 animate-spin ml-2" />}
            </Button>
          </div>
        </div>
        <CardContainer isLoading={isLoading} flashcards={flashcards}/>
      </MaxWidthWrapper>
    </>
  );
}
