#!/bin/bash
sudo apt-get install -y default-jre;
source ~/10gag/variables.env;
sudo fuser -k 5000/tcp
java -jar ~/10gag/10gag-spring-boot.jar