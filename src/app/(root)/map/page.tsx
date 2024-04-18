import { getAllTrackerLocation } from '@/lib/controllers/tracker.controller';
import React from 'react';
import MapPreview from './map-preview';

export default async function MapsPage() {
	const allTrackerLocation = await getAllTrackerLocation([
		'867111060130538',
		'867111060130801',
		'867111060133243',
		'867111060133268',
		'867111060133391',
		'867111060318976',
		'867111060320394',
		'867111060320451',
		'867111060320642',
		'867111060320659',
	]);

	return (
		<div className='cover'>
			<MapPreview trackers={allTrackerLocation} />
		</div>
	);
}
