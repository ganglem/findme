import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {

    return <div className="mx-16 space-y-10">
        <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full"/>
            <Skeleton className="w-full h-12 mx-auto"/>
        </div>
        <Skeleton className="w-full h-16 mx-auto"/>
        <div className="justify-center items-center flex flex-col space-y-6 py-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
    </div>
}