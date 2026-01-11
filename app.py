from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv('SENDER_EMAIL')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD')
RECEIVER_EMAIL = "sagarsharma9821315721@gmail.com"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        # Validate required fields
        if not all([name, email, subject, message]):
            return jsonify({'success': False, 'error': 'All fields are required'}), 400
        
        # Validate email configuration
        if not SENDER_EMAIL or not SENDER_PASSWORD:
            return jsonify({'success': False, 'error': 'Email configuration missing'}), 500
        
        # Create email message
        msg = MIMEMultipart('alternative')
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"Portfolio Contact: {subject}"
        msg['Reply-To'] = email
        
        # Create HTML email body
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    margin: 0;
                    padding: 0;
                }}
                .container {{ 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background-color: #f4f4f4; 
                }}
                .header {{ 
                    background: linear-gradient(135deg, #ffae00 0%, #ff8c00 100%); 
                    color: white; 
                    padding: 30px 20px; 
                    text-align: center; 
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 28px;
                }}
                .header p {{
                    margin: 5px 0 0 0;
                    font-size: 14px;
                    opacity: 0.9;
                }}
                .content {{ 
                    background: white; 
                    padding: 30px; 
                }}
                .field {{ 
                    margin-bottom: 20px; 
                    border-left: 4px solid #ffae00;
                    padding-left: 15px;
                }}
                .label {{ 
                    font-weight: 600; 
                    color: #ffae00; 
                    margin-bottom: 8px; 
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }}
                .value {{ 
                    padding: 12px; 
                    background: #f9f9f9; 
                    border-radius: 4px;
                    color: #333;
                    font-size: 15px;
                }}
                .message-box {{
                    background: #fff8e1;
                    border: 1px solid #ffae00;
                    border-radius: 4px;
                    padding: 15px;
                    margin-top: 10px;
                }}
                .footer {{ 
                    text-align: center; 
                    padding: 20px; 
                    color: #666; 
                    font-size: 13px; 
                    background: #f4f4f4;
                }}
                .footer a {{
                    color: #ffae00;
                    text-decoration: none;
                }}
                .timestamp {{
                    background: #e3f2fd;
                    color: #1976d2;
                    padding: 10px;
                    border-radius: 4px;
                    text-align: center;
                    font-size: 13px;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📬 New Contact Request</h1>
                    <p>From Your Portfolio Website</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">👤 Name</div>
                        <div class="value">{name}</div>
                    </div>
                    <div class="field">
                        <div class="label">📧 Email Address</div>
                        <div class="value">{email}</div>
                    </div>
                    <div class="field">
                        <div class="label">📌 Subject</div>
                        <div class="value">{subject}</div>
                    </div>
                    <div class="field">
                        <div class="label">💬 Message</div>
                        <div class="message-box">{message}</div>
                    </div>
                    <div class="timestamp">
                        ⏰ Received: {datetime.now().strftime("%B %d, %Y at %I:%M %p")}
                    </div>
                </div>
                <div class="footer">
                    <p>This email was sent from your portfolio contact form.</p>
                    <p>Reply directly to: <a href="mailto:{email}">{email}</a></p>
                    <p style="margin-top: 15px; color: #999;">
                        © 2024 Sagar Upadhyaya | Data Analyst & Python Developer
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Attach HTML body
        msg.attach(MIMEText(html_body, 'html'))
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        
        # Log successful submission
        print(f"✓ Email sent successfully from {name} ({email}) at {datetime.now()}")
        
        return jsonify({
            'success': True, 
            'message': 'Your message has been sent successfully! I will get back to you soon.'
        }), 200
        
    except smtplib.SMTPAuthenticationError:
        print("✗ SMTP Authentication Error: Check your email credentials")
        return jsonify({
            'success': False, 
            'error': 'Email authentication failed. Please contact directly.'
        }), 500
        
    except Exception as e:
        print(f"✗ Error sending email: {str(e)}")
        return jsonify({
            'success': False, 
            'error': 'Failed to send message. Please try again or contact directly.'
        }), 500

@app.route('/health')
def health_check():
    email_configured = bool(SENDER_EMAIL and SENDER_PASSWORD)
    return jsonify({
        'status': 'healthy',
        'message': 'Portfolio backend is running',
        'email_configured': email_configured
    }), 200

if __name__ == '__main__':
    # Check if environment variables are set
    if not SENDER_EMAIL or not SENDER_PASSWORD:
        print("\n⚠️  WARNING: Email credentials not configured!")
        print("Please create a .env file with:")
        print("SENDER_EMAIL=your-email@gmail.com")
        print("SENDER_PASSWORD=your-app-password\n")
    else:
        print(f"\n✓ Email configured: {SENDER_EMAIL}")
        print("✓ Flask server starting...")
    
    app.run(debug=True, host='0.0.0.0', port=5000)