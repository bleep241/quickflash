"use client"

import { Button } from "@/components/ui/button";
import { invokeBot, testJina } from "./actions";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [cardInfo, setCardInfo] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
   const info = await invokeBot();
   setIsLoading(false);
    console.log('INFO FROM THE BOT:', info);
   setCardInfo(info);
  };

  const handleJinaClick = async () => {
    setIsLoading(true);
   const info = await testJina();
   setIsLoading(false);
    console.log('INFO FROM THE JINA READER:', info);
  //  setCardInfo(info);
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <Card className="w-[750px]">
          <CardContent className="">
            <CardHeader>
              <CardTitle>
                Card Info:
              </CardTitle>
            </CardHeader>
            <CardDescription>
              {cardInfo}
            </CardDescription>
          </CardContent>
          <CardFooter>

        <Button disabled={isLoading} variant={"outline"} onClick={handleClick}>
          {isLoading && <Loader2 className="size-4 animate-spin mr-2" />}
          Ask away
          </Button>

        <Button disabled={isLoading} variant={"outline"} onClick={handleJinaClick}>
          {isLoading && <Loader2 className="size-4 animate-spin mr-2" />}
          Test Jina
          </Button>
        </CardFooter>
        </Card>
      </div>
    </>
  );
}
