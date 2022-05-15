import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useProjects from '../../hooks/useProjects';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Searcher = () => {

  const { projects, searcher, handleSearcher } = useProjects();

  const [search, setSearch] = useState('');

  const leakedProjects = search === '' ? [] : projects.filter(element => element.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Transition.Root show={searcher} as={Fragment} afterLeave={() => setSearch('')}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 pt-16 sm:p-20 md:p-20" onClose={handleSearcher}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          // onChange={(element) => (window.location = `/projects/${element._id}`)}
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent px-4 text-gray-800 placeholder-gray-400 rounded-xl focus:ring-0 sm:text-sm"
                placeholder="Proyecto"
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {leakedProjects.length > 0 && (
              <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                {
                  leakedProjects.map((element) => {
                    return (
                      <Combobox.Option
                        key={element._id}
                        value={element}
                        className={({ active }) => classNames(active && 'bg-sky-600 text-white')}
                      >
                        <Link
                          onClick={handleSearcher}
                          to={`/projects/${element._id}`}
                          className="flex flex-col cursor-pointer select-none px-4 py-2"
                        >
                          {element.name}
                        </Link>
                      </Combobox.Option>
                    )
                  })
                }
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default Searcher;