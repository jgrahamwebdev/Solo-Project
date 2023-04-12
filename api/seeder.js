
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import entries from "./data/entries.js";
import User from "./models/userModel.js";
import Entry from "./models/entryModel.js";
import connectDB from "./config/db.js";

dotenv.config()
connectDB()

//IMPORT DATA
const importData = async () => {
    try {
        await Entry.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const user = createdUsers[0]._id

        const sampleEntries = entries.map((entry) => {
            return { ...entry, user: user }
        })
        await Entry.insertMany(sampleEntries)

        console.log('Data imported successfully! ✅')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

//DESTORY DATA
const destroyData = async () => {
    try {
        await Entry.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed! ⛔️')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}




