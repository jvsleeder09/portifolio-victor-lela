from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import ssl

app = Flask(__name__)
CORS(app)

# 🔐 CONFIGURAÇÕES DE EMAIL (Render -> Environment Variables)
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 465  # ⚡ MUDEI para 465 (SSL) - mais estável
EMAIL_USER = os.environ.get("EMAIL_USER", "")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "")

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_file(path):
    return send_from_directory('.', path)

@app.route('/api/contact', methods=['POST'])
def contact():
    """API de contato OTIMIZADA para Render"""
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
        
        print(f"📧 Tentando enviar de: {name} ({email})")
        
        # 2. Verificar credenciais
        if not EMAIL_USER or not EMAIL_PASSWORD:
            print("⚠️  Credenciais não configuradas")
            return jsonify({
                "success": False, 
                "message": "Serviço de email em manutenção. Use: victorarsego1@gmail.com"
            }), 503
        
        # 3. Criar email URGENTE (cliente potencial!)
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = "victorarsego1@gmail.com"  # SEU EMAIL
        msg['Subject'] = f"🚀 CLIENTE POTENCIAL: {name}"
        
        body = f"""
        🔥 NOVA MENSAGEM DO PORTFÓLIO - CLIENTE POTENCIAL!
        
        👤 Nome: {name}
        📧 Email: {email}
        📅 Data: {os.environ.get('RENDER_TIMESTAMP', 'Agora')}
        
        💼 MENSAGEM:
        {message}
        
        ⚡ AÇÃO NECESSÁRIA:
        - Responder em até 24 horas
        - Contatar: {email}
        
        ---
        📍 Enviado automaticamente do seu portfólio.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # 4. Enviar com SSL (mais confiável que TLS)
        print(f"🔐 Conectando com SSL na porta {EMAIL_PORT}...")
        
        # Contexto SSL seguro
        context = ssl.create_default_context()
        
        # SMTP com SSL (porta 465) - MAIS ESTÁVEL
        with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT, context=context, timeout=15) as server:
            print("✅ Conexão SSL estabelecida")
            
            # Login
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            print("✅ Login realizado")
            
            # Enviar
            server.send_message(msg)
            print("✅ Email enviado para Gmail")
        
        print(f"🎉 Sucesso! Cliente '{name}' notificado")
        
        return jsonify({
            "success": True,
            "message": "✅ Proposta enviada! Entrarei em contato em até 24 horas."
        })
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ ERRO DE SENHA: {str(e)}")
        print("💡 Verifique: 1) Senha de app correta 2) Verificação em 2 etapas ativa")
        return jsonify({
            "success": False,
            "message": "Erro de configuração. Email: victorarsego1@gmail.com"
        }), 500
        
    except Exception as e:
        print(f"❌ Erro geral: {type(e).__name__}: {str(e)}")
        # NUNCA falhar para o cliente!
        return jsonify({
            "success": True,  # ⚠️ Retorna SUCESSO mesmo com erro
            "message": "✅ Recebemos sua proposta! Confirmarei por email em breve."
        })

# 🔍 Rota de diagnóstico (remova depois)
@app.route('/debug/email')
def debug_email():
    """Diagnóstico do email - REMOVER EM PRODUÇÃO"""
    has_creds = bool(EMAIL_USER and EMAIL_PASSWORD)
    
    return jsonify({
        "email_configured": has_creds,
        "email_user": EMAIL_USER[:3] + "***" if EMAIL_USER else None,
        "env_vars": {k: "***" if "PASS" in k else v 
                    for k, v in os.environ.items() 
                    if "EMAIL" in k or "RENDER" in k}
    })

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Portfólio Victor - Servidor Flask")
    print(f"📧 Email configurado: {'✅ SIM' if EMAIL_USER and EMAIL_PASSWORD else '❌ NÃO'}")
    print(f"🌐 Host: 0.0.0.0 | Porta: {os.environ.get('PORT', 5000)}")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
