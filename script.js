let mobileView = true;

if (!(navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i))) {
  mobileView = false;
 }

// let windows = [];
const minWindowZ = 10;
let openedWindows = [];



let windowObjs = document.getElementsByClassName("window");

window.onload = function() {
  setTimeout(function(){  
    document.getElementById("loader").classList.toggle("not-loaded");
    document.getElementById("desktop").classList.toggle("desktop-visible");
  }, 2000);
  setTimeout(function(){  
    toggleWindow(1);
  }, 2500);
  if (!mobileView) {
    for (i = 0; i < windowObjs.length; i++) {
      windowDrag(windowObjs[i], windowObjs[i].querySelector(".window-titlebar"));
    }
  }
  setInterval(function(){
    console.log("Run");
    let time = new Date();
    document.querySelector("#menubar-clock").innerHTML = time.toLocaleTimeString("en-US");
  }, 500);
  // document.querySelector("#menubar-clock").innerHTML = `${time.getHours()}:${time.getMinutes()} ${time.getHours() >= 12 ? "PM": "AM"}`;

}

function toggleWindow(id) {
  if (mobileView || window.innerWidth < 680) {
    for (i = 0; i < windowObjs.length; i++) {
      windowObjs[i].classList.remove("window-open");
    }
    document.getElementById(`window-${id}`).classList.add("window-open");
  } else {
    if (document.getElementById(`window-${id}`).classList.contains("window-open")) {
      // document.getElementById(`window-${id}`).classList.remove("window-open");
      console.log("Closing window");
      closeWindow(id);
    } else {
      // document.getElementById(`window-${id}`).classList.add("window-open");
      console.log("Opening window");
      openWindow(id);
    }
  }

  
}

function openWindow(id) {
  document.getElementById(`window-${id}`).classList.add("window-open");
  openedWindows.push(id);
  console.log(openedWindows);
  updateWindowOrder();
}

function closeWindow(id) {
  document.getElementById(`window-${id}`).classList.remove("window-open");
  // if (openedWindows && openedWindows.length != 0) {
  for (i = 0; i < openedWindows.length; i++) {
    if (openedWindows[i] == id) {
      openedWindows.splice(i, 1);
    }
  }
  console.log(openedWindows);
  updateWindowOrder()
  // }
}

function updateWindowOrder() {
  var zIndex = minWindowZ;
  if (openedWindows && openedWindows.length != 0) {
    openedWindows.forEach(element => {
      document.getElementById(`window-${element}`).style.zIndex = zIndex;
      document.getElementById(`window-${element}`).classList.add("out-of-focus");
      zIndex++;
    });
    document.getElementById(`window-${openedWindows[openedWindows.length - 1]}`).classList.remove("out-of-focus");
  }
  // console.log(openedWindows[openedWindows.length - 1])
}

function bringWindowForward(id) {
  closeWindow(id);
  openWindow(id);
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
    if (e.clientX >= 0 && e.clientY >= 0) {
      offsetX = mouseX - e.clientX;
      offsetY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      windowElement.style.left = `clamp(0px, ${(windowElement.offsetLeft - offsetX)}px, calc(100vw - 80px)`;
      windowElement.style.top = `clamp(0px, ${(windowElement.offsetTop - offsetY)}px, calc(100vh - 80px))`;
    }
    // if ((elmnt.offsetTop - offsetY) < 0) {
    //   elmnt.style.top = 0 + "px";
    // }
    // if ((elmnt.offsetLeft - offsetX) < 0) {
    //   elmnt.style.left = 0 + "px";
    // } else {
      // windowElement.style.left = `max(0px,${(windowElement.offsetLeft - offsetX)}px`;
      // windowElement.style.top = `max(0px,${(windowElement.offsetTop - offsetY)}px`;
    // }
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



// function openWindow(windowElement) {
// 	windows.push(windowElement);
//   windowElement.classList.toggle('window-open');
//   updateWindowOrder();
//   // console.log(windows);
// }

// function updateWindowOrder() {
//   let windowZIndex = 10;
//   windows.forEach(function(current) {
//     current.style.zIndex = windowZIndex;
//     windowZIndex += 10;
//   })
//   // console.log(windows.length + ": " + windows[windows.length - 1].id);
// }

window.onresize = function() {
  let window1width = document.getElementById("window-1").querySelector(".window-content").clientWidth;
  if (window1width < 360) {
    document.getElementById("about-intro-box").style.flexDirection = "column";
  } else {
    document.getElementById("about-intro-box").style.flexDirection = "row";
  }
  console.log(window1width);
}
