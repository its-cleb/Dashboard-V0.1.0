import { Roboto } from "next/font/google"
import "./globals.css"

const roboto = Roboto({ weight: ['400', '500', '700', '900'], subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="app">
          {children}
        </div>
      </body>
    </html>
  )
}
