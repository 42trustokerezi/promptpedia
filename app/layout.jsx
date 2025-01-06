import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Suspense } from "react";

export const metadata = {
  title: "Promptpedia",
  description: "Dsicover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Suspense fallback={null}>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <Nav />
              {children}
            </main>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
