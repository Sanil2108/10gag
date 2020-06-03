#!/bin/bash
source variables.env
rm -rf target
mvn clean package spring-boot:repackage

# Frontend deployment on S3
ACCESS_KEY=$(cat ~/Documents/aws/mainInstanceRootKey.csv | grep -P "AWSAccessKeyId=[A-Za-z0-9]+" | cut -d "=" -f2)
SECRET_KEY=$(cat ~/Documents/aws/mainInstanceRootKey.csv | grep -P "AWSSecretKey=[A-Za-z0-9]+" | cut -d "=" -f2)

mkdir front-end-build
cp -r target/classes/static/built/* front-end-build/
cp -r target/classes/templates/* front-end-build/
aws s3 sync ./front-end-build s3://10gag-frontend

# Backend deployment on EC2
scp -r -i ~/Documents/aws/main-instance.pem target/10gag-spring-boot.jar variables.env ubuntu@3.7.175.185:~/10gag/
ssh -f -i ~/Documents/aws/main-instance.pem ubuntu@3.7.175.185 'bash -s' < start.sh

echo "Deployed to http://10gag-frontend.s3-website.ap-south-1.amazonaws.com"
# chromium http://10gag-frontend.s3-website.ap-south-1.amazonaws.com