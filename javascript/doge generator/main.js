const url='https://dog.ceo/api/breeds/list/all'


fetch(url)
.then(res=>{
    return res.json()
})
.then(data=>{
   // console.log(data)
    const breedsArray = Object.keys(data.message) //here message is the key
    //console.log(breedsArray)
    for (let i=0; i < breedsArray.length; i++) {
        const option = document.createElement('option') //<option></option>
        option.value = breedsArray[i] //<option value='breed'>
        option.innerText = breedsArray[i] //<option value='breed'>breed</option>
        document.querySelector('.breeds').appendChild(option)  //appending each dog name into the selection tag
    }
})
document.querySelector('.breeds').addEventListener('change',event=>{
    const newurl=`https://dog.ceo/api/breed/${event.target.value}/images/random`
    displayimage(newurl);
    changeheadingname(event.target.value)
})

function displayimage(newurl)
{
    fetch(newurl)
    .then(res=>{
        return res.json();
    })
    .then(imgdata=>{
        //console.log("hi")
       //console.log(img)
       const imgsrc=imgdata.message //all data related to the api will be in imgdata in which we need the key with name message
       document.querySelector('.dog-img').src =imgsrc
    })
}

const changeheadingname= dogname=>{
      //  console.log(dogname)
    document.querySelector('#dog-name').innerText=`Dougie the ${dogname}`;
}


