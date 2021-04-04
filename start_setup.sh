# Setup file
#cd /home/ec2-user/app/web-application/angular
#npm install -g --silent
#npm link -g --silent @angular/cli
#npm install -g --silent @angular/cli@latest
#ng update
#ng update @angular/cli @angular/core --allow-dirty --force
#npm run build -- --prod

cd /home/ec2-user/app/web-application/node
#npm install -g --silent
sudo pm2 restart index.js
