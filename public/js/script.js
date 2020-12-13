console.log("HELLO")
const form = document.querySelector('form')
const inputdata = document.querySelector('input')
const message = document.getElementById('p1')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    document.getElementById('p1').innerHTML = "Loading..."
    document.getElementById('p2').innerHTML = ""
    const mainurl = inputdata.value
    
    data12 = {  
        "URL": mainurl,    
    } 
    console.log(data12)
    let options = { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json;charset=utf-8' 
        }, 
        body: JSON.stringify(data12) 
    } 

    let fetchRes = fetch('/dwadaw',options); 
    fetchRes.then(res => 
        res.json()).then((d) => { 
            if(d.error){
                document.getElementById('p1').innerHTML = "Error : Server side error.Please wait and try again"
            }else{
                document.getElementById('p2').innerHTML = "This URL is only valid for 14 Days as per MINIURL Policy";
                document.getElementById('p1').innerHTML = d.newurl;
            }
        }) 
})