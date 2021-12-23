const models = require('../models')
/*
Models are responsible for the storage and 
retrieval of data in our applications. 
For us, models will serve as the interface 
layer between our Express application and our MySQL database.

The information taken from the example postman would be the email, 
name of person, and phone number right?
*/
const createNewPerson = async (request, response) => {
    try {
        const { firstKey, secondKey, etcKey } = request.body
        
        if (!firstKey || !secondKey || !etcKey) {
            return response.status(400).send('Missong one of the following: firstKey, secondKey, etc')
        }

        const newPerson = await models.People.create ({ firstKey, secondKey, etcKey })

        return response.status(201).send(newPerson)
    } catch (error) {
        return response.status(500).send('Unknown error while creating new person')
    }
}

module.exports = {
    createNewPerson
}