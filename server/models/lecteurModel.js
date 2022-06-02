import mongoose from "mongoose";

const LecteurSchema = mongoose.Schema({
    numLecteur: {
        type: String,
        required: true,
        unique: true
    },
    nom: {
        type: String,
        required: true
    }
})

const LecteurModel = mongoose.model('lecteur',LecteurSchema)

export default LecteurModel;