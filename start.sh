#!/bin/bash
sudo apt-get install -y default-jre &&
set -a &&
source ~/10gag/.env &&
set +a &&
sudo fuser -k 5000/tcp &&
java -jar ~/10gag/10gag-spring-boot.jar