import { Fragment, useContext } from "react";
import moment from "moment";
import { Menu, Transition } from "@headlessui/react";
import cookie from "cookie";
import {
  ChatAltIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import {
  HomeIcon,
  ArchiveIcon,
  CollectionIcon,
} from "@heroicons/react/outline";
import { API_URL } from "../config/index";
import DOMPurify from "dompurify";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Categories", href: "#", icon: CollectionIcon, current: false },
  { name: "Saved Stories", href: "#", icon: ArchiveIcon, current: false },
];

const tabs = [
  { name: "All Stories", href: "/stories", current: true },
  { name: "Featured Stories", href: "/featured", current: false },
  { name: "Recent Stories", href: "/recent", current: false },
];

const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home({ stories, user }) {
  return user ? (
    <div className="relative min-h-screen bg-gray-100">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}

      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300"
            >
              <div className="pb-8 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
              <div className="pt-10"></div>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            <div className="px-4 sm:px-0">
              <div className="sm:hidden">
                <label htmlFor="question-tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="question-tabs"
                  className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav
                  className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                  aria-label="Tabs"
                >
                  {tabs.map((tab, tabIdx) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? "page" : undefined}
                      className={classNames(
                        tab.current
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-700",
                        tabIdx === 0 ? "rounded-l-lg" : "",
                        tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                        "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                      )}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.current ? "bg-green-500" : "bg-transparent",
                          "absolute inset-x-0 bottom-0 h-0.5"
                        )}
                      />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="sr-only">Recent questions</h1>
              <ul className="space-y-4">
                {stories?.map((question) => (
                  <Link href={`/stories/${question.id}`}>
                    <a>
                      <li
                        key={question.id}
                        className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg"
                      >
                        <article
                          aria-labelledby={"question-title-" + question.id}
                        >
                          <div>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  <a
                                    // href={question.author.href}
                                    className="hover:underline"
                                  >
                                    {question.authorUsername}
                                  </a>
                                </p>
                                <p className="text-sm text-gray-500">
                                  <a
                                    // href={question.href}
                                    className="hover:underline"
                                  >
                                    <time
                                      dateTime={moment(
                                        question.createdAt
                                      ).format("LL")}
                                    >
                                      {moment(question.createdAt).format("LL")}
                                    </time>
                                  </a>
                                </p>
                              </div>
                              <div className="flex-shrink-0 self-center flex">
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left"
                                >
                                  {({ open }) => (
                                    <>
                                      <div>
                                        <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                          <span className="sr-only">
                                            Open options
                                          </span>
                                          <DotsVerticalIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </Menu.Button>
                                      </div>

                                      <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                      >
                                        <Menu.Items
                                          static
                                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                          <div className="py-1">
                                            <Menu.Item>
                                              {({ active }) => (
                                                <a
                                                  href="#"
                                                  className={classNames(
                                                    active
                                                      ? "bg-gray-100 text-gray-900"
                                                      : "text-gray-700",
                                                    "flex px-4 py-2 text-sm"
                                                  )}
                                                >
                                                  <StarIcon
                                                    className="mr-3 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                  />
                                                  <span>Save story</span>
                                                </a>
                                              )}
                                            </Menu.Item>
                                            <Menu.Item>
                                              {({ active }) => (
                                                <a
                                                  href="#"
                                                  className={classNames(
                                                    active
                                                      ? "bg-gray-100 text-gray-900"
                                                      : "text-gray-700",
                                                    "flex px-4 py-2 text-sm"
                                                  )}
                                                >
                                                  <FlagIcon
                                                    className="mr-3 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                  />
                                                  <span>Report story</span>
                                                </a>
                                              )}
                                            </Menu.Item>
                                          </div>
                                        </Menu.Items>
                                      </Transition>
                                    </>
                                  )}
                                </Menu>
                              </div>
                            </div>
                            <h2
                              id={"question-title-" + question.id}
                              className="mt-4 text-base font-medium text-gray-900"
                            >
                              {question.title}
                            </h2>
                          </div>
                          <div
                            className="mt-2 text-sm text-gray-700 space-y-4"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(question.preview),
                            }}
                          />
                          <div className="mt-6 flex justify-between space-x-8">
                            <div className="flex space-x-6">
                              <span className="inline-flex items-center text-sm">
                                <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                  <ThumbUpIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span className="font-medium text-gray-900">
                                    {question.likes}
                                  </span>
                                  <span className="sr-only">likes</span>
                                </button>
                              </span>
                              <span className="inline-flex items-center text-sm">
                                <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                  <ChatAltIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span className="font-medium text-gray-900">
                                    {question.commentCount}
                                  </span>
                                  <span className="sr-only">Comments</span>
                                </button>
                              </span>
                              <span className="inline-flex items-center text-sm">
                                <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                  <EyeIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span className="font-medium text-gray-900">
                                    {/* {question.views} */}1
                                  </span>
                                  <span className="sr-only">views</span>
                                </button>
                              </span>
                            </div>
                            <div className="flex text-sm">
                              <span className="inline-flex items-center text-sm">
                                <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                  <ShareIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span className="font-medium text-gray-900">
                                    Share
                                  </span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </article>
                      </li>
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
          </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-4 space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2
                      id="who-to-follow-heading"
                      className="text-base font-medium text-black"
                    >
                      Who to follow
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        {whoToFollow.map((user) => (
                          <li
                            key={user.handle}
                            className="flex items-center py-4 space-x-3"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-black">
                                <a href={user.href}>{user.name}</a>
                              </p>
                              <p className="text-sm text-black">
                                <a href={user.href}>{"@" + user.handle}</a>
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-0.5 rounded-full bg-green-50 text-sm font-medium text-green-700 hover:bg-green-100"
                              >
                                <PlusIcon
                                  className="-ml-1 mr-0.5 h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                                <span>Follow</span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full block text-center px-4 py-2  shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  ) : null;
}

export async function getServerSideProps({ req }) {
  const { token } = cookie.parse(req?.headers?.cookie || "");
  const res = await fetch(`${API_URL}/stories`, {
    headers: {
      Authorization: token,
    },
  });
  const data = await res.json();

  console.log(data);
  return {
    props: {
      stories: data?.data?.stories || [],
    },
  };
}
