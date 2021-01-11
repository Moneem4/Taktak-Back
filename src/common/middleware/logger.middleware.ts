// import chalk from 'chalk'
// import { logger } from '../wiston'
import { Logger } from '@nestjs/common'

export function LoggerMiddleware(req, res, next) {
	// logger.debug(`💬  ${req.headers['user-agent']}`)
<<<<<<< HEAD
	Logger.debug(
=======
	console.debug(
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		`💬  ${
			req.headers['user-agent']
				? req.headers['user-agent'].split(') ')[0]
				: req.headers
		})`,
		'Bootstrap',
		false
	)
	next()
}
