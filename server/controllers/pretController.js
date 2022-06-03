import PretModel from "../models/pretModel.js";
import LecteurModel from '../models/lecteurModel.js';
import LivreModel from '../models/livreModel.js'

//Get All prets
export const getPrets = async(req,res,rep) => {
    try {
        const prets = await PretModel.find()
        return res.status(200).json({prets})
    } catch (error) {
        return res.status(500).json({message:"Une erreur s'est produit lors de la recuperation des prets"})
    }
}


//Add new Pret
export const addPret = async(req,res,next) => {
    const {numPret, numLecteur, numLivre, datePret,dateRetour} = req.body
    let lecteur,livre,pret;

    try {
        lecteur = await LecteurModel.findOne({numLecteur});
        livre = await LivreModel.findOne({numLivre})

        //verifier si le nombre de pret actuel du lecteur est superieur ou egal 3
        if(lecteur.nbPretActuel == 3 ){
            return res.status(403).json({message: "Ce lecteur a atteint le nombre de pret maximal"})
        }

        lecteur.nbPretActuel = lecteur.nbPretActuel + 1
        lecteur.livres.push(livre)
        livre.disponible = false

        await lecteur.save();
        await livre.save();

        pret = new PretModel({
            numPret,numLecteur,numLivre,datePret,dateRetour
        })

        await pret.save();

        return res.status(200).json({pret})

    } catch (error) {
        return console.log(error)
    }
}

//update Pret
export const updatePret = async(req,res,next) => {
    const id = req.params.id;

    try {
        const pret = await PretModel.findById(id)
        
        const lecteur = await LecteurModel.findOne({numLecteur:pret.numLecteur})
        lecteur.nbPretActuel = lecteur.nbPretActuel -1
        await lecteur.save()
        
        const livre = await LivreModel.findOneAndUpdate(pret.numLivre,{disponible: true})

        return res.status(200).json({message: "Livre rendue, pret updated"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//remove pret
export const deletePret = async(req,res,next) => {
    const id = req.params.id

    try {
        const pret = await PretModel.findById(id)

        const lecteur = await LecteurModel.findOneAndUpdate({numLecteur:pret.numLecteur},{nbPretActuel: nbPretActuel -1})
        const livre = await LivreModel.findOneAndUpdate({numLivre:pret.numLivre},{disponible: true})

        await PretModel.findByIdAndDelete(id);

        return res.status(200).json({message: "Pret supprimer"})

    } catch (error) {
        return res.status(500).json({message:"Impossible de supprimer le pret"})
    }
}