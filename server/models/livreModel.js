import mongoose from 'mongoose';

const livreSchema = mongoose.Schema({
    numLivre:{
        type: String,
        required: true,
        unique: true
    },
    titre: {
        type: String,
        required: true,
        min: 3
    },
    auteur: {
        type: String,
        required: true,
        min:3
    },
    dateEdition: {
        type: Date,
        default: Date.now()
    },
    disponible:{
        type: Boolean,
        default: true
    },
    nbFoisPret: {
        type: Number,
        default: 0
    }
})

const LivreModel = mongoose.model('livre',livreSchema)

export default LivreModel;