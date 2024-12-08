export const fileReader = async (file)=>{
    if(!file)
    {
        console.log("No File Provided")
        return;
    }
    const reader = await new FileReader();
    console.log(reader)
    reader.onload = (event)=>{
        console.log("File Content : ")
        console.log(event.target.result)
    }
    
}