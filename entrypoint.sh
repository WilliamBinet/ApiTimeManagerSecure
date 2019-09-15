#!/bin/bash

set -xe
sequelize db:drop && \
sequelize db:migrate && \
sequelize-cli db:seed:all && \
npm start
