
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Configuración de Flask
app = Flask(__name__)
app.url_map.strict_slashes = False


ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
Migrate(app, db, compare_type=True)
db.init_app(app)

## JWT Configuration ##
app.config["JWT_SECRET_KEY"] = "Secret Key to Validate Tokens"
jwt = JWTManager(app)

# Allow CORS requests to this API
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


setup_admin(app)


setup_commands(app)


app.register_blueprint(api, url_prefix='/api')


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Definir la ruta al directorio de archivos estáticos
static_file_dir = os.path.join(os.path.dirname(__file__), 'static')



@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    return send_from_directory(static_file_dir, path)



if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
