import { IconCaretDown, IconCaretRight, IconCircle1, IconHandMove, IconHome, IconLogout } from '@tabler/icons-react';
import { Button, FlowbiteTheme, Sidebar } from "flowbite-react";
import { FC, useState } from "react";

const customTheme: FlowbiteTheme["sidebar"] = {
    root: {
        base: "h-full",
        collapsed: {
            on: "w-16",
            off: "w-64",
        },
        inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-purple-800 px-3 py-4 dark:bg-gray-500",
    },
    collapse: {
        button: "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        icon: {
            base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            open: {
                off: "",
                on: "text-gray-900",
            },
        },
        label: {
            base: "ml-3 flex-1 whitespace-nowrap text-left",
            icon: {
                base: "h-6 w-6 transition delay-0 ease-in-out",
                open: {
                    on: "rotate-180",
                    off: "",
                },
            },
        },
        list: "space-y-2 py-2",
    },
    cta: {
        base: "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
        color: {
            blue: "bg-cyan-50 dark:bg-cyan-900",
            dark: "bg-dark-50 dark:bg-dark-900",
            failure: "bg-red-50 dark:bg-red-900",
            gray: "bg-alternative-50 dark:bg-alternative-900",
            green: "bg-green-50 dark:bg-green-900",
            light: "bg-light-50 dark:bg-light-900",
            red: "bg-red-50 dark:bg-red-900",
            purple: "bg-purple-50 dark:bg-purple-900",
            success: "bg-green-50 dark:bg-green-900",
            yellow: "bg-yellow-50 dark:bg-yellow-900",
            warning: "bg-yellow-50 dark:bg-yellow-900",
         },
    },
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-white hover:bg-purple-100 hover:text-gray-500 dark:text-white dark:hover:bg-gray-700",
        active: "bg-gray-100 dark:bg-gray-700",
        collapsed: {
            insideCollapse: "group w-full pl-8 transition duration-75",
            noIcon: "font-bold",
        },
        content: {
            base: "flex-1 whitespace-nowrap px-3 group-hover:text-gray-900",
        },
        icon: {
            base: "h-6 w-6 flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-500",
            active: "text-gray-700 dark:text-gray-500",
        },
        label: "",
        listItem: "",
    },
    items: {
        base: "",
    },
    itemGroup: {
        base: "h-full mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    },
    logo: {
        base: "mb-5 flex items-center pl-2.5",
        collapsed: {
            on: "hidden",
            off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
        },
        img: "mr-3 h-6 sm:h-7",
    },
};

const NavMap: FC = (): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isRoot, _setIsRoot] = useState(location.pathname === '/');


    return (
        <Sidebar aria-label="purple haze sidebar" collapsed={isCollapsed} className={`${isCollapsed ? 'w-30' : 'w-64'} bg-purple-500 h-full`} theme={customTheme}>
            <Sidebar.Items>
                <div id="collapse-icons" className="h-10 w-100 rounded-tr-xl">
                    <Button onClick={() => setIsCollapsed(!isCollapsed)} color="black" className='bg-black hover:text-black text-purple-500 hover:bg-purple-200 focus:ring-0'>
                        {
                            isCollapsed ? <IconCaretRight /> : <IconCaretDown />
                        }
                    </Button>
                </div>
                <Sidebar.ItemGroup>
                    {!isRoot && <Sidebar.Item href="/" icon={IconHome}>
                        Home
                    </Sidebar.Item>}
                    <Sidebar.Item href="/first" icon={IconCircle1}>
                        First
                    </Sidebar.Item>
                    <Sidebar.Item href="/hello" icon={IconHandMove}>
                        Hello
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className='bottom-0'>
                    <Sidebar.Item href={`/logout`} icon={IconLogout}>
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default NavMap;