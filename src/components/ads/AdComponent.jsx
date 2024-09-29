import React, { useEffect } from 'react';

const AdComponent = () => {
    useEffect(() => {
        const adsbygoogleScript = document.createElement("script");
        adsbygoogleScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4296713765104209";
        adsbygoogleScript.async = true;
        adsbygoogleScript.crossOrigin = "anonymous";
        document.body.appendChild(adsbygoogleScript);

        const initAd = () => {
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        };
        initAd();
    }, []);

    return (
        <div>
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4296713765104209"
                data-ad-slot="7264678352"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdComponent;
