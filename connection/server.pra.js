const sql = require('mssql') 
const config = {
    user: 'sa',
    password: 'bzknCuj6@6',
    //server: '172.24.4.197',
    port:29234,
    server: '203.154.39.197',
    database: 'Bot_DB',
     requestTimeout: 60*60*1000,
  
    pool: {
  max: 10,
  min: 0,
  idleTimeoutMillis: 3000000
},
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }

  };const poolPromise_rpa = new sql.ConnectionPool(config)  
.connect()  
.then(pool_ => {  
console.log('Connected to MSSQL PRA')  
return pool_  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  
module.exports = {  
sql, poolPromise_rpa  
} 