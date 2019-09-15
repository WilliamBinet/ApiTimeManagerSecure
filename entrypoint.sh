#!/bin/bash

set -xe
sequelize db:create && \
sequelize db:migrate && \
sequelize-cli db:seed:all && \
npm start
