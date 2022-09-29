const dotenv = require('dotenv');

dotenv.config({ path: './src/config/.env' });

const envFound = dotenv.config({ path: './src/config/.env' });
// console.log(envFound.error);
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
