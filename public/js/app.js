const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const message = document.querySelector('#mesage-1')
const message1 = document.querySelector('#message-2')




weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    message.textContent = 'loading....'
    message1.textContent = ""
    const location = search.value
    console.log(location)

    fetch("http://localhost:3000/weather?address="+location).then((response) => {
    response.json().then((data)=>{
        if (data.error){
            return message.textContent= data.error
        }
        else{
            message.textContent = data.location
            message1.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

})