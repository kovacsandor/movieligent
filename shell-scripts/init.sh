echo Installing packages and copying all .env.eaxmple files to .env files...
cd ./shared
npm i
cd ../client-service
cp .env.example .env
npm i
cd ../movie-service
cp .env.example .env
npm i
