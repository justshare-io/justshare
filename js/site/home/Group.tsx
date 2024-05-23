import {useAuth} from "@/auth/state";
import {useParams} from "react-router";
import {useEffect} from "react";
import {SourcePage} from "@/source/SourcePage";
import {AuthForm} from "@/auth/AuthForm";
import {TemplatePlayground} from "@/source/editors/TemplatePlayground";

export function Group() {
    const { user, loginResponse , tryLogin} = useAuth();
    const { groupID } = useParams();

    useEffect(() => {
        // TODO breadchris use loginResponse.expires to calculate when to refresh session
        void tryLogin();
    }, []);

    return (
        <div className="h-screen flex flex-col gap-4 w-full p-5">
            {user ? <GroupPage /> : <AuthForm allowRegister={true} />}
        </div>
    )
}

export function GroupPage() {
    // set a width and horizontal center the content
    return (
        <div className="w-1/2 mx-auto">
            <textarea className="w-full h-20 textarea" placeholder="Group Name" />
            <ul className="timeline timeline-vertical">
                <li>
                    <div className="timeline-start timeline-box">First Macintosh computer</div>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">iMac</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-start timeline-box">iPod</div>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">iPhone</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-start timeline-box">Apple Watch</div>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                </li>
            </ul>
        </div>
    )
}
