                                                       //----NAV BAR
const navSlide = () =>{
    const button = document.querySelector('.mobile');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')
    
                                                        //taggle Nav
    button.addEventListener('click', () =>{
        nav.classList.toggle('nav-active');

                                                         //Animate Links
    navLinks.forEach((link, index)=> {
        if (link.style.animation){
         link.style.animation = '';
        } else {
         link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.4 }s`;
        }
     });

  });

}

navSlide();
                                                         //----SLIDER circle

function imgSlider (anything){
    document.querySelector('.starbuks').src = anything;
}
function changeCircleColor(color){
    const circle = document.querySelector('.circle');
    circle.style.background = color;
}


                                      //-----SLIDER

let slideIndex = 1;
showSlides(slideIndex);

                                   //Next/previous controls

function plusSlides(n){
    showSlides(slideIndex += n);
}

function currendtSlide(n){
    showSlides(slideIndex = n);
}
 function showSlides(n){
    let i;
    let slides = document.querySelectorAll(".recipe");
    if (n > slides.length){slideIndex=1}
    if(n<1){slideIndex = slides.length}
    for (i = 0; i <slides.length; i ++){
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
 }
                                              //-----FORMA

let config ={

    "name_surname" :{
        required : true,
        minLength : 5,
        maxLength : 50
    },
    "user_name" :{
        required : true,
        minLength : 5,
        maxLength : 50
    },
    "email":{
        required : true,
        email : true,
        minLength : 5,
        maxLength : 50
    },
    "password":{
        required :true,
        minLength: 7,
        maxLength: 50,
        matching : 'repeat_password'
    },
    "repeat_password":{
        required :true,
        minLength: 7,
        maxLength: 50,
        matching : 'password'
    }
};

let validation = new Validation (config);

