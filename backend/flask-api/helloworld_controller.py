from flask_restful import Resource

class HelloWorld(Resource):
    def get(self):
        return {'about':'Hello World!'}
    
    def post(self):
        some_json = request.get.json()
        return {'you_sent': some_json}, 201