from email.policy import HTTP
from flask import jsonify, render_template, request
import sqlite3
from http import HTTPStatus

from registros_ig import app
from registros_ig.models import select_all, insert

@app.route("/")
def index():
    return render_template("index.html")



@app.route("/api/v1.0/all")
def all_movements():
    try:
        registros = select_all()
    
        return jsonify(
            {
                "data": registros,
                "status": "OK"
            }
        )
    except sqlite3.Error as e:
        return jsonify(
            {
                "status": "Error",
                "data": str(e)
            }
        ), 400

@app.route("/api/v1.0/new", methods=["POST"])
def new():
    registro = request.json
    # Validar registro, nos falta
    try: 
        insert([registro["date"], registro["concept"], registro["quantity"]])
        return jsonify({
            "status": "OK"
        }), HTTPStatus.CREATED
    except sqlite3.Error as e:
        return jsonify({
            "status": "Error",
            "data": str(e)
        }), HTTPStatus.BAD_REQUEST



@app.route("/api/v1.0/delete/<int:id>", methods=["DELETE"])
def delete(id):
    return f"Esto borrara {id}"

@app.route("/api/v1.0/update/<int:id>", methods=["PUT"])
def update(id):
    return f"Esto modificará {id}"