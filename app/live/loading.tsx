import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";

export default function Loading() {

    return <div className="grid gap-4 items-start">
        <Card className="p-4">
            <div className="flex flex-row w-full h-full space-x-4">
                <Skeleton className="h-6 w-[50%]"/>
                <Skeleton className="h-24 w-[50%]"/>
            </div>
        </Card>
        {[0, 1, 2, 3].map(() => <Card className="p-4">
            <div className="flex flex-row w-full h-full space-x-4">
                <div className="flex flex-col h-full w-[50%]">
                    <Skeleton className="h-6 w-full mb-2"/>
                    <Skeleton className="h-24 w-full "/>
                </div>
                <div className="flex flex-col h-full flex-1">
                    <Skeleton className="h-20 w-full mb-2" />
                    <div className="flex flex-row w-full justify-center">
                        <Skeleton className="h-10 w-10 rounded-full"/>
                        <Skeleton className="h-10 w-10 rounded-full"/>
                        <Skeleton className="h-10 w-10 rounded-full"/>
                    </div>
                </div>
            </div>
        </Card>)}
    </div>
}