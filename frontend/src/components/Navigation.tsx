import type { GlobalSettingResponse } from '@/types/CMSResponse'

const Navigation = ({ navigation }: { navigation?: GlobalSettingResponse['navigation'] }) => {
  return (
    <nav>
      <ul className="flex">
        {navigation?.flatMap(nav =>
          nav.links?.map(link => (
            <li key={link.id}>
              <a href={link.url} className="px-4 py-4 block text-secondary dark:text-secondary-dark">{link.title}</a>
            </li>
          )) || []
        )}
      </ul>
    </nav>
  )
}

export default Navigation
