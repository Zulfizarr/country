
















let form=document.querySelector("form")
const template=document.querySelector("template").content
let country_list=document.querySelector(".country_list")


const handleRenderCountry=(arr)=>{
    if(arr?.length){
        country_list.innerHTML=null
        for(let i=0;i<arr.length;i++){
            let clone=template.cloneNode(true)
            let img=clone.querySelector("img")
            img.src=arr[i].flags?.png
            img.alt=arr[i]?.alt
            let name=clone.querySelector("h3")
            name.textContent=arr[i]?.name?.common
            country_list.appendChild(clone)
        }
    }
}
handleDefaultRequest= async ()=>{
    const request= await fetch("https://restcountries.com/v3.1/all")
    const response= await request.json()
handleRenderCountry(response?.slice(0,50))
}
const handleRequestCountry=(name,filter)=>{

    
if(name !==null){
    axios.get(` https://restcountries.com/v3.1/name/${name}`).then(response=>
    handleRenderCountry(response.data))
}else if(filter !==null ){
    axios.get(` https://restcountries.com/v3.1/region/${filter}`).then(response=>
    handleRenderCountry(response.data))
}else{
    handleDefaultRequest()
}
}


const handleSub=(event)=>{
    
    event.preventDefault()
    let data=new FormData(event.target)
    
    
        handleRequestCountry(data.get("name")?data.get("name"):null,data.get("filter")  !== "region"?data.get("filter"):null)

}
form.addEventListener("submit",handleSub)
handleDefaultRequest()
