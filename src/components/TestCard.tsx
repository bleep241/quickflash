import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {}

const TestCard = (props: Props) => {
  return (
    <>
      <Card className="w-[50%] border-gray-900">
        <CardContent className="">
          <CardHeader>
            <CardTitle>
              Card Info:
            </CardTitle>
          </CardHeader>
          <CardDescription>
            {'blah'}
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
    </>
  )
}

export default TestCard