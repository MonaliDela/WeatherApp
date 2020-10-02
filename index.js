
 const inputForm = document.querySelector("#getInputCity"); //select Input form 
 const displayWeatherInfoCard = document.querySelector("#displayWeatherInfoCard") //select weather container
 const inputFieldText = document.getElementById("inputCityText"); // select the input text box

 inputForm.addEventListener("submit", (event) => {
   event.preventDefault();

   const city = inputFieldText.value; //get the value from input text

   //validate the input - not null and not a number
   if((city !== "") && (isNaN(city))) { 
      inputFieldText.classList.add("is-valid");
      inputFieldText.classList.remove("is-invalid");

   } else {
      inputFieldText.classList.add("is-invalid");
      inputFieldText.classList.remove("is-valid");
   }

   if(inputFieldText.classList.contains("is-valid")) {

      //Invoke function with city parameter
      getWeatherInfo(city);

      //reset form
      inputForm.reset();
      inputFieldText.classList.remove("is-valid");
      inputFieldText.classList.remove("is-invalid");
   }
 
 });

 // emojis object used to find the right emoji from the icon code sent from the api
const wetherIcon = {
   '01d': '☀️',
   '02d': '⛅️',
   '03d': '☁️',
   '04d': '☁️',
   '09d': '🌧',
   '10d': '🌦',
   '11d': '⛈',
   '13d': '❄️',
   '50d': '💨',
   '01n': '☀️',
   '02n': '⛅️',
   '03n': '☁️',
   '04n': '☁️',
   '09n': '🌧',
   '10n': '🌦',
   '11n': '⛈',
   '13n': '❄️',
   '50n': '💨',
};

 //html code to set values using template literals
 const createWetherHtmlData = (city,description,tempetature, wetherImage, maxTemperature, minTemperature,feelsLike,day, hours, minutes, country) => {
   const html =
   `
   <!--job card-->
        <div class="row text-center cardstartdiv">
            <div class="col col-padding" >
                        <div class="row">
                            <div class="col">
                            <span class="AU"><b>${country}</b></span> 
                                <h3 class=" text-uppercase mt-3 cityName">${city } </h3>
                                <p class=" text-muted">${day}  ${hours}: ${minutes} ${hours > 12 ? "pm" : "am" } </p>
                                <hr>
                                <p class="descriptionStyle">${description }</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col weatherImg" ><span style="font-size: 45px;">${wetherImage }</span></div>
                            <div class="col temp" ><span style="font-size: 50px;">${ tempetature}</span></div>
                        </div>
                        <div class="row">
                            <div class="col tempPanel"  style="padding-top: 10px;" >
                                 <span style="font-size: 18px;">
                                 <span class="tempPanelFont">min </span>${minTemperature} <span class="vr">|</span> <span class="tempPanelFont">max </span>${maxTemperature}
                                 <span class="vr">|</span> <span class="tempPanelFont">feels like </span>${feelsLike}</span>
                                 </div>

                        </div>
            </div>
        </div>
   `;
   return html;
}
 
 //function to get weather API and display
 function getWeatherInfo(city) {

    const apiKey = " "; //weather API key

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ",&appid=" + apiKey)
    .then(response => response.json())
    //.then(response => console.log(response));
    .then(response => displyWeatherInfo(response));

 }
  
 // function to get data from fetch response
 function displyWeatherInfo(responseData) {

      //const fahrenheit = Math.round(((parseFloat(responseData.main.temp)-273.15)*1.8)+32); 
      console.log(responseData);

      const city = responseData.name;
      const description = responseData.weather[0].description;
      //get temperature in celsius from kelvin
      const tempetature = Math.round(parseFloat(responseData.main.temp)-273.15) + '&deg;';
      const wetherImage = wetherIcon[responseData.weather[0].icon];
      
      //get extra details
      const maxTemperature = Math.round(parseFloat(responseData.main.temp_max)-273.15) + '&deg;';
      const minTemperature = Math.round(parseFloat(responseData.main.temp_min)-273.15) + '&deg;';
      const feelsLike = Math.round(parseFloat(responseData.main.feels_like)-273.15) + '&deg;';
      const country = responseData.sys.country;

      //call the funciton and access return array values
      const dateTime = getDateTime ();
      const day = dateTime[0];
      const hours = dateTime[1];
      const minutes = dateTime[2];

      // create the card html
      const CardContent = createWetherHtmlData(city,description,tempetature, wetherImage, maxTemperature, minTemperature, feelsLike , day, hours, minutes, country);

      // render!
      displayWeatherInfoCard.innerHTML = CardContent;

   }

   //find date and time;
function getDateTime () {
            const todayDate = new Date();

            // Print local and UTC timezones
            const hours = todayDate.getHours();
            const minutes = todayDate.getMinutes();
            const day = todayDate.getDay();

            const dayName = {
               '1':'Monday',
               '2':'Tuesday',
               '3':'Wednesday',
               '4':'Thursday',
               '5':'Friday',
               '6':'Saturday',
               '0':'Sunday',
            }
            const dayOfWeek = dayName[day];
            //return an array containing multiple return values
           return [dayOfWeek, hours, minutes];
              
         }
//var _time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');

















