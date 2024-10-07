//1. Make sure the page loads first
window.addEventListener('load', function () {
    // console.log("Page has loaded");
    
    function ageCalculate(){
    let inputDate = new Date(document.getElementById("date_input").value);
    
    let birthDate = String(inputDate.getDate()).padStart(2, '0'); // Ensure day is 2 digits, chatGPT
    let birthMonth = String(inputDate.getMonth() + 1).padStart(2, '0'); // Ensure month is 2 digits, chatGPT
    let birthYear = inputDate.getFullYear();

    let url = `https://api.apiverve.com/v1/agecalculator?dob=${birthYear}-${birthMonth}-${birthDate}`;

    //2. Request data
    fetch(url, {
        headers: {
            'x-api-key': '66f2352f-620e-4969-8431-2bde66259e4f', // Replace with your actual API key
            'Content-Type': 'application/json'
        }
    })
        
        //3. Then get the status of the request 
        .then(response => response.json()) 
 
        //4. Then access the data
        .then(function (data) {
            // console.log(data);
            let weeksLived = data.data.age_weeks;
            document.getElementById("weeksLived").innerHTML=weeksLived;

            let weeksLeft = 4000 - weeksLived;
            document.getElementById("weeksLeft").innerHTML=weeksLeft;

            let lifeLived = (weeksLived/4000)*100;
            document.getElementById("lifeLived").innerHTML=lifeLived;
        })

        .catch(error => {
            console.log("Error! :" + error);
            let weeksLived = data.data.age_weeks;
            document.getElementById("weeksLived").innerHTML="you're too alive";

            let weeksLeft = 4000 - weeksLived;
            document.getElementById("weeksLeft").innerHTML="you're too alive";

            let lifeLived = (weeksLived/4000)*100;
            document.getElementById("lifeLived").innerHTML="you're too alive";

        }); 
    }

    this.document.querySelector("button").addEventListener("click",ageCalculate);
});
