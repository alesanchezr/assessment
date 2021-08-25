import "../../styles/globals.css";
import StoreProvider from "../store/StoreProvider";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;

// |-pages
//  |404.tsx
//  |app.tsx
//  |document.tsx
//  |error.tsx
//  |indext.tsx
