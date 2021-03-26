sudo su
curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -

cd /home/ec2-user/app/web-application/angular
npm install

cd /home/ec2-user/app/web-application/node
npm install
node index.js

cd /home/ec2-user/app/web-application/angular
ng serve --o

