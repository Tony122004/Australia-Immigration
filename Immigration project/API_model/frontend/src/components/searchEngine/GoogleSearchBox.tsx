import { useEffect } from "react";

export default function GoogleSearchBox() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=d1ffe5fa9697f4f7e";
    script.async = true;
    script.dataset.gcse = "true";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div className="gcse-search"></div>;
}