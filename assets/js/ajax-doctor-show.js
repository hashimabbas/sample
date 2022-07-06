/***** ajax code */
/*****get Nighburhoods in Selected City ****/
//document.getElementById('select-cities'); //.addEventListener('click', getCities);
//let cities = document.getElementById('select-cities');
//var selectedCityID = null;
//var selectedNeburhoodID = null;
//var selectedAllCities = null;

function getNeburhoods(city_id) {
    window.selectedCityID = city_id;
    window.selectedAllCities = null;
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/ajax/get/neburhoods/' + city_id, true);
    xhr.onload = function() {
        let neburhoods = JSON.parse(this.responseText);
        let output = '<option selected onclick="getDoctorInThisCity(' + city_id + ')">كل الأحياء</option>';
        document.getElementById('select-neburhood').innerHTML = output;
        for (i in neburhoods) {
            output += '<option onclick="getDoctorInThisNeburhood(' + neburhoods[i].id + ')">' + neburhoods[i].name + '</option>'
        }
        let htmlneburhoods = document.getElementById('select-neburhood').innerHTML = output;
        //console.log(htmlneburhoods);
        getDoctorInThisCity(city_id);
    }
    xhr.send();
}
/*******Get Doctors in Selected City */
function getDoctorsInThisCtity(city_id) {
    //console.log(city_id);
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/ajax/get/doctors/in/' + city_id, true);
    xhr.onload = function() {
            let doctors = JSON.parse(this.responseText);
            console.log(doctors);
            let output = "";
            for (i in doctors) {
                output += `
              <div class="card" style="padding: 20px" style='font-family: "Almarai", "Cambo", "Times New Roman", serif '>
                <div class="row">
                    <div class="col-sm-3">
                    
                ${(doctors[i].image != null)? `<img src="{{url('storage/'.${doctors[i].image})}}" style="border-radius: 50%" alt=""> `: `<img src="{{url('../admin/dist/img/avatar5.jpeg')}}"  alt="صورة الطبيب">`}
                    
                    </div>
                    <div class="col-sm-9">
                      <span>
            ${(doctors[i].gander == 'male')?  `  دكتور: `  :  ` دكتورة: ` }
              </span> <span class="doctor_name">${doctors[i].full_name}</span>
                        <br>
                        <span>التخصص: </span> <span>${doctors[i].notes}</span>
                        <br>
                        <span>العنوان: </span> <span>${doctors[i].address}</span>
                        <br>
                        <span>سعر الكشف: </span> <span>${doctors[i].appo_price}</span>
                        <br>
                        <span>رقم الهاتف: </span> <span>${doctors[i].phone}</span>
                        <br>
                        <a href="/appoientment/${doctors[i].id}">
                            <div class="btn btn-success btn-lg" style="background-color: #e74c3c; color:#FFF;">احجز الآن</div>
                        </a>
                        <a href="/home/doctor/detials/${doctors[i].id}">
                            <div class="btn btn-lg" style="background-color: #27ae60;color:#FFF">المزيد عن الطبيب</div>
                        </a>
                    </div>
                </div>
                
                                                    
            </div>
            `
        }
        let htmlDoctors = document.getElementById("doctors").innerHTML = output;
        console.log(htmlDoctors);

    }
    xhr.send();
}
// **************** Get All Neburhoods When you clic on all-city option **************
/** from this function you can 
 * 1- disable all neigburhood 
 * 2- get all doctors
 */
