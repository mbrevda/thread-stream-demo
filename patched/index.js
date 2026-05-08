import { fileURLToPath } from 'url'

    ; (async () => {
        const { default: pino } = await import('pino')

        const transportPath = fileURLToPath(import.meta.resolve('./my-transport.js'))

        const transport = pino.transport({
            target: transportPath
        })

        const logger = pino(transport)

        logger.info('hello from patched thread-stream')
        logger.info('this message uses a threaded transport')

        setTimeout(() => {
            logger.info('done')
        }, 500)

        setTimeout(() => {
            process.exit(0)
        }, 1000)
    })()