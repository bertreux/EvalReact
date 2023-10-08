import 'text-encoding-polyfill'
import JOI from "joi";

export const schemaOeuvre = JOI.object({
    image: JOI.string().min(3).max(10000).required(),
    nom: JOI.string().min(3).max(255).required(),
    auteur: JOI.string().email({ tlds: { allow: false } }).min(3).max(255).required(),
    description: JOI.string().min(3).max(10000).required(),
    dt_creation: JOI.date().required()
});