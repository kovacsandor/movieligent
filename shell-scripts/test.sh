echo Testing client-service...
cd ./client-service
npm test -- --watchAll=false --verbose
echo Testing movie-service...
cd ../movie-service
npm test
