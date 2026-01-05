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

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_file(path):
    return send_from_directory('.', path)

@app.route('/api/contact', methods=['POST'])
def contact():
    """Envia email via SendGrid"""
    try:
        # 1. Validar entrada
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "Dados inválidos"}), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        if not all([name, email, message]):
            return jsonify({"success": False, "message": "Preencha todos os campos"}), 400
        
        print(f"📤 Enviando via SendGrid: {name} ({email})")
        
        # 2. Verificar API Key
        if not SENDGRID_API_KEY:
            print("⚠️  SendGrid API Key não configurada")
            # Fallback: salva no log
            save_lead_locally(name, email, message)
            return jsonify({
                "success": True,  # Não falha para o cliente
                "message": "✅ Recebemos sua proposta! Entrarei em contato em breve."
            })
        
        # 3. Criar email com SendGrid
        email_content = f"""
        🚀 NOVO CLIENTE POTENCIAL - PORTFÓLIO VICTOR
        
        👤 Nome: {name}
        📧 Email: {email}
        📅 Data: {datetime.now().strftime('%d/%m/%Y %H:%M')}
        
        💼 MENSAGEM:
        {message}
        
        ⚡ AÇÃO NECESSÁRIA:
        - Responder em até 24 horas
        - Contatar: {email}
        
        ---
        📍 Enviado automaticamente do seu portfólio.
        """
        
        # 4. Configurar email SendGrid
        message = Mail(
            from_email=Email(SENDGRID_FROM_EMAIL, "Portfólio Victor"),
            to_emails=To(SENDGRID_TO_EMAIL),
            subject=f"🎯 CLIENTE POTENCIAL: {name}",
            plain_text_content=email_content
        )
        
        # 5. Enviar via SendGrid API
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        
        print(f"✅ Email enviado via SendGrid. Status: {response.status_code}")
        
        # Salva backup local
        save_lead_locally(name, email, message)
        
        return jsonify({
            "success": True,
            "message": "✅ Proposta enviada! Entrarei em contato em até 24 horas."
        })
        
    except Exception as e:
        print(f"❌ Erro SendGrid: {str(e)}")
        
        # Fallback: salva localmente
        save_lead_locally(name, email, message)
        
        # NUNCA falhar para o cliente!
        return jsonify({
            "success": True,
            "message": "✅ Recebemos sua proposta! Confirmarei por email em breve."
        })

def save_lead_locally(name, email, message):
    """Salva lead em arquivo temporário como backup"""
    try:
        lead_data = f"{datetime.now()}|{name}|{email}|{message}\n"
        with open('/tmp/leads.txt', 'a', encoding='utf-8') as f:
            f.write(lead_data)
        print(f"📝 Lead salvo localmente: {name}")
    except Exception as e:
        print(f"⚠️  Erro ao salvar lead: {e}")

# 🔍 Rota para visualizar leads (APENAS PARA DEBUG)
@app.route('/debug/leads')
def view_leads():
    """Mostra leads recebidos"""
    try:
        with open('/tmp/leads.txt', 'r', encoding='utf-8') as f:
            leads = f.read()
        return f"<pre>{leads}</pre>"
    except:
        return "<pre>Nenhum lead ainda</pre>"

# 🩺 Rota de saúde
@app.route('/health')
def health():
    return jsonify({"status": "healthy", "service": "portfolio"})

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Portfólio Victor - SendGrid Email")
    print(f"📧 SendGrid configurado: {'✅ SIM' if SENDGRID_API_KEY else '❌ NÃO'}")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
