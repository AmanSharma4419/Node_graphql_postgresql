<!--tsc-watch  -->

1. tsc-watch used for compiling the new changes and restart server on every change.

<!--Commands for developing the nodejs server   -->

yarn init  
yarn add typescript -D
typescript -v
tsc init
yarn add express
yarn add tsc-watch

<!-- DB commands -->
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name added_user_model