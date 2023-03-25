#!/bin/bash
echo "First arg: $1"
echo "Second arg: $2"

if [ -z "$parameterA" ] || [ -z "$parameterB" ] || [ -z "$parameterC" ]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi
