




//Side Gallery 

var slideIndex = 1;
var handler;
var ul;
var imageWidth;
var jsonData;
var jsonfile = 'assets/data/main.json';
    

window.onload = function() {
    // Test to see if the browser supports the HTML template element by checking
    // for the presence of the template element's content attribute.    
    if('content' in document.createElement('template'))
    {
        loadData(jsonfile);
        initial();
    }
    else
    {
        
    }
}



function loadData(dataUrl)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200)
            {	
                var jsonData = JSON.parse(xhr.responseText);
                hextemplate(jsonData);
                setUpGallery(jsonData);
                //console.log('json');
            }
            else
            {
                //console.log(xhr.statusText);
            }
        }
    }
    xhr.send();
}


function loadGallery(dataUrl, gallerySet)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200)
            {
                var jsonData = JSON.parse(xhr.responseText);
                setUpGallery(jsonData, gallerySet);
                initial();
                //console.log('loadGallery')
            }
            else
            {
                //console.log(xhr.statusText);
            }
        }
    }
    xhr.send();   
}


function initial() {
    
    var image_slider = document.querySelector('#image_slider');
    var gallery_wall = document.getElementsByClassName('gallery_wall');   
    var gallery_title = document.querySelector('#gallery_title');
    var ScrollPosition = 0;
    slideIndex = 1;
    image_slider.scrollLeft = 0;
    
    image_slider.addEventListener('scroll', function () {
        // Direction of scroll 
        
        
        if(image_slider.scrollLeft > ScrollPosition) 
        {
            if(image_slider.scrollLeft > gallery_wall[slideIndex-1].offsetLeft ) 
            {
                showSlides(slideIndex += 1);  
            }
        }
        else
        {
            if((gallery_wall[slideIndex-1].offsetLeft-gallery_wall[slideIndex-1].offsetWidth) > image_slider.scrollLeft)
            {
                showSlides(slideIndex += -1);  
            }
        }
        ScrollPosition = image_slider.scrollLeft;
    }, { capture: true, passive: true });
    
}


function setUpHeader()
{
    var site_title = document.querySelector('#site-title');
    var gallery_title = document.querySelector('#gallery_title');
    var gallery_wall = document.querySelectorAll('.gallery_wall');
    //var marginLeft = mySlides[0].offsetLeft;
    var marginLeft = gallery_wall[slideIndex-1].offsetLeft + site_title.offsetWidth;
    
    site_title.style.marginLeft = marginLeft.toString().concat('px');
    //console.log(site_title.style.marginLeft);
}


function handlefile(aFileURL, callback) {
    //https://developers.google.com/web/fundamentals/primers/promises
    //var promiseObj = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
    xhr.open('GET', aFileURL, true);
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200)
            {
                var reader = new FileReader();
                // We only need the start of the file for the Exif info.
                //xhr.response is now a blob object
                //Change into ArrayBuffer from Reader
                reader.readAsArrayBuffer(xhr.response.slice(0, 128 * 1024));
                
                //reader.readAsDataURL(xhr.response);
                reader.onload = function(event) {
                    //console.log(event.target.result);    
                    try {
                        var tags = ExifReader.load(event.target.result);
                        console.log(tags);
                        // The MakerNote tag can be really large. Remove it to lower
                        // memory usage if you're parsing a lot of files and saving the
                        // tags.
                        delete tags['MarkerNote'];
                        callback(null, tags, aFileURL);
                    } catch(error) {
                        callback(xhr.status, null, null);
                    }
                }
            } else {
                xhr.ontimeout = function () {
                    //reject('timeout');
                }
            }
            
        }
    }
    xhr.send();
    //});
    
    //return promiseObj;
}


function getFileName(url) {
    //this gets the full url
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //return
    return url;
}



