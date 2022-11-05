import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const loadKakaoMap = () => {
    return `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
  };

  return (
    <Html>
      <Head>
        {/* Next PWA */}
        <link rel="manifest" href="manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="theme-color" href="#fff" />
        {/* MUI - Roboto font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        {/* MUI - Font icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <Script src={loadKakaoMap()} strategy="beforeInteractive"></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
