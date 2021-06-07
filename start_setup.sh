# Setup file
#cd /home/ec2-user/app/web-application/angular
#npm install -g --silent
#npm link -g --silent @angular/cli
#npm install -g --silent @angular/cli@latest
#ng update
#ng update @angular/cli @angular/core --allow-dirty --force
#npm run build -- --prod

# cd /home/ec2-user/app/web-application/node
# #npm install -g --silent
# sudo pm2 stop index.js
# sudo pm2 start ecosystem.config.js
# sudo systemctl restart nginx
# cd /home/ec2-user/app/Django\ REST\ API/api
# pm2 start manage.py --interpreter python3 -- runserver 0.0.0.0:8000
cd /home/ec2-user/app
mkdir web-application
cd web-application
mkdir node
sudo mv ../* node
sudo mv node/start_setup.sh ../
sudo mv node/appspec.yml ../
cd node
sudo pm2 stop index.js
sudo pm2 start ecosystem.config.js
sudo systemctl restart nginx