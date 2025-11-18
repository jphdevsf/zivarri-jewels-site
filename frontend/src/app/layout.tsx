// import type { Metadata } from "next";
import { Roboto, EB_Garamond } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { getCmsData } from '@/lib/cms/getCmsData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'
import Navigation from '@/components/Navigation'
import type { GlobalSettingResponse } from '@/types/CMSResponse'
import { ThemeProvider } from 'next-themes'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
})

const eb_garamond = EB_Garamond({
  variable: '--font-eb_garamond',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
})

const walkwayExpand = localFont({
  src: [
    {
      path: '../../public/fonts/Walkway-Expand.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-walkway-expand',
  display: 'swap',
})

const walkwayExpandBlack = localFont({
  src: [
    {
      path: '../../public/fonts/Walkway-Expand-Black.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-walkway-expand-black',
  display: 'swap',
})

const walkwayBold = localFont({
  src: [
    {
      path: '../../public/fonts/Walkway-Expand-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-walkway-expand-bold',
  display: 'swap',
})

const EauBook = localFont({
  src: [
    {
      path: '../../public/fonts/eau_sans_book_lng.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-eau_sans_book_lng',
  display: 'swap',
})

const EauBold = localFont({
  src: [
    {
      path: '../../public/fonts/eau_sans_bold_lng.woff2',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--font-eau_sans_bold_lng',
  display: 'swap',
})

const EauBlack = localFont({
  src: [
    {
      path: '../../public/fonts/eau_sans_black_lng.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-eau_sans_black_lng',
  display: 'swap',
})

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const res = await getCmsData<GlobalSettingResponse>('global-setting', {
    populate: {
      logo: {
        populate: '*'
      },
      navigation: {
        populate: 'links'
      }
    }
  })
  const globalSetting = res.data as GlobalSettingResponse
  const logo = globalSetting?.logo
  const navigation = globalSetting?.navigation
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${eb_garamond.variable} ${walkwayExpand.variable} ${walkwayExpandBlack.variable} ${walkwayBold.variable} ${EauBook.variable} ${EauBold.variable} ${EauBlack.variable} antialiased bg-background-secondary dark:bg-background-secondary-dark transition-all duration-300`}
      >
        <ThemeProvider attribute='class' enableSystem defaultTheme='system'>
          <Header>
            <Logo logo={logo} />
            <Navigation navigation={navigation} />
          </Header>
          {children}
          <Footer>
            <p className='block text-xs'>
              © 2025 Zivarri Jewels
              &nbsp;| <a href="/privacy-policy" className='inline underline'>Privacy Policy</a>
              &nbsp;| <a href="/terms-of-use" className='inline underline'>Terms of Use</a>
              &nbsp;| <a href="/disclaimer" className='inline underline'>Disclaimer</a>
              &nbsp;| <a href="/accessibility" className='inline underline'>Accessibility</a>
            </p>
          </Footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
