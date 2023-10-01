echo Installing packages in shared...
cd ./shared
rm -rf package-lock.json node_modules
npm i
echo Installing packages in client-service...
cd ../client-service
rm -rf package-lock.json node_modules
npm i
echo Installing packages in movie-service...
cd ../movie-service
rm -rf package-lock.json node_modules
npm i
