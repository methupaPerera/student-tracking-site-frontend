"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/context/Session";

export default function Home() {
    const session = useSession();

    console.log(session);

    return (
        <div>
            <Button>Hello {session?.user?.name}</Button>
        </div>
    );
}