function getAllNeburhoods() {
    window.selectedCityID = null;
    window.selectedNeburhoodID = null;
    selectedAllCities = 200; //this for fillter all doctor with specific specilty in function "getDoctorForThisSpecialty"
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/ajax/get-All/Doctors', true);
    xhr.onload = function() {
        let doctors = JSON.parse(this.responseText);
        let output = "";
        for (i in doctors) {
            output += `
            <div class="col-md-6">
                <div class="card doctor-card card-hover-effect" for="doctor${doctors[i].id}" id="selected_card" >
                    <input type="radio" name="doctor_id" id="doctor_check${doctors[i].id}" value="${doctors[i].id}">
                    <div class="front" id="front" for="doctor_check${doctors[i].id}">
                    <header>
                        ${(doctors[i].image == null)? '<img src="../admin/dist/img/avatar5.jpeg" alt="user-avatar" class="img-circle img-fluid">' :'<img src="{{ asset("storage/" . ${doctors.[i].image)} }}" alt="user-avatar" class="img-circle img-fluid">'}
                            
                    
                    </header>	
                        <h3>${doctors[i].full_name}</h3>
                        <p style="text-align: right">التخصص: ${doctors[i].notes}</p>
                        <p style="text-align: right">الدرجة العلمية: ${doctors[i].medical_degree}</p>
                        <p style="text-align: right">العنوان: ${doctors[i].address}</p>
                        <p style="text-align: right">رسوم الفحص: ${doctors[i].appo_price}</p>
                        <span>Hover To see Details</span>
                        <br>                                
                        <label for="doctor_check${doctors[i].id}">
                        <div onclick="selecteDoctor(this)" class="btn btn-success" name="next" id="check-button">
                            اضعط هنا لإختيار الطبيب
                        </div>
                        </label>
                        <input type='button' class='btn btn-next btn-fill btn-warning btn-wd btn-sm' name='next'
                        value='بعد اختيارك الطبيب اضغط هنا لإكمال الحجز' />
                    </div>
                </div>
            </div>`
        }
        let output_selected_option = '<option value=""  selected>كل الأحياء</option>';
        let htmlneburhoods = document.getElementById('select-neburhood').innerHTML = output_selected_option;
        let htmlDoctors = document.getElementById("doctor_card_list").innerHTML = output;
        //console.log(htmlneburhoods);
    }
    console.log('all doctors');
    xhr.send();
}
//***********************Get All Doctor in particular Neghiburhood */
function getDoctorInThisNeburhood(neburhood_id) {
    window.selectedNeburhoodID = neburhood_id;
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/ajax/get_doctor/in/neburhood/' + neburhood_id, true);
    xhr.onload = function() {
        let doctors = JSON.parse(this.responseText);
        selectedNeburhoodID = neburhood_id;
        let output = "";
        for (i in doctors) {
            output += `
            <div class="col-md-6">
                <div class="card doctor-card card-hover-effect" for="doctor${doctors[i].id}" id="selected_card" >
                    <input type="radio" name="doctor_id" id="doctor_check${doctors[i].id}" value="${doctors[i].id}">
                    <div class="front" id="front" for="doctor_check${doctors[i].id}">
                    <header>
                        ${(doctors[i].image == null)? '<img src="../admin/dist/img/avatar5.jpeg" alt="user-avatar" class="img-circle img-fluid">' :'<img src="{{ asset("storage/" . ${doctors.[i].image)} }}" alt="user-avatar" class="img-circle img-fluid">'}
                            
                    
                    </header>	
                        <h3>${doctors[i].full_name}</h3>
                        <p style="text-align: right">التخصص: ${doctors[i].notes}</p>
                        <p style="text-align: right">الدرجة العلمية: ${doctors[i].medical_degree}</p>
                        <p style="text-align: right">العنوان: ${doctors[i].address}</p>
                        <p style="text-align: right">رسوم الفحص: ${doctors[i].appo_price}</p>
                        <span>Hover To see Details</span>
                        <br>                                
                        <label for="doctor_check${doctors[i].id}">
                        <div onclick="selecteDoctor(this)" class="btn btn-success" name="next" id="check-button">
                            اضعط هنا لإختيار الطبيب
                        </div>
                        </label>
                        <input type='button' class='btn btn-next btn-fill btn-warning btn-wd btn-sm' name='next'
                        value='بعد اختيارك الطبيب اضغط هنا لإكمال الحجز' />
                    </div>
                </div>
            </div>`
        }
        let htmlDoctors = document.getElementById("doctor_card_list").innerHTML = output;
    }
    xhr.send();
}


