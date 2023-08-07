import { FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MdOutlineWbSunny } from 'react-icons/md'
const daisyTheme = [
  'mytheme',
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
]

interface ChangeThemeProps {
  changeTheme: (theme: string) => void
}
const ChangeTheme: FC<ChangeThemeProps> = ({ changeTheme }) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-50 ml-2 ">
      <Menu.Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <MdOutlineWbSunny className=" text-2xl text-base-100 hover:text-secondary" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 h-[200px] scroll_y ">
            {daisyTheme.map((theme) => (
              <Menu.Item key={theme}>
                {({ active }) => (
                  <button
                    onClick={() => changeTheme(theme)}
                    className={`${
                      active ? ' bg-warning text-secondary' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {theme}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ChangeTheme
