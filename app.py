from flask import Flask, render_template

app = Flask(__name__)

# Configuration
SERVER_IP = "soulpvp.fun"
DISCORD_INVITE = "https://discord.gg/your-invite-code"
STORE_URL = "https://store.example.com"

@app.route('/')
def index():
    return render_template('index.html', 
                         server_ip=SERVER_IP,
                         discord_invite=DISCORD_INVITE,
                         store_url=STORE_URL)
