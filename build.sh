#!/bin/bash

# build docker image
docker build -t coralreef/app:latest .

# start docker container
docker-compose up -d
