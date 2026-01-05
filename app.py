from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# 🔴 MODIFICAÇÃO AQUI: Carregar .env apenas se existir (para desenvolvimento)
if os.path.exists('.env'):
    load_dotenv()
    print("✅ .env carregado (modo desenvolvimento)")
else:
    print("🌐 Modo produção: usando variáveis de ambiente do Render")

# Configurações de email - PRIORIZA variáveis de ambiente (Render)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USER = os.environ.get("EMAIL_USER")  # 🔴 Mudei de getenv() para environ.get()
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")

# 🔴 ADICIONE ESTA VERIFICAÇÃO
if not EMAIL_USER or not EMAIL_PASSWORD:
    print("⚠️  AVISO: Variáveis de email não configuradas!")
    print(f"EMAIL_USER definido: {bool(EMAIL_USER)}")
    print(f"EMAIL_PASSWORD definido: {bool(EMAIL_PASSWORD)}")
else:
    print(f"✅ Email configurado para: {EMAIL_USER}")

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        # Verificar se email está configurado
        if not EMAIL_USER or not EMAIL_PASSWORD:
            return jsonify({
                "success": False,
                "message": "Serviço de email não configurado. Entre em contato diretamente por victorarsego1@gmail.com"
            }), 500
        
        # Obter dados do formulário
        data = request.json
        
        # Extrair informações
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Validar campos obrigatórios
        if not all([name, email, message]):
            return jsonify({
                "success": False,
                "message": "Todos os campos são obrigatórios."
            }), 400
        
        print(f"📨 Tentando enviar email de: {name} ({email})")
        
        # Configurar email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = "victorarsego1@gmail.com"
        msg['Subject'] = f"Portfólio - Mensagem de {name}"
        
        # Corpo do email (melhorado)
        body = f"""
        📬 NOVA MENSAGEM DO PORTFÓLIO
        
        👤 Nome: {name}
        📧 Email: {email}
        
        💬 Mensagem:
        {message}
        
        ---
        📅 Enviado em: {os.environ.get('RENDER_TIMESTAMP', 'Agora')}
        🌐 Enviado de: {request.remote_addr}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # 🔴 ADICIONE MAIS LOGS PARA DEBUG
        print(f"🔧 Config SMTP: {SMTP_SERVER}:{SMTP_PORT}")
        print(f"🔧 Login com: {EMAIL_USER}")
        
        # Conectar e enviar email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email enviado com sucesso para: victorarsego1@gmail.com")
        
        return jsonify({
            "success": True,
            "message": "Mensagem enviada com sucesso! Entrarei em contato em breve."
        })
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ ERRO DE AUTENTICAÇÃO: {str(e)}")
        return jsonify({
            "success": False,
            "message": "Erro de autenticação no email. Verifique as credenciais."
        }), 500
        
    except Exception as e:
        print(f"❌ Erro ao enviar mensagem: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"Erro interno do servidor. Tente novamente ou entre em contato diretamente por victorarsego1@gmail.com"
        }), 500

# 🔴 ADICIONE ESTA ROTA PARA DEBUG (REMOVA DEPOIS!)
@app.route('/debug-email')
def debug_email():
    """Rota para debug - REMOVA EM PRODUÇÃO"""
    return jsonify({
        "email_user_set": bool(EMAIL_USER),
        "email_user": EMAIL_USER[:3] + "***" if EMAIL_USER else None,
        "email_pass_set": bool(EMAIL_PASSWORD),
        "env_file_exists": os.path.exists('.env'),
        "all_env_vars": {k: "***" if "PASS" in k else v 
                        for k, v in os.environ.items() 
                        if "EMAIL" in k or "RENDER" in k}
    })

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 Servidor Flask iniciando...")
    print(f"🌐 Modo: {'DESENVOLVIMENTO' if os.path.exists('.env') else 'PRODUÇÃO (Render)'}")
    print(f"📧 Email configurado: {bool(EMAIL_USER)}")
    print("=" * 50)
    app.run(debug=False, port=int(os.environ.get('PORT', 5000)), host='0.0.0.0')
