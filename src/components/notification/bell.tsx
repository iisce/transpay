import React from 'react';
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from '@novu/notification-center';

export const Header = () => {
	return (
		<NovuProvider
			subscriberId={'on-boarding-subscriber-id-123'}
			applicationIdentifier={'Ey0jJ4-7jZ0V'} 
		>
			<PopoverNotificationCenter colorScheme={'light'}>
				{({ unseenCount }) => (
					<NotificationBell unseenCount={unseenCount} />
				)}
			</PopoverNotificationCenter>
		</NovuProvider>
	);
};
