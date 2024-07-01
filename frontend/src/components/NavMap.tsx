import { IconCaretDown, IconCaretRight, IconCircle1 } from '@tabler/icons-react';
import { Button, Sidebar } from "flowbite-react";
import { FC, useState } from "react";

const NavMap: FC = (): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(true);


    return (
        <>
            <Sidebar aria-label="purple haze sidebar" collapsed={isCollapsed} className={`${isCollapsed ? 'w-30' : 'w-64'}`}>
                <Sidebar.Items>
                    <div id="collapse-icons" className="h-10 w-100 rounded-tr-xl">
                        <Button onClick={() => setIsCollapsed(!isCollapsed)} className='bg-black text-purple-900 hover:bg-purple-900'>
                            {
                                isCollapsed ? <IconCaretRight /> : <IconCaretDown />
                            }
                        </Button>
                    </div>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/first" icon={IconCircle1}>
                            First
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    );
}

export default NavMap;