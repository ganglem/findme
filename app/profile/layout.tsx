import Image from "next/image";
import {SignOutButton} from "@/components/auth/sign-out-button";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <Image
                    src="/images/icon.svg"
                    alt="Ikarus Festival Logo"
                    width={36}
                    height={36}
                    className="h-[3em] w-auto align-middle"
                />
                <h1 className="text-2xl font-bold">Mein Profil</h1>
                <SignOutButton/>
            </div>
            <div className="w-full flex flex-col justify-center pt-10">
                { children }
            </div>
        </div>
    )
}