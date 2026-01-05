from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import threading

app = Flask(__name__)
CORS(app)

# Configurações
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USER = os.environ.get("EMAIL_USER", "")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "")

def send_email_async(name, email, message):
    """Função assíncrona para enviar email sem bloquear"""
    try:
        if not EMAIL_USER or not EMAIL_PASSWORD:
            return False
        
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = "victorarsego1@gmail.com"
        msg['Subject'] = f"Portfólio - {name[:30]}"
        
        body = f"""
        Nome: {name}
        Email: {email}
        Mensagem: {message}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # SMTP com timeout
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
        
    except Exception as e:
        print(f"❌ Erro no email async: {str(e)}")
        return False

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        data = request.json
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        if not all([name, email, message]):
            return jsonify({
                "success": False,
                "message": "Todos os campos são obrigatórios."
            }), 400
        
        if not EMAIL_USER or not EMAIL_PASSWORD:
            return jsonify({
                "success": False,
                "message": "Serviço de email em manutenção. Contato direto: victorarsego1@gmail.com"
            }), 503
        
        # ⚡ ENVIO ASSÍNCRONO - não bloqueia o worker
        email_thread = threading.Thread(
            target=send_email_async,
            args=(name, email, message)
        )
        email_thread.daemon = True
        email_thread.start()
        
        # Retorna sucesso IMEDIATAMENTE
        return jsonify({
            "success": True,
            "message": "Mensagem enviada! Entrarei em contato em breve."
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Erro no servidor. Tente novamente."
        }), 500

@app.route('/health')
def health():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=False, port=int(os.environ.get('PORT', 5000)), host='0.0.0.0')
