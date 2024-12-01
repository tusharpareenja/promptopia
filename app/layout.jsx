import "@styles/globals.css";

import Nav from "@Components/Nav";
import Provider from "@Components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
       <Provider>
       <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>

       </Provider>
        
    
    </body>
  </html>
);

export default RootLayout;