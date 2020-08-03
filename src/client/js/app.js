/* Global Variables */
let api_url = "http://api.geonames.org/postalCodeLookupJSON?placename=&username=nawafa87";
let num = 0;
//036c576df3a147d393103065d3c0df56;
document.getElementById('bt').addEventListener('click',performAction);
let departing ;
export function performAction(e)
{
    const city = document.getElementById('city').value;
    departing = document.getElementById('departing').value;
    //departing = new Date(departing);
    if(city == '' || departing == ''){ 
    alert("You Should Enter city!");
       
     }
    else{
        departing = new Date(departing);
         api_url = `http://api.geonames.org/searchJSON?q=${city}&username=nawafa87`;  
        getData(api_url)
        .then(function(data){
        postData('/add', data)  
    })
   
    
    }
}
    
export async function getData(api_url){
    const res = await fetch(api_url)
    try{
        const data = await res.json()
        console.log(data);
        console.log(data.geonames[0]);
        console.log(data.geonames[0].countryName);
        console.log(data.geonames[0].name);
        console.log(data.geonames[0].lat);
        console.log(data.geonames[0].lng);
        document.getElementById('lan').innerHTML =`lan : ${data.geonames[0].lat}`;
        document.getElementById('lng').innerHTML = `lng : ${data.geonames[0].lng}`;
        document.getElementById('countryName').innerHTML = `country Name : ${data.geonames[0].countryName}`;
        document.getElementById('name').innerHTML = `name : ${data.geonames[0].name}`;
        

         let today = new Date(); 
        if(departing.getDate() <= today.getDate()+6){
            console.log("OK");
            getData2(`https://api.weatherbit.io/v2.0/current?lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=036c576df3a147d393103065d3c0df56`)
        }
        else{
            console.log("NOOOO");
            getData2(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=036c576df3a147d393103065d3c0df56`)
        }
         return data;
    }
    catch(error){
        console.log("error",error);
    }
    
}
  const getData2 = async(url = '')=>{
    const response = await fetch(url);
    try{    
        const newData = await response.json();
        console.log(newData);
        let {clouds,high_temp,low_temp} = newData.data[0];
        console.log(clouds+' '+high_temp+' '+low_temp);
        console.log(newData.data[0]);
        console.log(newData.city_name)
        postData('/add', newData)
        let today = new Date();
        if(departing.getDate() <= today.getDate()+6){
            console.log("OK2");
            getData3(`https://pixabay.com/api/?key=17623255-470774e4928590abd3c568b46&q=${newData.data[0].city_name}`)
        }
        else{
            console.log("NOOOO2");
            getData3(`https://pixabay.com/api/?key=17623255-470774e4928590abd3c568b46&q=${newData.city_name}`)
        }
        return newData;
        }
        
    catch(error){
        console.log("error",error);
    }
}

const getData3 = async(url = '')=>{
    const response = await fetch(url);
    try{    
        const newData = await response.json();
        console.log(newData);
        document.getElementById('photo').src = newData.hits[0].webformatURL;
        document.getElementById('photo').height = "400";
        document.getElementById('photo').width = "450";
        postData('/add', newData)
        return newData;
        }
        
    catch(error){
        console.log("error",error);
    }
}
 

const postData = async(url = '' , data = {})=>{
    const response = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),   
    });

    try{    
        const newData = await response.json();
        return newData;
        }
    catch(error){
        console.log("error",error);
    }
}