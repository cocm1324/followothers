from flask import Flask, request
from flask_restful import Api
from helloworld_controller import HelloWorld
from multi_controller import Multi

app = Flask(__name__)
api = Api(app)

api.add_resource(HelloWorld, '/')
api.add_resource(Multi, '/multi/<int:num>')

if __name__ == '__main__':
    app.run(debug=True)
