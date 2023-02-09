#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const ar = minimist(process.argv.slice(2));

if (ar.h){
  console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
  console.log("     -h            Show this help message and exit.");
  console.log("     -n, -s        Latitude: N positive; S negative.");
  console.log("     -e, -w        Longitude: E positive; W negative.");
  console.log("     -z            Time zone: uses tz.guess() from moment-timezone by default.");
  console.log("     -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
  console.log("     -j            Echo pretty JSON from open-meteo API and exit.");
  process.exit(0);
}
const timezone = moment.tz.guess();
let latitude = ar.n || ar.s * -1 ;
let longitude = ar.e || ar.w * -1;

const my_url = ('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&temperature_unit=fahrenheit&timezone=' + timezone);
const response = await fetch(my_url);
const data = await response.json();
if (ar.j) {
	console.log(data);
	process.exit(0);
} 

console.log(data.daily.precipitation_hours);
const d = ar.d 
if (d == 0) {
  console.log("today.")
} else if (d > 1) {
  console.log("in " + d + " days.")
} else {
  console.log("tomorrow.")
}
