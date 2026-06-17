from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ==================== WEB3FORMS ====================

WEB3FORMS_KEY = os.environ.get("WEB3FORMS_KEY")

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

        # Salvar local como backup
        save_lead_locally(name, email, message)

        # Enviar via Web3Forms
        if WEB3FORMS_KEY:
            try:
                payload = {
                    "access_key": WEB3FORMS_KEY,
                    "name": name,
                    "email": email,
                    "message": f"""
Novo contato do portfólio

Nome: {name}
Email: {email}
Data: {datetime.now().strftime('%d/%m/%Y %H:%M')}

Mensagem:
{message}
"""
                }

                response = requests.post(
                    "https://api.web3forms.com/submit",
                    json=payload
                )

                if response.status_code == 200:
                    print("✅ Email enviado via Web3Forms")
                else:
                    print(f"❌ Erro Web3Forms: {response.text}")

            except Exception as e:
                print(f"❌ Erro Web3Forms: {e}")

        else:
            print("⚠️ Web3Forms não configurado. Salvando apenas localmente.")

        return jsonify({
            "success": True,
            "message": "Mensagem enviada com sucesso!"
        })

    except Exception as e:
        print(f"❌ Erro: {e}")

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
        print(f"📝 Lead salvo: {name}")

    except Exception as e:
        print(f"⚠️ Erro ao salvar lead: {e}")


# ==================== INICIALIZAÇÃO ====================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    print("=" * 60)
    print("🚀 Portfólio Victor Lêla")
    print(f"📧 Web3Forms: {'✅ Configurado' if WEB3FORMS_KEY else '❌ Não configurado'}")
    print("=" * 60)

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )
