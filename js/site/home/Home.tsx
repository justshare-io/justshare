import {SourcePage} from "@/source/SourcePage";
import {useAuth} from "@/auth/state";
import {AuthForm} from "@/auth/AuthForm";
import {useEffect} from "react";

export function Home() {
    const { user, loginResponse , tryLogin} = useAuth();

    useEffect(() => {
        // TODO breadchris use loginResponse.expires to calculate when to refresh session
        void tryLogin();
    }, []);

    return (
        <div className="h-screen flex flex-col gap-4 w-full">
            {user ? <SourcePage /> : <AuthForm allowRegister={true} />}
        </div>
    )
}
