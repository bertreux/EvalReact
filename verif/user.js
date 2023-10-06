import 'text-encoding-polyfill'
import JOI from "joi";

export const schemaUser = JOI.object({
    password : JOI.string().min(3).max(255).required() ,
    email : JOI.string().email({ tlds: { allow: false } }).min(3).max(255).required()
});

export const schemaUserCrud = JOI.object({
    password : JOI.string().min(3).max(255).required() ,
    role : JOI.bool() ,
    email : JOI.string().email({ tlds: { allow: false } }).min(3).max(255).required()
});