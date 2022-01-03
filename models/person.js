const mongoose = require('mongoose')
  
const url = process.env.MONGODB_URI

console.log("Connecting to", url)
  
mongoose.connect(url)
  .then(result => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB:", error.message)
  })
  
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
/*
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
  
if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to the phonebook`)
    mongoose.connection.close()
  })
}
*/
module.exports = mongoose.model('Person', personSchema)