import { CronJob } from 'cron'
import { Logger } from '@nestjs/common'

/**
 * Returns any.
 *
 * @remarks
 * This method is part of the {@link shared/tasks}.
 *
 * @returns any
 *
 * @beta
 */
export const timeout = () => {
	const taskID = setTimeout(() => {
<<<<<<< HEAD
		Logger.debug('Task completed', 'Timeout', false)
=======
		console.debug('Task completed', 'Timeout', false)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
	}, 1000)
	// clearTimeout(taskID)
}

/**
 * Returns any.
 *
 * @remarks
 * This method is part of the {@link shared/tasks}.
 *
 * @returns any
 *
 * @beta
 */
export const interval = () => {
	const intervalID = setInterval(() => {
<<<<<<< HEAD
		Logger.debug('Task executed', 'Interval', false)
=======
		console.debug('Task executed', 'Interval', false)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
	}, 2000)
	// clearInterval(intervalID)
}

/**
 * Returns any.
 *
 * @remarks
 * This method is part of the {@link shared/tasks}.
 *
 * @returns any
 *
 * @beta
 */
export const cron = () => {
	const job = new CronJob({
		cronTime: '0 0 12 * * MON-FRI',
		onTick: () => {
<<<<<<< HEAD
			Logger.debug('Cron job completed', 'Cron', false)
=======
			console.debug('Cron job completed', 'Cron', false)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		},
		start: false,
		timeZone: 'Asia/Ho_Chi_Minh'
	})
	job.start()
}
