#!/bin/bash

set -xe
sequelize db:migrate && \
sequelize-cli db:seed:all && \
npm start
