import type { GlobalSettingResponse } from '@/types/CMSResponse'
import Logo from './Logo'
import Navigation from './Navigation'

interface HeaderProps {
  logo?: GlobalSettingResponse['logo']
  navigation?: GlobalSettingResponse['navigation']
}

export default function Header({ logo, navigation }: HeaderProps) {
  return (
    <header className="flex justify-between items-center border-b border-gray-800 mb-4 p-4">
      <Logo logo={logo} />
      <Navigation navigation={navigation} />
    </header>
  )
}