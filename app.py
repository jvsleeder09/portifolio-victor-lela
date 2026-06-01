from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# 🔐 Configuração SendGrid
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
SENDGRID_FROM_EMAIL = "victorarsego1@gmail.com"  # O mesmo que verificou
SENDGRID_TO_EMAIL = "victorarsego1@gmail.com"    # Para onde enviar

# ==================== ROTAS PRINCIPAIS ====================

@app.route('/')
def home():
    """Página principal"""
    return send_from_directory('templates', 'index.html')

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('static/css', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('static/js', filename)

@app.route('/imagens/<path:filename>')
def serve_imagens(filename):
    return send_from_directory('static/imagens', filename)

@app.route('/faculdade/<path:filename>')
def serve_faculdade(filename):
    """Serve arquivos estáticos da pasta faculdade"""
    return send_from_directory('static/faculdade', filename)

# ==================== ROTA DE CONTATO ====================

@app.route('/api/contact', methods=['POST'])
def contact():
    """Processa formulário de contato"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "Dados inválidos"}), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        if not all([name, email, message]):
            return jsonify({"success": False, "message": "Preencha todos os campos"}), 400
        
        print(f"📤 Nova mensagem de: {name} ({email})")
        print(f"📝 Mensagem: {message[:100]}...")
        
        # Salvar localmente
        save_lead_locally(name, email, message)
        
        # Tentar enviar via SendGrid
        if SENDGRID_AVAILABLE and SENDGRID_API_KEY:
            try:
                email_content = f"""
                🚀 NOVO CONTATO - PORTFÓLIO
                
                👤 Nome: {name}
                📧 Email: {email}
                📅 Data: {datetime.now().strftime('%d/%m/%Y %H:%M')}
                
                💼 MENSAGEM:
                {message}
                """
                
                sg_message = Mail(
                    from_email=Email(SENDGRID_FROM_EMAIL, "Portfólio Victor"),
                    to_emails=To(SENDGRID_TO_EMAIL),
                    subject=f"🎯 Contato de {name}",
                    plain_text_content=email_content
                )
                
                sg = SendGridAPIClient(SENDGRID_API_KEY)
                response = sg.send(sg_message)
                print(f"✅ Email enviado via SendGrid. Status: {response.status_code}")
            except Exception as e:
                print(f"⚠️  Erro ao enviar email: {e}")
        
        return jsonify({
            "success": True,
            "message": "✅ Mensagem recebida! Entrarei em contato em breve."
        })
        
    except Exception as e:
        print(f"❌ Erro no contato: {str(e)}")
        return jsonify({
            "success": True,
            "message": "✅ Mensagem recebida! Responderei por email."
        })

def save_lead_locally(name, email, message):
    """Salva lead em arquivo"""
    try:
        lead_data = f"{datetime.now()}|{name}|{email}|{message}\n"
        with open('leads.txt', 'a', encoding='utf-8') as f:
            f.write(lead_data)
        print(f"📝 Lead salvo: {name}")
    except Exception as e:
        print(f"⚠️  Erro ao salvar lead: {e}")

# ==================== ROTAS AUXILIARES ====================

@app.route('/health')
def health():
    return jsonify({"status": "healthy", "service": "portfolio"})

# ==================== INICIALIZAÇÃO ====================

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Portfólio Victor Lêla")
    print(f"📧 SendGrid: {'✅ Disponível' if SENDGRID_AVAILABLE else '❌ Não instalado'}")
    print("=" * 60)
    
    # Garantir que o servidor rode
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
