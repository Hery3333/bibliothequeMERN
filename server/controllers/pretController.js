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
export const newPret = async(req, res, next) => {
    const {numPret,numLecteur,numLivre,datePret,dateRetour} = req.body

    let nbPretMaximum;

    //verifier si le nbPretActuel du lecteur est max
    try {
        const nbPretMaximum = await LecteurModel.findOne({numLecteur})
    } catch (error) {
        return res.status(500).json({message: "Une erreur s'est produit lors d'enregistrement d'un nouveau pret"})
    }

    if(nbPretMaximum >= 3){
        return res.status(403).json({message: "Nombre de pret maximal atteint"})
    }

    const newPret = new PretModel({numPret,numLecteur,numLivre,datePret,dateRetour})

    try {
        //enregistrer le pret
        await newPret.save()

        const livre = await LivreModel.findOne({numLivre})
        const lecteur = await LecteurModel.findOne({numLecteur});

        //Mise a jour livre
        await LivreModel.findOneAndUpdate(numLivre,{
            disponible: false,
            nbFoisPret: livre.nbFoisPret + 1
        })

        lecteur.nbPretActuel = lecteur.nbPretActuel + 1
        lecteur.livres.push(livre);

        await lecteur.save()


    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const addPret = async(req,res,next) => {
    const {numPret, numLecteur, numLivre, datePret,dateRetour} = req.body
    let lecteur,livre,pret;

    try {
        lecteur = await LecteurModel.findOne({numLecteur});
        livre = await LivreModel.findOne({numLivre})

        //verifier si le nombre de pret actuel du lecteur est superieur ou egal 3
        if(lecteur.nbPretActuel >=3 ){
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