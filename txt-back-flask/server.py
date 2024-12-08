from flask import Flask,jsonify,request
from flask_cors import CORS
import os
from utils import convertor
from urllib.parse import unquote

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER,exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

filedb = 0

@app.route('/api/sendfiletoserver',methods=['POST'])
def sendFileToServer() :
    if 'file' not in request.files :
        return jsonify({"Error": "No file found"})
    
    file = request.files['file']
    if file.filename =='':
        return jsonify({"Error":"No file Content Found"})
    
    file_path = os.path.join(UPLOAD_FOLDER,file.filename)
    file.save(file_path)
    filedb = file_path
    return jsonify({"Message":"File Uploaded Successfully","path":file_path})

@app.route('/api/getjson',methods=['GET'])
def send_json():
    file_path = request.args.get('filePath')
    if file_path : 
        decoded_fp = unquote(file_path)
    print(decoded_fp)
    final_fp = '.'+decoded_fp
    result = convertor.main(decoded_fp)
    return result




if __name__ == '__main__':
    app.run(debug=True)