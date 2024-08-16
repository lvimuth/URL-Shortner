from flask import Flask, request, redirect, jsonify
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)  # Enable CORS

url_db = {}  # Dictionary to store the shortened URLs

@app.route('/shorten', methods=['POST'])
def shorten():
    original_url = request.json['url']
    short_url = hashlib.md5(original_url.encode()).hexdigest()[:6]
    url_db[short_url] = original_url
    return jsonify({'short_url': f'http://localhost:5000/{short_url}'})

@app.route('/<short_url>')
def redirect_short_url(short_url):
    original_url = url_db.get(short_url)
    if original_url:
        return redirect(original_url)
    return 'URL not found', 404

if __name__ == '__main__':
    app.run(debug=True)
