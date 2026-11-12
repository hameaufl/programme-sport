"use strict";
const garmin=require("../adaptateurs/garmin/generateur.cjs");
if(require.main===module)garmin.main(process.argv.slice(2));
module.exports=garmin;
