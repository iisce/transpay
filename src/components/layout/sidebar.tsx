import {
	SIDEBAR_LINKS,
	SIDEBAR_LINKS_ADMIN,
	SIDEBAR_LINKS_AGENT,
	SIDEBAR_LINKS_GREEN,
	SIDEBAR_NO_USER,
} from '@/lib/consts';
import { ModeToggle } from '../dark-mode-toggle';
import { Separator } from '../ui/separator';
import { NavbarButton } from './navbar-button';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/options';

export default async function Sidebar() {
	const session = await getServerSession(options);
	const ROLE = session?.user.role;
	return (
		<div className='px-5 fixed w-52 h-full overflow-y-scroll bg-secondary hidden md:flex justify-between z-10'>
			<div className='flex flex-col gap-3 pt-20 h-full w-full'>
				{(ROLE?.toLowerCase() === 'agent'
					? SIDEBAR_LINKS_AGENT
					: ROLE?.toLowerCase() === 'greenengine_agent'
					? SIDEBAR_LINKS_GREEN
					: ROLE?.toLowerCase() === 'admin'
					? SIDEBAR_LINKS_ADMIN
					: ROLE?.toLowerCase() === 'superadmin'
					? SIDEBAR_LINKS
					: SIDEBAR_NO_USER
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
}
