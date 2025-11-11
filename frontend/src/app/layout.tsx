// import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { getCmsData } from '@/lib/cms/getCmsData'
import Header from '@/components/Header'
import Logo from '@/components/Logo'
import Navigation from '@/components/Navigation'
import type { GlobalSettingResponse } from '@/types/CMSResponse'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
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
    <html lang="en">
      <body
        className={`${roboto.variable} ${walkwayExpand.variable} ${walkwayExpandBlack.variable} ${walkwayBold.variable} antialiased`}
      >
        <Header>
          <Logo logo={logo} />
          <Navigation navigation={navigation} />
        </Header>
        {children}
      </body>
    </html>
  )
}