function listTags(error, tags, link) {
    if(error) {
        throw error;
    } else {
        try {
        var gallery = document.querySelector('#gallery_images_template');
        var image_slider = document.querySelector('#image_slider');
        
        
        //Fill up the content of gallery
        gallery.content.querySelector('h3').textContent = tags['title'].description;
        gallery.content.querySelector('img').src = link;
        gallery.content.querySelector('img').alt = tags['title'].description;
        gallery.content.querySelector('figcaption').textContent = tags['description'].description;
        //console.log(tags['description'].description);
        /*
        if(tags['Label'].description == 'portrait') {
            gallery.content.querySelector('figure').className = 'gallery_wall portrait';
        } else {
            gallery.content.querySelector('figure').className = 'gallery_wall landscape';
        }
        
        */
        if(tags['PixelXDimension'].value < tags['PixelYDimension'].value) {
        	gallery.content.querySelector('figure').className = 'gallery_wall portrait';
        } else {
        	gallery.content.querySelector('figure').className = 'gallery_wall landscape';
        }
     

				
        gallery.content.querySelector('figure').style.order = getFileName(link.replace('.jpg', ''));
        
        // Clone the new list and insert it into the menu
        var galleryClone = document.importNode(gallery.content, true);
        
        //append to the categories
        image_slider.appendChild(galleryClone); 
        } catch(e) {
            console.error('Gallery Boom!', e);
        }
    }
}


function setUpGallery(jsonData, gallerySet = 1) {
    
    var image_slider = document.querySelector('#image_slider');
    var dot_container = document.querySelector('#dots');
    var dot = document.querySelectorAll('.dot');
    var gallery_wall = document.querySelectorAll('.gallery_wall');
    
    //Remove the gallery set and dot
    if(gallery_wall.length > 0) {
        for (var p = 0; p < gallery_wall.length; p++) {
            gallery_wall[p].parentNode.removeChild(gallery_wall[p])
            dot[p].parentNode.removeChild(dot[p]);
        }
    }
    
    //Set up the position of title
    var gallery_title = document.querySelector('#gallery_title');
    var gallery_caption = document.querySelector('#gallery_caption');
    gallery_title.textContent = jsonData.hexagon[gallerySet].title;
    gallery_caption.textContent = jsonData.hexagon[gallerySet].caption;
    
    
    for (var i = 0; i < jsonData.hexagon[gallerySet].galleryPhoto; i++)
    {
        var span = document.createElement('span');
        
        
        try {
            //handlefile('assets/images/' + jsonData.hexagon[gallerySet].src + '/' + Number(i+1) + '.jpg', listTags);   
            handlefile(jsonData.hexagon[gallerySet].src[i].url, listTags);
            
        } catch (e) {
            console.error('Request Boom!', e);
        }
        
        
        if(i === 0)
        {
            span.className = 'dot dotActive';
        }
        else
        {
            span.className = 'dot';
        }
        
        span.setAttribute('onclick', 'currentSlide(' + Number(i+1) + ')');

        //append to the categories
        //image_slider.appendChild(galleryClone);             
        //append to the dot container
        dot_container.appendChild(span);
    }
    //console.log(document.querySelector('#close_btn'));
    
    //if (gallerySet == 1) {
    //    disablehex();
    //}
    
    if (document.querySelector('#menu_btn') === null) {
        //initial();
        closeNav();
    }
}




function hextemplate(hexData) {
            
    // HTML5 Template
    
        // Instantiate the table with the existing HTML tbody
        // and the row with the template
        var hex = document.querySelector('#hexTemplate');
        var pusher = document.querySelector('#pusherTemplate');
        var categories = document.querySelector('#categories');
        
        for (var i = 0; i < hexData.hexagon.length; i++)
        {
            if(hexData.hexagon[i].content == 'pusher')
            {
                //Clone the new pusher hex into the menu
                var pusherClone = document.importNode(pusher.content, true);
                
                categories.appendChild(pusherClone);
            }
            else
            {
                hex.content.querySelector('li').setAttribute('onclick', 'loadGallery("' + jsonfile + '",' + i + ');');
                //hexData.hexagon[i].galleryPhotos 
                hex.content.querySelector('i').className = hexData.hexagon[i].icon;
                hex.content.querySelector('h1').textContent = hexData.hexagon[i].title;
                hex.content.querySelector('p').textContent = hexData.hexagon[i].caption;
                // Clone the new list and insert it into the menu
                var hexClone = document.importNode(hex.content, true);
                
                //append to the categories
                categories.appendChild(hexClone);                
            }
        }
}

// Random pick the number 1 to period 
function generateRandom(period)
{
    return Math.floor(Math.random()*period + 1);
}





