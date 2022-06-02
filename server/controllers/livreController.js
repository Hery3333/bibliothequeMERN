import LivreModel from "../models/livreModel.js";

//Get all Books
export const getLivres = async (req,res,next) => {
    try {
        const livres = await LivreModel.find()
        return res.status(200).json({livres})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//Get One Book
export const getLivre = async(req,res,next) => {
    const id = req.params.id
    try {
        const livre = await LivreModel.findById(id)
        return res.status(200).json({livre})
    } catch (error) {
        return res.status(404).json({message: "Aucun livre trouver"})
    }
}

//Add new Book
export const addLivre = async (req,res,next) => {
    const {numLivre, titre, auteur, dateEdition } = req.body

    let existingNumero;

    try {
        existingNumero = await LivreModel.findOne({numLivre})
    } catch (error) {
        return console.log(error)
    }

    if(existingNumero){
        return res.status(500).json({message: "Numero deja utiliser par un autre livre"})
    }

    const livre = new LivreModel({numLivre, titre, auteur, dateEdition})

    try {
        await livre.save()
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({livre})
}

//Update Book
export const updateLivre = async( req,res,next) => {
    const id = req.params.id;
    const {titre,auteur,dateEdition} = req.body
    let livre;

    try {
        livre = await LivreModel.findByIdAndUpdate(id,{
            titre,auteur,dateEdition
        })
    } catch (error) {
        return console.log(error)
    }
    if(!livre){
        return res.status(500).json({message: "Impossible d'effectuer la modification"})
    }
    return res.status(200).json({livre})
}
