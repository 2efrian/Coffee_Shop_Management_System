from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client.coffeeShopInventory
products_collection = db.products

@app.route('/api/products', methods=['GET'])
def get_products():
    products = list(products_collection.find({}, {'_id': 0}))
    return jsonify(products)

@app.route('/api/products', methods=['POST'])
def add_product():
    product = request.json
    products_collection.insert_one(product)
    return jsonify(product), 201

if __name__ == '__main__':
    app.run(port=5000)
