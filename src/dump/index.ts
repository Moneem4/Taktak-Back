import * as child from 'child_process'
import * as formatDate from 'dateformat'
<<<<<<< HEAD
// mongorestore --host hostname.com --port 27017 --username user --password pass mongodump/db/
=======
// mongorestore --host hostname.com --port 27019 --username user --password pass mongodump/db/
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c

import {
	MLAB_HOST,
	MLAB_PORT,
	MLAB_DATABASE,
	MLAB_USER,
	MLAB_PASS
} from 'environments'

enum fileType {
	JSON,
	CSV,
	TSV
}

const collection = 'users'
const now = formatDate(new Date(), 'yyyy/mm/dd') || new Date().toISOString()
const out = `./backup/${now}/${collection}.json`

// mongoexport
export const dump: child.ChildProcess = child.exec(
	`mongoexport -h ${MLAB_HOST}:${MLAB_PORT} -d ${MLAB_DATABASE} -c ${collection} -u ${MLAB_USER} -p ${MLAB_PASS} -o ${out}`,
	() => {
		console.log(`Success.`)
	}
)
