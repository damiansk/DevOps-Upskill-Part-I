# Install node
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
apt install nodejs

# Create client app build
npm install
npm run build

#Setup ngnix
apt install nginx
# TODO pdate ngnix config

# Copy client app build to the correct place (switch to the S3)
mkdir /var/www/
scp -r ./build/* /var/www/build/

# Start ngnix service
service nginx stop
service nginx start