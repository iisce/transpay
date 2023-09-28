import React from 'react';
import {
	SIDEBAR_LINKS,
	SIDEBAR_LINKS_ADMIN,
	SIDEBAR_LINKS_AGENT,
} from '@/lib/consts';
import { ModeToggle } from '../dark-mode-toggle';
import { Separator } from '../ui/separator';
import { NavbarButton } from './navbar-button';
import { getSSession } from '@/lib/get-data';
import { getAgentMe } from '@/lib/controllers/agent-controller';
import { getAdminMe } from '@/lib/controllers/admin-controller';

export default async function Sidebar() {
	const { role } = await getSSession();
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: await getAdminMe();
	if (role) {
		return (
			<div className='px-5 min-w-[200px] bg-secondary hidden sm:flex justify-between'>
				<div className='flex flex-col gap-3 pt-10 h-full w-full'>
					{(user?.role.toLowerCase() === 'agent'
						? SIDEBAR_LINKS_AGENT
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
