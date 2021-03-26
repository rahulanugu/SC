sudo su
curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -

cd /home/ec2-user/app/web-application/angular
npm install -g --silent
npm link -g --silent @angular/cli
npm install -g --silent @angular/cli@latest
ng update
ng update @angular/cli @angular/core --allow-dirty --force
npm run build -- --prod

cd /home/ec2-user/app/web-application/node
npm install -g --silent
node index.js

cd /home/ec2-user/app/web-application/angular
ng serve --o