function getOffset( elment ) {
    var _x = 0;
    var _y = 0;
    while( elment && !isNaN( elment.offsetLeft ) && !isNaN( elment.offsetTop ) ) {
        _x += elment.offsetLeft - elment.scrollLeft;
        _y += elment.offsetTop - elment.scrollTop;
        elment = elment.offsetParent;
    }
    return { top: _y, left: _x };
}




// Menu Icon
function toggle_change(x) {
    x.classList.toggle("change");
}

// Off-Canvas Menu
function openNav(x) {
    
    toggle_change(x);
    scrollToLeft();
    

    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav").style.overflow = "scroll";
    //document.getElementById("off-canvas").style.width = "calc(25%)";
    //document.getElementById("content").style.marginLeft = "500px";
    document.getElementById("menu_btn").id = "close_btn";
    
    var close_btn = document.getElementById("close_btn");
    //close_btn.style.marginLeft = "calc(16%)";
    close_btn.setAttribute("onclick", "closeNav()"); 
    
    
    
}

function scrollToLeft() {
        
    var wrapper = document.querySelector('.horizontal-scroll-wrapper');        
    wrapper.scrollTo(0, 0);
}


function closeNav() {
    
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.overflow = "hidden";

    
    
    //Changing the css style below
    //document.getElementById("off-canvas").style.width = "0";
    //document.getElementById("content").style.margin= "auto";
    document.getElementById("close_btn").id = "menu_btn";
    
    //Reset back to menu_btn
    var menu_btn = document.getElementById("menu_btn");
    //menu_btn.style.marginLeft = "0";    
    menu_btn.setAttribute("onclick", "openNav(this)"); 
    menu_btn.classList.remove("change");
}


// Next/previous controls
function plusSlides(n, indicator) {
    var click = indicator.onclick;
    indicator.onclick = null;
    var wrapper = document.querySelector('.horizontal-scroll-wrapper');        
    var gallery_wall = document.querySelectorAll('.gallery_wall');
    /* Position the center of gallery */
    
    slideIndex += n;

    if (slideIndex > gallery_wall.length) {
        slideIndex = gallery_wall.length;    
    } 
    else if (slideIndex < 1) {
        slideIndex = 1; 
    }
    
    
    if(gallery_wall[slideIndex-1].classList.contains('portrait')) {
        animatescrollTo(wrapper, gallery_wall[slideIndex-1].offsetLeft - gallery_wall[slideIndex-1].offsetWidth*1.05, 150);
    }
    else {
        animatescrollTo(wrapper, gallery_wall[slideIndex-1].offsetLeft - gallery_wall[slideIndex-1].offsetWidth/4.68, 150);
    }
    
    showSlides(slideIndex);
    indicator.onclick = click;
    
}

// Thumbnail image controls
function currentSlide(n) {

    
    var wrapper = document.querySelector('.horizontal-scroll-wrapper');
    var gallery_wall = document.querySelectorAll(".gallery_wall");
    var to;
    
    slideIndex = n;
    
    //console.log(slideIndex);
    if(gallery_wall[slideIndex-1].classList.contains('portrait')) {
        animatescrollTo(wrapper, gallery_wall[slideIndex-1].offsetLeft - gallery_wall[slideIndex-1].offsetWidth*1.05, 150);
    }
    else
    {
        animatescrollTo(wrapper, gallery_wall[slideIndex-1].offsetLeft - gallery_wall[slideIndex-1].offsetWidth/4.68, 150);
    }

    
    showSlides(slideIndex);
}

function showSlides(n) {
    
    
    var gallery_wall = document.querySelectorAll('.gallery_wall');
    var dots = document.querySelectorAll('.dot');
    
    
    if (n > gallery_wall.length) {
        slideIndex = gallery_wall.length;    
    } 
    else if (n < 1) {
        slideIndex = 1; 
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dotActive", "");
    }
    dots[slideIndex-1].className += " dotActive";
}


function animatescrollTo(element, to = 0, duration= 1000) {

    const start = element.scrollLeft;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = (() => {

      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollLeft = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    });

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {

    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };




/* Detect the keyboard */

function leftArrowPressed() {
   plusSlides(-1);
}

function rightArrowPressed() {
   plusSlides(1);
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 27:
            closeNav();
            break;
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};






