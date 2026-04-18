import { AntdRegistry } from '@ant-design/nextjs-registry'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata = {
  title: { default: '1GbRam', template: '%s | 1GbRam' },
  description: 'Insights, tools, and guides for developers working with limited resources.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AntdRegistry>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  )
}
