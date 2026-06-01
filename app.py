from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ==================== SENDGRID ====================

try:
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail, Email, To

    SENDGRID_AVAILABLE = True
except ImportError:
    SENDGRID_AVAILABLE = False
    print("⚠️ SendGrid não instalado.")

SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
SENDGRID_FROM_EMAIL = "victorarsego1@gmail.com"
SENDGRID_TO_EMAIL = "victorarsego1@gmail.com"

# ==================== ROTAS ====================

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "portfolio"
    })


@app.route("/jon")
def jon():
    return "ROTA NOVA FUNCIONANDO"


@app.route("/teste")
def teste():
    return jsonify({
        "cwd": os.getcwd(),
        "static": os.path.exists("static"),
        "css": os.path.exists("static/css"),
        "style": os.path.exists("static/css/style.css"),
        "js": os.path.exists("static/js/main.js"),
        "logo": os.path.exists("static/imagens/logo.png")
    })

# ==================== CONTATO ====================

@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Dados inválidos"
            }), 400

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        if not all([name, email, message]):
            return jsonify({
                "success": False,
                "message": "Preencha todos os campos"
            }), 400

        save_lead_locally(name, email, message)

        if SENDGRID_AVAILABLE and SENDGRID_API_KEY:
            try:
                body = f"""
Nome: {name}
Email: {email}
Data: {datetime.now().strftime('%d/%m/%Y %H:%M')}

Mensagem:
{message}
"""

                sg_message = Mail(
                    from_email=Email(
                        SENDGRID_FROM_EMAIL,
                        "Portfólio Victor"
                    ),
                    to_emails=To(SENDGRID_TO_EMAIL),
                    subject=f"Novo contato de {name}",
                    plain_text_content=body
                )

                sg = SendGridAPIClient(SENDGRID_API_KEY)
                sg.send(sg_message)

            except Exception as e:
                print(f"Erro SendGrid: {e}")

        return jsonify({
            "success": True,
            "message": "Mensagem enviada com sucesso!"
        })

    except Exception as e:
        print(e)

        return jsonify({
            "success": False,
            "message": "Erro interno."
        }), 500


def save_lead_locally(name, email, message):
    try:
        with open("leads.txt", "a", encoding="utf-8") as f:
            f.write(
                f"{datetime.now()}|{name}|{email}|{message}\n"
            )

    except Exception as e:
        print(e)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )
