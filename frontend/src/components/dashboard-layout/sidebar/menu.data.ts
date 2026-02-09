import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { AlarmClock, CalendarDays, Cog, Kanban, LayoutDashboard } from 'lucide-react'
import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard'
	},
		{
		icon: Kanban,
		link: DASHBOARD_PAGES.TASK,
		name: 'Task'
	},
		{
		icon: AlarmClock,
		link: DASHBOARD_PAGES.TIMER,
		name: 'Timer Pomodoro'
	},
		{
		icon: CalendarDays,
		link: DASHBOARD_PAGES.TIME_BLOCKING,
		name: 'Time Blocking'
	},
			{
		icon: Cog,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings'
	},
]