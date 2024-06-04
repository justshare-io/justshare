import {Toaster} from "react-hot-toast";
import {BrowserRouter, useRoutes} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import {FallbackError} from "@/react/FallbackError";
import {Join} from "@/auth/JoinGroupPage";
import React from "react";
import {Home} from "@/home/Home";
import {ChatPage} from "@/chat/ChatPage";
import {VerifyPage} from "@/auth/VerifyPage";
import {Provider} from "jotai";
import {Admin} from "@/admin/Admin";
import {TemplatePlayground} from "@/source/editors/TemplatePlayground";
import {Group} from "@/home/Group";
import {WebsiteEditor} from "@/source/editors/WebsiteEditor";
import {CodeEditor} from "@/source/editors/CodeEditor";

const AppRoutes = () => {
    const commonRoutes = [
        { path: '/app', element: <Home /> },
        { path: '/app/content', element: <Home /> },
        { path: '/app/web', element: <WebsiteEditor /> },
        { path: '/app/web/:id', element: <WebsiteEditor />},
        { path: '/app/code', element: <CodeEditor /> },
        { path: '/app/group/:groupID', element: <Group /> },
        { path: '/app/group/join/:secret', element: <Join /> },
        { path: '/app/chat', element: <ChatPage /> },
        { path: '/app/verify/:secret', element: <VerifyPage /> },
        { path: '/app/content/:id', element: <Home /> },
        { path: '/app/admin', element: <Admin /> }
    ];

    const element = useRoutes([...commonRoutes]);

    return <>
        {element}
    </>;
};

export const App: React.FC<{dev: boolean}> = ({dev}) => {
  return (
      <ErrorBoundary
          FallbackComponent={FallbackError}
      >
          <Provider>
              <BrowserRouter>
                  <AppRoutes/>
              </BrowserRouter>
              <Toaster/>
          </Provider>
      </ErrorBoundary>
  )
}
