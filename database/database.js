const sequilize = require('sequelize');
const connection = new sequilize('blogadm','root','Isvaldo123',{
    host:'localhost',
    dialect:'mysql',
    timezone:"+01:00"


});
module.exports=connection;

