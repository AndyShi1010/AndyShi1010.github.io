function doThing () {
  console.log('Hello!');
}

let windows = [];
let windowZIndex = 10;

window.onload = function() {
  console.log("Hello");
  setTimeout(function(){  
    document.getElementById("loader").style.display = "none";
    document.getElementById("desktop").classList.toggle("desktop-visible");
  }, 2);
  windowDrag(document.getElementById("window-about"), document.getElementById("window-about-titlebar"));
  windowDrag(document.getElementById("window-portfolio"), document.getElementById("window-portfolio-titlebar"));
}

function windowDrag(windowElement, draggableElement) {
  var offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;
  if (draggableElement) {
    draggableElement.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    offsetX = mouseX - e.clientX;
    offsetY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    // if ((elmnt.offsetTop - offsetY) < 0) {
    //   elmnt.style.top = 0 + "px";
    // }
    // if ((elmnt.offsetLeft - offsetX) < 0) {
    //   elmnt.style.left = 0 + "px";
    // } else {
      windowElement.style.left = (windowElement.offsetLeft - offsetX) + "px";
      windowElement.style.top = `max(0px,${(windowElement.offsetTop - offsetY)}px`;
    // }
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function openWindow(windowElement) {
	windows.push(windowElement);
  windowElement.classList.toggle('window-open');
  updateWindowOrder();
  console.log(windows);
}

function updateWindowOrder() {
  let windowZIndex = 10;
  windows.forEach(function(current) {
    current.style.zIndex = windowZIndex;
    windowZIndex += 10;
  })
}

function bringWindowForward(windowElement) {

}