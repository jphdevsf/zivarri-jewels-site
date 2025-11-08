// import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { getCmsData } from '@/lib/cms/getCmsData'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import Image from 'next/image'
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
        <div className="flex justify-between items-center border-b border-gray-800 mb-4 p-4">
          {logo && logo.url && logo.width && logo.height && (
            <div className="w-full max-w-[72px] aspect-square rounded-full overflow-hidden">
              <Image
                src={toAbsoluteStrapiUrl(logo.url)!}
                alt={logo.alternativeText || 'Logo'}
                width={logo.width}
                height={logo.height}
                className="relative w-full h-full object-cover"
                unoptimized={true}
              />
            </div>
          )}
          <nav>
            <ul className="flex">
              {navigation?.flatMap(nav =>
                nav.links?.map(link => (
                  <li key={link.id}>
                    <a href={link.url} className="px-4 py-2 block">{link.title}</a>
                  </li>
                )) || []
              )}
            </ul>
          </nav>
        </div>
        {children}
      </body>
    </html>
  )
}
