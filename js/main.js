//                  <--------------------------------------<Getting Elements>------------------------------------------>
var 
// navbar
navBar = document.querySelector("nav"),
// Navbar Items
navItems = document.querySelectorAll(".nav-items-js"),
// Navbar Logo
navLogo = document.querySelector(".logo-js"),
// Website Sections
sections = document.querySelectorAll(".sections-js"),
// Up And Color Buttons
up = document.querySelectorAll(".up"),
// Color Buttons
colorBtns = document.querySelectorAll(".color-js"),
// Home Heading H1
homeHeading = document.querySelector(".home-h-js"),
// Work Section Buttons 
workBtns = document.querySelectorAll(".work-btn-js"),
// Work Section Photos
workPHotos = document.querySelectorAll(".work-photos-js"),
// Work Photo Layer
photoLayer = document.querySelector(".photo-overlay"),
// Body
body = document.querySelector("body"),
// Home Heading Tools 
html = "I'M ", c = 0 , text = homeHeading.getAttribute("data-text");

// <------------------------------------------------------------------------------------------------------------------------------------------->
//                  <-----------------------------------------<Functions>------------------------------------------>

// Functions To Scrolling
var navScroll = () =>{
    if(window.scrollY < 107){
        navBar.classList.remove("navbar-active");
        navItems.forEach(item =>{
            if(!item.classList.contains("active")) item.style.color = "white";
    })
        navBar.classList.replace("navbar-light" , "navbar-dark")
        navLogo.setAttribute("src" , "media/logo (1).png")
        up.forEach(btn =>{
            btn.style.transform = "translateX(100%)";
            btn.style.opacity = "0";
        })
        up[0].classList.remove("c-color-active")
    }else{
        navBar.classList.add("navbar-active");
        navItems.forEach(item =>{
            if(!item.classList.contains("active")) item.style.color = "black";
        })
        navBar.classList.replace("navbar-dark" , "navbar-light")
        navLogo.setAttribute("src" , "media/logo-dark.png")
        up.forEach(btn =>{
            btn.style.transform = "translateX(0)";
            btn.style.opacity = "1";
        })
    }

    for(var i=0; i<sections.length; i++){
        navItems[i].classList.remove("active")
        if(window.scrollY >= sections[i].getAttribute("data-top")){
            navItems[i].classList.add("active")
        }
    }
}
// Function To Work Section Navbar
var workBar = (e) =>{
    workPHotos.forEach(photo =>{
        // photo.style.display = "none";
        photo.classList.add("work-hidden")
        if(photo.hasAttribute(`data-${e.target.getAttribute("data-deleted")}`)){
            // photo.style.display = "inline-block"
            photo.classList.remove("work-hidden")
        }
    })
}
// Function To Open Photo Layer
var photoLayerView = (e) =>{
    body.style.overflow = "hidden"
    photoLayer.style.transform = "scale(1)"
    photoLayer.firstElementChild.setAttribute("src" , `${e.target.getAttribute("data-src")}`)
}
// Function To Close Photo Layer
var photoLayerViewClose = () =>{
    photoLayer.style.transform = "scale(0)"
    body.style.overflowY = "visible"
}
// Function To Stop Propagation
var stopPhotoPropagation = (e) =>{
    e.stopPropagation();
}
// Function To Slider Button
var colorSliding = () =>{
    up[0].classList.toggle("c-color-active");
}
// Function To Changing Colors
var changingColors = (e) =>{
    document.documentElement.style.setProperty("--main-color" , e.target.getAttribute("data-color"))
    localStorage.setItem("pageColor" , e.target.getAttribute("data-color"));
    if(e.target.hasAttribute("data-color")){
        colorSliding()
    }
}
// Function To Get From Local Storage
var storage = () =>{
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("pageColor"))
}
// Function To Changing Home Heading Text
var homeHeadingSlice = (t) =>{
    html = html + t.slice(c,c+1);
    if(t.slice(c,c+1) == ","){
        html = "I'M ";
    }
    homeHeading.innerHTML = html;
    c++;
    if(c >= t.length){
        html = "I'M "
        c = 0;
    }
}
// Function To Changing Work Section Photos When Clicking On Work Station Buttons
var workButtons = (e) =>{
    workBtns.forEach(btn =>{
        btn.classList.remove("active-work")
    })
    e.target.classList.add("active-work")
}

// <------------------------------------------------------------------------------------------------------------------------------------------->
//                  <-----------------------------------------<Add Listeners>------------------------------------------>

// Add Listener To Do Scrolling Functions
window.addEventListener("scroll" , navScroll);
// Add Listener To Storage Function
window.addEventListener("load" , storage)
// Add Listener To Work Station Buttons
workBtns.forEach(btn =>{
    btn.addEventListener("click" , workButtons);
})
// Add Listener To Color Slider Button
up[1].addEventListener("click" , colorSliding)
// Add Listener To Color Buttons
colorBtns.forEach(btn =>{
    btn.addEventListener("click" , changingColors)
})
// Add Listener To Work Navbar
workBtns.forEach(btn =>{
    btn.addEventListener("click" , workBar)
})
// Add listener To Work Photos To Open The Layer
workPHotos.forEach(photo =>{
    photo.addEventListener("click" , photoLayerView)
})
// Add Listener To Work Photo layer To Close The layer
photoLayer.addEventListener("click" , photoLayerViewClose)
// Add Listener On Photo In Work Photo Layer To Stop Propagation
photoLayer.firstElementChild.addEventListener("click" , stopPhotoPropagation)
// Interval To Changing Home Heading Text
setInterval(function(){
    homeHeadingSlice(text)
} , 250)