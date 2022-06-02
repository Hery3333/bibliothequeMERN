import LecteurModel from "../models/lecteurModel.js";

//get all lecteur
export const getLecteurs = async(req,res,next) => {
    try {
        const lecteurs = await LecteurModel.find();
        return res.status(200).json({lecteurs})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//get One lecteur
export const getLecteur = async(req,res,next) => {
    const id = req.params.id
    try {
        const lecteur = await LecteurModel.findById(id)
        return res.status(200).json({lecteur})
    } catch (error) {
        return res.status(404).json({message: "No lecteur found"})
    }
}

//add new lecteur
export const addLecteur = async(req, res, next)=> {
    const {numLecteur,nom} = req.body
    let existingNumero;
    try {
        existingNumero = await LecteurModel.findOne({numLecteur})
    } catch (error) {
        return console.log(error)
    }

    if(existingNumero){
        return res.status(400).json({message: "Numero deja pris par un autre lecteur"})
    }
    const lecteur = new LecteurModel({ numLecteur,nom})
    try {
        await lecteur.save();
    } catch (error) {
        return console.log(error)
    }
    return res.status(200).json({lecteur})
}

//Update lecteur
export const updateLecteur = async(req,res,next) => {
    const id = req.params.id;
    const nom = req.body
    try {
        const lecteur = await LecteurModel.findByIdAndUpdate(id,{nom})
        return res.status(202).json({lecteur})
    } catch (error) {
        return res.status(500).json({message: "Erreur lors de modification du lecteur"})
    }
}

//Remove lecteur
export const deleteLecteur = async(req, res, next) => {
    const id = req.params.id
    try {
        await LecteurModel.findByIdAndDelete(id)
        res.status(203).json({message:'Suppression du lecteur avec success'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}