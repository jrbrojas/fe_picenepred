import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone,
    PiChartBarDuotone,
} from 'react-icons/pi'

import { AiTwotoneDashboard } from 'react-icons/ai'
import { LuMonitor } from 'react-icons/lu'
import { MdOutlineSearch } from "react-icons/md";

import { 
    FaUsers,
    FaChartSimple,
    FaListCheck,
    FaRegFile,
} from "react-icons/fa6";

import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    singleMenu: <PiAcornDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />,
    file: <FaRegFile />,
    dashboard: <AiTwotoneDashboard />,
    monitor: <LuMonitor />,
    search: <MdOutlineSearch />,
    users: <FaUsers />,
    chart: <PiChartBarDuotone />,
    list: <FaListCheck />,
}

export default navigationIcon
