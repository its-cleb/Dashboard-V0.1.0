import { Roboto } from "next/font/google"
import dynamic from 'next/dynamic'
import "./globals.css"
import "./styles.css"

const roboto = Roboto({ weight: ['400', '500', '700', '900'], subsets: ["latin"] })

const NavBar = dynamic(() => import('../components/navigation/navigationbar'), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="app">
          <NavBar>
            {children}
          </NavBar>
          
        </div>
      </body>
    </html>
  )
}
