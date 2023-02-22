const fs = require('fs')

class ProductManager {
  constructor(fileName) {
    this.fileName = fileName
  }
  async save(obj) {
    try {
      const data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8'),
        jsonData = JSON.parse(data)

      if (jsonData.length > 0) {
        const lastId = jsonData[jsonData.length - 1].id
        obj.id = lastId + 1
      } else {
        obj.id = 1
      }

      jsonData.push(obj)
      fs.writeFileSync(`./${this.fileName}`, JSON.stringify(jsonData, null, 2))
    } catch (err) {
      throw new Error(err)
    }
  }
  async getById(num) {
    try {
      const data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8'),
        jsonData = JSON.parse(data),
        found = jsonData.find(element => element.id === num)
      if (found) {
        console.log(found)
      } else {
        console.log(`ID "${num}" not found`)
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8'),
        jsonData = JSON.parse(data)
      console.log(`All the data: ${JSON.stringify(jsonData, null, 2)}`)
    } catch (err) {
      throw new Error(err)
    }
  }
  async deleteById(num) {
    try {
      const data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8'),
        jsonData = JSON.parse(data),
        foundIndex = jsonData.findIndex(element => element.id === num)
      if (foundIndex !== -1) {
        jsonData.splice(foundIndex, 1)
        fs.writeFileSync(
          `./${this.fileName}`,
          JSON.stringify(jsonData, null, 2)
        )
      } else {
        console.log(`ID "${num}" not found`)
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  deleteAll() {
    fs.writeFileSync(`./${this.fileName}`, '[]')
  }
}

// Líneas usadas para crear el archivo:
const firstProduct = [{ name: 'firstProd', price: 100, id: 1 }]
fs.writeFileSync('./products.txt', JSON.stringify(firstProduct, null, 2))

const products = new ProductManager('products.txt')

// Ejemplos de uso (ejecutar uno por vez):

// products.save({ name: 'secondProd', price: 200 })

// products.save({ name: 'thirdProd', price: 500 })

// products.getById(2)

// products.getAll()

// products.deleteById(2)

// products.deleteAll()
