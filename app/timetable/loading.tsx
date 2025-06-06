import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {

    return <div className="flex flex-col space-y-6">
        <div className="flex flex-row w-full space-x-4 pt-2">
            <Skeleton className="h-10 flex-1"/>
            <Skeleton className="h-10 flex-1"/>
            <Skeleton className="h-10 flex-1"/>
        </div>
        <div className="flex flex-wrap gap-4">
            {[...Array(7)].map((_, index) => {
                const width = Math.floor(Math.random() * 100) + 100;
                console.log(`Width for skeleton ${index}: ${width}px`);
                return <Skeleton key={index} className={`h-10`} style={{width}}/>
            })}
        </div>
        <Skeleton className="h-52 w-full"/>
        <Skeleton className="h-64 w-full"/>
    </div>
}