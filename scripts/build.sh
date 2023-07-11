npm install
npm run build

apt install nginx

mkdir /var/www/
scp -r ./build/* /var/www/build/

# Update ngnix config

service nginx stop
service nginx start