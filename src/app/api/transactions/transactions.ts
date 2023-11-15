import { TRANSACTIONS } from '../../../../data';

export const getTransactions = async (): Promise<IVehicleTransaction[]> =>
	TRANSACTIONS;
