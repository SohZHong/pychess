const { 
    listAllQuestionWithAnswers,
    listAllQuestionType,
    insertQuestion,
    updateQuestion,
    deleteQuestion
} = require('../../services/questionService');
const ResponseHelper = require('../../models/ResponseHelper');

// List All Question Details
const getAllQuestionWithAnswers = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const questions = await listAllQuestionWithAnswers();
        response.success('Operation successful', questions);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving question details');
    }
}

// List all question type
const getAllQuestionType = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const questionTypes = await listAllQuestionType();
        response.success('Operation successful', questionTypes);
    } catch (error) {
        console.error(error);
        response.error('Error retrieving question types');
    }
}

// Add New Question
const addQuestion = async (req, res) => {
    const response = new ResponseHelper(res);
    try {
        const newQuestion = req.body;
        await insertQuestion(newQuestion);
        response.success('Question Inserted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error adding new question');
    }
};
// Update Question
const modifyQuestion = async ( req, res ) => {
    const response = new ResponseHelper(res);
    try {
        const question = req.body;
        await updateQuestion(question);
        response.success('Question Updated Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error updating question');
    }
}
// Fully Deleting System Users from database
const fullDeleteQuestion = async(req, res) => {
    const response = new ResponseHelper(res);
    try {
        // Try to get from url (Single id)
        let questionIds = req.params.id;
        // Multiple ids if there is no parameters in url
        if (!questionIds) {
            questionIds = req.body.ids;
        }
        await deleteQuestion(userIds);
        response.success('Question Deleted Successfully');
    } catch (error) {
        console.error(error);
        response.error('Error deleting question');
    }
}

module.exports = { getAllQuestionWithAnswers, getAllQuestionType, addQuestion, modifyQuestion, fullDeleteQuestion }