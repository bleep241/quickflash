import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-start">
      <Card className="w-full max-w-[160px]">
        <CardContent>
          <Skeleton className="w-full max-w-[200px] h-10 rounded-full" />
        </CardContent>
      </Card>
    </div>
  )
}