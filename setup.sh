#!/bin/bash

npm install

echo ''
printf 'Interval (cron expression): '
read interval
printf 'Should click (Y or N): '
read shouldClick
printf 'Should move (Y or N): '
read shouldMove
printf 'Should press (Y or N): '
read shouldPress

if [ -z "$interval" ]
then
  interval="* * * * *"
fi

config="{ \"interval\": \"${interval}\", \"shouldClick\": \"${shouldClick:=Y}\", \"shouldMove\": \"${shouldMove:=N}\", \"shouldPress\": \"${shouldPress:=N}\" }"
echo "$config" >config.json

sh start.sh
