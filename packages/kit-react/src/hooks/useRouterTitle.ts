
import { useState, useEffect } from "react";
import { useMatches } from "react-router-dom";

interface TsRouteHandle {
  title?: string;
}

function useRouterTitle(): string {
  const matches = useMatches();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const handle = matches?.[1]?.handle as TsRouteHandle;
    setTitle(handle?.title || "");
    document.title = handle?.title ? `${handle.title} | React` : "React";
  }, [matches]);

  return title;
}

export default useRouterTitle;
