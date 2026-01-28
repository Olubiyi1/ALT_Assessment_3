import dotenv from "dotenv"
dotenv.config()

export default{
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    secret_key:process.env.SECRET_KEY,
    secret_super_key:process.env.SECRET_SUPER_KEY
}