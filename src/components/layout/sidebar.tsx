import React from 'react';
import {
	SIDEBAR_LINKS,
	SIDEBAR_LINKS_ADMIN,
	SIDEBAR_LINKS_AGENT,
	SIDEBAR_LINKS_GREEN,
} from '@/lib/consts';
import { ModeToggle } from '../dark-mode-toggle';
import { Separator } from '../ui/separator';
import { NavbarButton } from './navbar-button';
import { getSSession } from '@/lib/get-data';
import { getAgentMe, getGreenAgent } from '@/lib/controllers/agent-controller';
import { getAdminMe } from '@/lib/controllers/admin-controller';

export default async function Sidebar() {
	const { role } = await getSSession();
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: role?.toLowerCase() === 'greenengine_agent'
			? await getGreenAgent()
			: await getAdminMe();
	if (role) {
		return (
			<div className='px-5 fixed w-52 h-full bg-secondary hidden md:flex justify-between z-10'>
				<div className='flex flex-col gap-3 pt-20 h-full w-full'>
					{(user?.role.toLowerCase() === 'agent'
						? SIDEBAR_LINKS_AGENT
						: user?.role.toLowerCase() === 'greenengine_agent'
						? SIDEBAR_LINKS_GREEN
						: user?.role.toLowerCase() === 'admin'
						? SIDEBAR_LINKS_ADMIN
						: SIDEBAR_LINKS
					).map((link, i) => (
						<NavbarButton
							key={i}
							title={link.title}
							href={link.href}
							icon={link.icon}
						/>
					))}
					<Separator />
					<ModeToggle />
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}
