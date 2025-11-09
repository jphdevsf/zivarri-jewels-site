// import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { getCmsData } from '@/lib/cms/getCmsData'
import Header from '@/components/Header'
import type { GlobalSettingResponse } from '@/types/CMSResponse'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header logo={logo} navigation={navigation} />
        {children}
      </body>
    </html>
  )
}
