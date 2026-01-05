from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS  # Adicione esta linha
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permitir requisições do frontend

# Configurações de email (use variáveis de ambiente na produção)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USER = os.getenv("EMAIL_USER", "seu_email@gmail.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "sua_senha_app")

@app.route('/')
def serve_index():
    """Serve a página principal"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve arquivos estáticos"""
    return send_from_directory('.', filename)

@app.route('/send_message', methods=['POST'])
def send_message():
    """Endpoint para enviar mensagens do formulário de contato"""
    try:
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
        
        # Configurar email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = "victorarsego1@gmail.com"  # Seu email de destino
        msg['Subject'] = f"Nova mensagem do portfólio - {name}"
        
        # Corpo do email
        body = f"""
        Nova mensagem recebida do seu portfólio:
        
        Nome: {name}
        Email: {email}
        
        Mensagem:
        {message}
        
        ---
        Enviado através do formulário de contato do seu portfólio.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Em produção, descomente o código abaixo:
        
        # Conectar e enviar email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        
        return jsonify({
            "success": True,
            "message": "Mensagem enviada com sucesso! Entrarei em contato em breve."
        })
        
    except Exception as e:
        print(f"Erro ao enviar mensagem: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"Erro ao enviar mensagem: {str(e)}"
        }), 500

if __name__ == '__main__':
    print("🚀 Servidor Flask iniciando...")
    print("🌐 Acesse: http://localhost:5000")
    print("📧 Formulário de contato: http://localhost:5000/#contact")
    print("💡 O formulário está configurado no modo de TESTE (imprime no console)")
    print("📝 Para produção, configure variáveis de ambiente no arquivo .env")
    app.run(debug=True, port=5000)