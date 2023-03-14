
import db from "./models/index.cjs"


try {
    await db.sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await db.sequelize.sync({ force: true })
    console.log('Database & tables created!')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}