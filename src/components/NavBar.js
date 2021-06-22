import { Popover } from '@headlessui/react';
import { ChevronDoubleLeftIcon, SearchIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                {/* LOGO */}
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="https://www.iniciadossky.com/">
                      <img
                        className="block h-8 w-auto"
                        src="https://www.iniciadossky.com/assets/design2/icon-9fd5dfd8774cebef18ffb89ac5ca5553338227555753edb4670f561e6d7b2a38.png"
                        alt="Workflow"
                      />
                    </a>
                  </div>
                </div>
                {/* BACK BUTTON */}
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-8">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Buscar Oración o Mantra
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon
                            className="h-5 w-5 text-yellow-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                          placeholder="Buscar Oración o Mantra"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex mx-auto py-4 xl:col-span-2 xl:flex-row-reverse xl:mx-0">
                  <div className="flex items-center">
                    <button
                      className="bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-500 text-gray-600 text-sm"
                    >
                      <ChevronDoubleLeftIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
    </>
  )
}

export default NavBar;