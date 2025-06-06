import Image from "next/image";
import type React from "react";

export default function Layout({children}: { children: React.ReactNode }) {

    return <div className="space-y-6">
        <div className="flex items-center gap-3">
            <Image
                src="/images/icon.svg"
                alt="Ikarus Festival Logo"
                width={36}
                height={36}
                className="h-[3em] w-auto align-middle"
            />
            <h1 className="text-2xl font-bold">Live Tracker</h1>
        </div>
        { children }
    </div>
}