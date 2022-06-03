import mongoose from "mongoose"

const addDaysToDate = (date,days) => {
    var res = new Date(date);
    res.setDate(res.getDate() + days)
    return res;
}

// const addThreeDaysToDate = addDaysToDate(date,3)

const pretSchema = mongoose.Schema({

    numPret:{
        type: String,
        required: true,
        unique: true
    },
    numLecteur: {
        type: String,
        required: true
    },
    numLivre: {
        type: [String],
        required: true
    },
    datePret:{
        type:Date,
        default: Date.now()
    },
    dateRetour:{
        type:Date,
        default: addDaysToDate(Date.now(),15)
    }
})

const PretModel = mongoose.model('pret',pretSchema)

export default PretModel;