// import type { Metadata } from "next";
import { Roboto, EB_Garamond } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { getCmsData } from '@/lib/cms/getCmsData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'
import Navigation from '@/components/Navigation'
import type { GlobalSettingResponse, NavigationHeaderResponse } from '@/types/CMSResponse'
import Link from 'next/link'
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper'

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
      }
    }
  })
  const globalSetting = res.data as GlobalSettingResponse
  const logo = globalSetting?.logo

  const navHeaderRes = await getCmsData('navigation-main', {
    populate: {
      links: {
        fields: ['title', 'url'],
        populate: '*'
      }
    }

  })
  const NavigationHeader = navHeaderRes.data as NavigationHeaderResponse
  const navigation = NavigationHeader.links
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${roboto.variable} ${eb_garamond.variable} ${walkwayExpand.variable} ${walkwayExpandBlack.variable} ${walkwayBold.variable} ${EauBook.variable} ${EauBold.variable} ${EauBlack.variable} antialiased bg-background-secondary dark:bg-background-secondary-dark transition-all duration-300`}
        suppressHydrationWarning
      >
        <ThemeProviderWrapper>
          <Header>
            <Logo logo={logo} />
            <Navigation links={navigation} />
          </Header>
          {children}
          <Footer>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; 2025 Zivarri Jewels. All rights reserved. &nbsp; | &nbsp;
              <Link href="/privacy-policy" className="inline underline">Privacy Policy</Link>
              &nbsp; | &nbsp;
              <Link href="/terms-of-use" className="inline underline">Terms of Use</Link>
              &nbsp; | &nbsp;
              <Link href="/disclaimer" className="inline underline">Disclaimer</Link>
              &nbsp; | &nbsp;
              <Link href="/accessibility" className="inline underline">Accessibility</Link>
            </p>
          </Footer>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