/*******************fhis function for fillter doctor by specialty */
function getDoctorForThisSpecialty(specialty) {
    //console.log(specialty);

    //console.log(selectedCityID);
    xhr = new XMLHttpRequest();
    //fillter doctors by specialty when the city & neighburhood did'n choose
    if (specialty != null && window.selectedNeburhoodID == null && window.selectedCityID == null && window.selectedAllCities == null) {
        xhr.open('get', `/ajax/get_doctor/by/specialty/${specialty}/${selectedNeburhoodID}/${selectedCityID}/${window.selectedAllCities}`, true);
        xhr.onload = function() {
            let doctors = JSON.parse(this.responseText);
            console.log('spy');
            console.log(selectedNeburhoodID);
            let output = "";
            for (i in doctors) {
                output += `
                <div class="col-md-12">
                <div class="card doctor-card card-hover-effect" for="doctor${doctors[i].id}" id="selected_card" >
                    <input type="radio" name="doctor_id" id="doctor_check${doctors[i].id}" value="${doctors[i].id}">
                    <div class="front" id="front" for="doctor_check${doctors[i].id}">
                    <header>
                        ${(doctors[i].image == null)? '<img src="/admin/dist/img/avatar5.jpeg" alt="user-avatar" class="img-circle img-fluid">' :"<img src=url('storage/"+ doctors[i].image +'") alt="user-avatar" class="img-circle img-fluid">'}
                            
                    
                    </header>
                    <p >${doctors[i].full_name}</p>
                    <div class="row">
                        <div class="col-md-6">
                            <p style="text-align: right">رقم الهاتف: ${doctors[i].notes}</p>
                        </div>
                        <div class="col-md-6">
                            
                            <p style="text-align: right">التخصص: ${doctors[i].notes}</p>
                            <p style="text-align: right">الدرجة العلمية: ${doctors[i].medical_degree}</p>
                            <p style="text-align: right">العنوان: ${doctors[i].address}</p>
                            <p style="text-align: right">رسوم الفحص: ${doctors[i].appo_price}</p>
                        </div>
                    </div>	
                        
                        <br>                                
                        <label for="doctor_check${doctors[i].id}">
                        <div onclick="selecteDoctor(this)" style="margin-bottom: 10px" class="btn btn-success" 
                        name="finish" value="Finish" id="check-button" type="submit">
                            اضعط هنا لإختيار الطبيب
                        </div>
                        </label>
                    </div>
                </div>
            </div>`
            }
            let htmlDoctors = document.getElementById("doctor_card_list").innerHTML = output;
        }
        xhr.send();
    } else if (specialty != null && window.selectedNeburhoodID != null && window.selectedCityID != null && window.selectedAllCities == null) {
        xhr.open('get', `/ajax/get_doctor/by/specialty/${specialty}/${selectedNeburhoodID}/${selectedCityID}/${window.selectedAllCities}`, true);
        xhr.onload = function() {
            let doctors = JSON.parse(this.responseText);
            console.log('$sep & nebu & city');
            console.log(doctors);
            let output = "";
            for (i in doctors) {
                output += `
                <div class="col-md-6">
                <div class="card doctor-card card-hover-effect" for="doctor${doctors[i].id}" id="selected_card" >
                    <input type="radio" name="doctor_id" id="doctor_check${doctors[i].id}" value="${doctors[i].id}">
                    <div class="front" id="front" for="doctor_check${doctors[i].id}">
                    <header>
                        ${(doctors[i].image == null)? '<img src="../admin/dist/img/avatar5.jpeg" alt="user-avatar" class="img-circle img-fluid">' :'<img src="{{ asset("storage/" . ${doctors.[i].image)} }}" alt="user-avatar" class="img-circle img-fluid">'}
                            
                    
                    </header>	
                        <h3>${doctors[i].full_name}</h3>
                        <p style="text-align: right">التخصص: ${doctors[i].notes}</p>
                        <p style="text-align: right">الدرجة العلمية: ${doctors[i].medical_degree}</p>
                        <p style="text-align: right">العنوان: ${doctors[i].address}</p>
                        <p style="text-align: right">رسوم الفحص: ${doctors[i].appo_price}</p>
                        <span>Hover To see Details</span>
                        <br>                                
                        <label for="doctor_check${doctors[i].id}">
                        <div onclick="selecteDoctor(this)" class="btn btn-success" name="next" id="check-button">
                            اضعط هنا لإختيار الطبيب
                        </div>
                        </label>
                        <input type='button' class='btn btn-next btn-fill btn-warning btn-wd btn-sm' name='next'
                        value='بعد اختيارك الطبيب اضغط هنا لإكمال الحجز' />
                    </div>
                </div>
            </div>`
            }
            let htmlDoctors = document.getElementById("doctor_card_list").innerHTML = output;
        }
        xhr.send();
    } else if (specialty != null && window.selectedNeburhoodID != null && window.selectedCityID == null && window.selectedAllCities == null) {
        xhr.open('get', `/ajax/get_doctor/by/specialty/${specialty}/${selectedNeburhoodID}/${selectedCityID}/${window.selectedAllCities}`, true);
        xhr.onload = function() {
            let doctors = JSON.parse(this.responseText);
            console.log('spe & nebu');
            console.log(doctors);
            let output = "";
            for (i in doctors) {
                output += `
                <div class="col-md-6">
                    <div class="card doctor-card card-hover-effect" for="doctor${doctors[i].id}" id="selected_card" >
                        <input type="radio" name="doctor_id" id="doctor_check${doctors[i].id}" value="${doctors[i].id}">
                        <div class="front" id="front" for="doctor_check${doctors[i].id}">
                        <header>
                            ${(doctors[i].image == null)? '<img src="../admin/dist/img/avatar5.jpeg" alt="user-avatar" class="img-circle img-fluid">' :'<img src="{{ asset("storage/" . ${doctors.[i].image)} }}" alt="user-avatar" class="img-circle img-fluid">'}
                                
                        
                        </header>	
                            <h3>${doctors[i].full_name}</h3>
                            <p style="text-align: right">التخصص: ${doctors[i].notes}</p>
                            <p style="text-align: right">الدرجة العلمية: ${doctors[i].medical_degree}</p>
                            <p style="text-align: right">العنوان: ${doctors[i].address}</p>
                            <p style="text-align: right">رسوم الفحص: ${doctors[i].appo_price}</p>
                            <span>Hover To see Details</span>
                            <br>                                
                            <label for="doctor_check${doctors[i].id}">
                            <div onclick="selecteDoctor(this)" class="btn btn-success" name="next" id="check-button">
                                اضعط هنا لإختيار الطبيب
                            </div>
                            </label>
                            <input type='button' class='btn btn-next btn-fill btn-warning btn-wd btn-sm' name='next'
                            value='بعد اختيارك الطبيب اضغط هنا لإكمال الحجز' />
                        </div>
                    </div>
                </div>`
            }
            let htmlDoctors = document.getElementById("doctor_card_list").innerHTML = output;
        }
        xhr.send();
    } else
    if (specialty != null && window.selectedNeburhoodID == null && window.selectedCityID != null && window.selectedAllCities == null) {
        xhr.open('get', `/ajax/get_doctor/by/specialty/${specialty}/${window.selectedNeburhoodID}/${window.selectedCityID}/${window.selectedAllCities}`, true);
        xhr.onload = function() {
            let doctors = JSON.parse(this.responseText);
            console.log('spe && city');
            console.log(window.selectedCityID);
            console.log(doctors);
            let output = "";
            for (i in doctors) {
                output += `
                <div class="col-md-6">
                    <div class="card doctor-card card-hover-effect" for="doctor${doctors[i].id}" id="selected_card" >
                        <input type="radio" name="doctor_id" id="doctor_check${doctors[i].id}" value="${doctors[i].id}">
                        <div class="front" id="front" for="doctor_check${doctors[i].id}">
                        <header>
                            ${(doctors[i].image == null)? '<img src="../admin/dist/img/avatar5.jpeg" alt="user-avatar" class="img-circle img-fluid">' :'<img src="{{ asset("storage/" . ${doctors.[i].image)} }}" alt="user-avatar" class="img-circle img-fluid">'}
                                
                        
                        </header>	
                            <h3>${doctors[i].full_name}</h3>
                            <p style="text-align: right">التخصص: ${doctors[i].notes}</p>
                            <p style="text-align: right">الدرجة العلمية: ${doctors[i].medical_degree}</p>
                            <p style="text-align: right">العنوان: ${doctors[i].address}</p>
                            <p style="text-align: right">رسوم الفحص: ${doctors[i].appo_price}</p>
                            <span>Hover To see Details</span>
                            <br>                                
                            <label for="doctor_check${doctors[i].id}">
                            <div onclick="selecteDoctor(this)" class="btn btn-success" name="next" id="check-button">
                                اضعط هنا لإختيار الطبيب
                            </div>
                            </label>
                            <input type='button' class='btn btn-next btn-fill btn-warning btn-wd btn-sm' name='next'
                            value='بعد اختيارك الطبيب اضغط هنا لإكمال الحجز' />
                        </div>
                    </div>
                </div>`
            }
            let htmlDoctors = document.getElementById("doctor_card_list").innerHTML = output;
        }
        xhr.send();
    } else if (specialty != null && window.selectedNeburhoodID == null && window.selectedCityID == null && window.selectedAllCities == 200) {
        xhr.open('get', `/ajax/get_doctor/by/specialty/${specialty}/${window.selectedNeburhoodID}/${window.selectedCityID}/${window.selectedAllCities}`, true);
        xhr.onload = function() {
            let doctors = JSON.parse(this.responseText);
            console.log('all city && speci');
            console.log(window.selectedCityID);
            console.log(doctors);
            let output = "";
            for (i in doctors) {
                output += `
                <div class="col-md-6">
                    <div class="card doctor-card card-hover-effect" for="doctor${doctors[i].id}" id="selected_card" >
                        <input type="radio" name="doctor_id" id="doctor_check${doctors[i].id}" value="${doctors[i].id}">
                        <div class="front" id="front" for="doctor_check${doctors[i].id}">
                        <header>
                            ${(doctors[i].image == null)? '<img src="../admin/dist/img/avatar5.jpeg" alt="user-avatar" class="img-circle img-fluid">' :'<img src="{{ asset("storage/" . ${doctors.[i].image)} }}" alt="user-avatar" class="img-circle img-fluid">'}
                                
                        
                        </header>	
                            <h3>${doctors[i].full_name}</h3>
                            <p style="text-align: right">التخصص: ${doctors[i].notes}</p>
                            <p style="text-align: right">الدرجة العلمية: ${doctors[i].medical_degree}</p>
                            <p style="text-align: right">العنوان: ${doctors[i].address}</p>
                            <p style="text-align: right">رسوم الفحص: ${doctors[i].appo_price}</p>
                            <span>Hover To see Details</span>
                            <br>                                
                            <label for="doctor_check${doctors[i].id}">
                            <div onclick="selecteDoctor(this)" class="btn btn-success" name="next" id="check-button">
                                اضعط هنا لإختيار الطبيب
                            </div>
                            </label>
                            <input type='button' class='btn btn-next btn-fill btn-warning btn-wd btn-sm' name='next'
                            value='بعد اختيارك الطبيب اضغط هنا لإكمال الحجز' />
                        </div>
                    </div>
                </div>`
            }
            let htmlDoctors = document.getElementById("doctor_card_list").innerHTML = output;
        }
        xhr.send();
    }
}
/*** selecteDoctor Function */
function selecteDoctor(e) {

    //this is part for doctor selection 
    //in this part will select doctor card and styling it 
    //get all front div
    var front = document.getElementsByClassName("front");
    //console.log(front);
    //set background-color and color to fron div
    for (var i = 0; i < front.length; i++) {
        front[i].style.backgroundColor = '#EEEEEE';
        front[i].style.color = '#111111';
    }
    console.log(this);
    //set curent div to another color to make it differnt
    e.parentNode.parentNode.style.backgroundColor = 'rgb(23, 53, 39)';
    e.parentNode.parentNode.style.color = "#FFFFFF";
    //delete All next button
    let allNextButton = document.getElementsByClassName('all-next-button');
    for (let i = 0; i < allNextButton.length; i++) {
        allNextButton[i].style.display = "none";
    }
    //make the next button and append it to dom
    let newButton = document.createElement('input');
    newButton.className = "next-button";
    newButton.className = "btn";
    newButton.className = "btn btn-defualt all-next-button";
    newButton.setAttribute('name', 'next');
    newButton.setAttribute('value', 'التالي');
    let container = e.parentNode.parentNode;
    let lable = e.parentNode;
    container.insertBefore(newButton, lable);
    console.log(newButton);
}