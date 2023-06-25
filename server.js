//PACKAGES
const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const log4js = require('log4js')
const engine = require('ejs-mate')
const { Server: HttpServer } = require('http')

//INITIALIZATIONS
const app = express()
const httpServer = new HttpServer(app)
require('./database')

log4js.configure({
    appenders: {
        miLoggerConsole: { type: 'console' }
    },
    categories: {
        default: { appenders: ['miLoggerConsole'], level: 'trace' }
    }
})
const logger = log4js.getLogger()
logger.debug('Logger iniciado correctamente')

//MIDDLEWARES
app.set('views', 'src/views')
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
    secret: 'Secretadon',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//ROUTERS
app.use('/', require('./src/router/router'))

//PORT
const PORT = process.env.PORT || 8080

//SERVER
httpServer.listen(PORT, () => logger.info(`Servidor iniciado en el puerto ${PORT}`));

//ERROR
httpServer.on('error', error => logger.fatal('Error al iniciar el servidor '+error))