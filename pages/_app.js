import "../styles/global.css";

// Swiper.js
import "swiper/css";
import "swiper/css/effect-fade";

import Head from "next/head";
import { RecoilRoot } from "recoil";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RecoilRoot>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </RecoilRoot>
    </>
  );
}
