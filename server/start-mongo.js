const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

const startServer = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  
  console.log(`MongoDB Memory Server started at: ${uri}`);
  
  // Read current .env
  const envPath = path.join(__dirname, '.env');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Replace or add MONGO_URI
  if (envContent.includes('MONGO_URI=')) {
    envContent = envContent.replace(/MONGO_URI=.*/g, `MONGO_URI=${uri}`);
  } else {
    envContent += `\nMONGO_URI=${uri}`;
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('Updated .env with new MONGO_URI');
  
  // Keep the process alive
  process.stdin.resume();
};

startServer().catch(err => {
  console.error('Failed to start MongoDB Memory Server:', err);
  process.exit(1);
});
