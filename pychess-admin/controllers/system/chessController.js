const { listAllChessPiece, insertChessPiece, updateChessPiece, deleteChessPiece } = require('../../services/system/chessPieceService');
const ResponseHelper = require('../../models/ResponseHelper');

// List All Chess Piece
const getAllChessPieces = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const chessPieces = await listAllChessPiece();
        response.success('Operation successful', chessPieces);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving chess piece details');
    }
}

// Add New Chess Piece
const addChessPiece = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const newChessPiece = req.body;
        await insertChessPiece(newChessPiece);
        response.success('Chess Piece Inserted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error adding new chess piece');
    }
};
// Update Chess Piece
const modifyChessPiece = async ( req, res ) => {
    const response = new ResponseHelper(res);
    try {
        const chessPiece = req.body;
        await updateChessPiece(chessPiece);
        response.success('Chess Piece Updated Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error updating chess piece');
    }
}

// Delete Chess Piece
const fullDeleteChessPiece = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        // Try to get from url (Single id)
        let chessPieceIds = req.params.id;
        // Multiple ids if there is no parameters in url
        if (!chessPieceIds) {
            chessPieceIds = req.body.ids;
        }
        await deleteChessPiece(chessPieceIds);
        response.success('Chess Piece Deleted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error deleting chess piece');
    }
}

module.exports = { getAllChessPieces, addChessPiece, modifyChessPiece, fullDeleteChessPiece }