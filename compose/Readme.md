first create ENV for Docker compose secret
then create image 
the up your image

https://medium.com/@leonfeng/set-up-a-secured-mongodb-container-e895807054bd


mongosh -u bitcoin -p bitcoin
use bitcoin
db.createUser({ user: "bitcoin", pwd: "bitcoin", roles: [{ role: "dbOwner", db: "bitcoin" }] }) 

docker exec bitcoin-mongo  mongosh /data/script.js -u bitcoin -p bitcoin --authenticationDatabase bitcoin

docker exec db_mongodb  mongo  use dvs
