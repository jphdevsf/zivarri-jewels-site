// import type { GlobalSettingResponse } from '@/types/CMSResponse'
// import Logo from './Logo'
// import Navigation from './Navigation'

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex justify-between items-center border-b border-gray-800 mb-4 p-4">
      {children}
    </header>
  )
}

export default Header
