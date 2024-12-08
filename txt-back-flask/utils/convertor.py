import re
import json
from multiprocessing import Pool

def process_chunk(chunk) : 
    results = []
    matches = re.findall(r'\] (.*)', chunk)

    for match in matches : 
        try:
            name,message = match.split(':',1)
            results.append({
                "name":name,
                "message":message
            })
        except ValueError : 
            pass
    
    return results

def main(path) :
    with open(path,'r') as file :
        content = file.read()

    # splitting the content into chunks for multiprocessing

    num_processes = 4 # 4 processes i have decieded would run paralelly
    chunk_size = len(content) // num_processes
    chunks = [content[i:i+chunk_size] for i in range(0,len(content),chunk_size)]

    with Pool(processes=num_processes) as pool :
        results = pool.map(process_chunk,chunks)

    match_list_dic = [entry for sublist in results for entry in sublist]

    return json.dumps(match_list_dic,indent=4)


    
#when you call this function from main file add a . in front of the file path to use the saved file
# if __name__ == "__main__" :
#     print(main("../uploads/schat.txt"))