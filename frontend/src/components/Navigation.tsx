import type { GlobalSettingResponse } from '@/types/CMSResponse'

interface NavigationProps {
  navigation?: GlobalSettingResponse['navigation']
}

export default function Navigation({ navigation }: NavigationProps) {
  return (
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
  )
}