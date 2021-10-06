import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function FilterOption() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Menu as='div' className='relative z-20 inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-white bg-green-600 rounded-md bg-opacity-50 hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 font-secondary text-sm md:text-base font-bold'>
            Filters
            <ChevronDownIcon
              className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-gray-600' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    ) : (
                      <EditInactiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    )}
                    Oldest Data
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-gray-600' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DuplicateActiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    ) : (
                      <DuplicateInactiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    )}
                    Newest Data
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-gray-600' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DuplicateInactiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    ) : (
                      <DuplicateInactiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    )}
                    Most Upvoted
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-gray-600' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    ) : (
                      <EditActiveIcon
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                      />
                    )}
                    Least Upvoted
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
      />
    </svg>
  );
}
