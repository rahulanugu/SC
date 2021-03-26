sudo su
curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -

cd /home/ec2-user/app/web-application/angular
npm install
npm link @angular/cli
npm install -g @angular/cli@latest
ng update -g
ng update @angular/cli @angular/core --allow-dirty --force
npm run build -- --prod

cd /home/ec2-user/app/web-application/node
npm install
node index.js

cd /home/ec2-user/app/web-application/angular
ng serve --o

