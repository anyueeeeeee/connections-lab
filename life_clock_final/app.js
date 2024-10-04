//1. Make sure the page loads first
window.addEventListener('load', function () {
    // console.log("Page has loaded");

    let audioPlayer;

    function createAudioPlayer() {
        audioPlayer = document.createElement("audio");
        audioPlayer.src = "music/poolz_lookingatthesamestar.mp3";
        audioPlayer.loop = true;
        audioPlayer.autoplay = true;
        document.body.appendChild(audioPlayer);
    }
    
    // Check if the audio player already exists
    if (!document.getElementById("persistent-audio")) {
        createAudioPlayer();
    }

    function ageCalculate() {
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
                //5. Do something with the data
                let weeksLived = data.data.age_weeks;
                document.getElementById("weeksLived").innerHTML = weeksLived;

                let weeksLeft = 4000 - weeksLived;
                document.getElementById("weeksLeft").innerHTML = weeksLeft;

                let lifeLived = ((weeksLived / 4000) * 100).toFixed(2);
                document.getElementById("lifeLived").innerHTML = lifeLived + "%";

                let daysLeft = 28000 - data.data.age_days;
                updateCircularText(daysLeft);

                updateProgressCircle(lifeLived);

                //help from chatGPT
                window.weeksLivedGlobal = weeksLived; 
                window.dispatchEvent(new CustomEvent('weeksLivedUpdated', { detail: weeksLived })); //dispatch custom event
            })

            .catch(error => {
                console.log("Error! :" + error);
                let weeksLived = data.data.age_weeks;
                document.getElementById("weeksLived").innerHTML = "you're too alive";

                let weeksLeft = 4000 - weeksLived;
                document.getElementById("weeksLeft").innerHTML = "you're too alive";

                let lifeLived = (weeksLived / 4000) * 100;
                document.getElementById("lifeLived").innerHTML = "you're too alive";

                let daysLeft = 28000 - data.data.age_days;
                document.getElementById("daysLeft").innerHTML = "you're too alive";

            });
    }

    function updateCircularText(daysLeft) {
        const textPath = document.querySelector(".circular-text textPath");
        textPath.textContent = `· what are you going to do with your ${daysLeft} remaining sunrises? ·`;
    }

    function updateProgressCircle(lifeLived) {
        const circle = document.querySelector(".progress-stroke");
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        const offset = circumference - (lifeLived / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    this.document.querySelector("button").addEventListener("click", ageCalculate);
});