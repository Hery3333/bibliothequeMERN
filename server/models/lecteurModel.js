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
    },
    livres:[{type: mongoose.Types.ObjectId,ref: 'livre'}],
    nbPretActuel:{
        type: Number,
        default:0,
        max:3
    }
})

const LecteurModel = mongoose.model('lecteur',LecteurSchema)

export default LecteurModel;