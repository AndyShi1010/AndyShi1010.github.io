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
  }, 20);
  let window1width = document.getElementById("window-1").querySelector(".window-content").clientWidth;
  let window2width = document.getElementById("window-2").querySelector(".window-content").clientWidth;
  updateWindow1(window1width);
  updateWindow2(window2width);
  if (!mobileView) {
    initDesktopMode();
    setTimeout(function(){  
      openWindow(1);
    }, 25);
  } else {
    initMobileMode();
    openWindow(4);
  }
}

function initMobileMode() {
  document.querySelector(".window-container").insertAdjacentHTML('beforebegin', 
    `
    <div class="menubar" id="menubar-mobile">
      <div id="menubar-links">
        <div class="menu-item" id="menu-item-4" onclick="openWindow(4);"><span class="material-icons-outlined">home</span>Home</div>
        <div class="menu-item" id="menu-item-1" onclick="openWindow(1);"><span class="material-icons-outlined">person</span>About</div>
        <div class="menu-item" id="menu-item-2" onclick="openWindow(2);"><span class="material-icons-outlined">code</span>Code</div>
        <div class="menu-item" id="menu-item-3" onclick="openWindow(3);"><span class="material-icons-outlined">design_services</span>Design</div>
      </div>
    </div>
    `);

    for (let i = 0; i < windowObjs.length; i++) {
      windowObjs[i].classList.add("mobile");
      windowObjs[i].style.height = "calc(100vh - " + document.getElementById("menubar-mobile").clientHeight + "px)";
    }
}

function initDesktopMode() {
  
  // for (i = 0; i < windowObjs.length; i++) {
  //   windowObjs[i].classList.add("desktop");
  //   // windowObjs[i].getElementsByClassName("window-content")[0].addEventListener("mousedown",  focusWindow(i));
  // }
  for (let i = 0; i < windowObjs.length; i++) {
    windowObjs[i].classList.add("desktop");
    windowObjs[i].onmousedown = function() {
      focusWindow(i + 1);
    };
    windowDrag(windowObjs[i], windowObjs[i].querySelector(".window-titlebar"));
    windowObjs[i].querySelector(".window-titlebar").insertAdjacentHTML('afterend', `
    <span class="material-icons-outlined" onclick="closeWindow(${i + 1})">close</span>
    `);
    //console.log(windowObjs[i].getElementsByClassName("window-content"));
  }
  document.querySelector(".window-container").insertAdjacentHTML('beforebegin', 
  `
  <div class="menubar" id="menubar-desktop">
    <div id="menubar-links">
      <div class="menu-item" id="menu-item-1" onclick="menuItemClick(1);"><span class="material-icons-outlined">person</span>About</div>
      <div class="menu-item" id="menu-item-2" onclick="menuItemClick(2);"><span class="material-icons-outlined">code</span>Code</div>
      <div class="menu-item" id="menu-item-3" onclick="menuItemClick(3);"><span class="material-icons-outlined">design_services</span>Design</div>
    </div>
  </div>
  `);
  document.getElementById("menubar-links").insertAdjacentHTML('afterend', '<p id="menubar-clock"></p>');
  setInterval(function(){
    // console.log("Run");
    let time = new Date();
    document.querySelector("#menubar-clock").innerHTML = time.toLocaleTimeString("en-US");
  }, 500);
}

function openWindow(id) {
  if (!openedWindows.includes(id)) {
    openedWindows.push(id);
  } else {
    focusWindow(id);
  }
  updateWindows();
  updateMenu();
}

function closeWindow(id) {
  if (openedWindows.includes(id)) {
    for (i = 0; i < openedWindows.length; i++) {
      if (openedWindows[i] == id) {
        openedWindows.splice(i, 1);
      }
    }
  }
  updateWindows();
  updateMenu();
}

function focusWindow(id) {
  if (openedWindows.includes(id)) {
    for (i = 0; i < openedWindows.length; i++) {
      if (openedWindows[i] == id) {
        openedWindows.splice(i, 1);
      }
    }
    openedWindows.push(id);
  }
  updateWindows();
  updateMenu();
}

function menuItemClick(id) {
  if (document.getElementById(`menu-item-${id}`).classList.contains("back")) {
    focusWindow(id);
  } 
  else if (document.getElementById(`menu-item-${id}`).classList.contains("focus")) {
    closeWindow(id);
  } 
  else {
    openWindow(id);
  }
}

function updateWindows() {
  var zIndex = minWindowZ;
  //console.log("Update: " + openedWindows);
  for (i = 0; i < windowObjs.length; i++) {
    windowObjs[i].classList.remove("focus");
    windowObjs[i].classList.remove("back");
  }
  if (openedWindows && openedWindows.length != 0) {
    for (i = 0; i < openedWindows.length - 1; i++) {
      document.getElementById(`window-${openedWindows[i]}`).style.zIndex = zIndex;
      document.getElementById(`window-${openedWindows[i]}`).classList.add("back");
      zIndex++;
    }
    document.getElementById(`window-${openedWindows[openedWindows.length-1]}`).style.zIndex = zIndex;
    document.getElementById(`window-${openedWindows[openedWindows.length-1]}`).classList.add("focus");
  }
  // if (openedWindows && openedWindows.length != 0) {
  //   openedWindows.forEach(element => {
  //     document.getElementById(`window-${element}`).style.zIndex = zIndex;
  //     document.getElementById(`window-${element}`).classList.add("background");
  //     document.getElementById(`menu-item-${element}`).classList.remove("focus");
  //     document.getElementById(`menu-item-${element}`).classList.add("back");
  //     zIndex++;
  //   });
  //   document.getElementById(`window-${openedWindows[openedWindows.length - 1]}`).classList.remove("out-of-focus");
  //   document.getElementById(`menu-item-${openedWindows[openedWindows.length - 1]}`).classList.remove("focus");
  //   document.getElementById(`menu-item-${openedWindows[openedWindows.length - 1]}`).classList.add("focus");
  // }
}

function updateMenu(){
  let menuObjs = document.getElementsByClassName("menu-item");
  for (i = 0; i < menuObjs.length; i++) {
    menuObjs[i].classList.remove("focus");
    menuObjs[i].classList.remove("back");
  }
  if (openedWindows && openedWindows.length != 0) {
    for (i = 0; i < openedWindows.length; i++) {
      if (document.getElementById(`window-${openedWindows[i]}`).classList.contains("back")) {
        document.getElementById(`menu-item-${openedWindows[i]}`).classList.add("back");
      } 
      else if (document.getElementById(`window-${openedWindows[i]}`).classList.contains("focus")) {
        document.getElementById(`menu-item-${openedWindows[i]}`).classList.add("focus");
      } 
    }
  }
}

// function menuClicked(id) {
//   if ()
// }

// function titlebarMouseDown(id) {
//   // mouseInitX = e.clientX;
//   // mouseInitY = e.clientY;
//   e = e || window.event;
//   e.preventDefault();
//   console.log("Event:" + e.clientX);
// }

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
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
/*
function toggleWindow(id) {
  if (mobileView) {
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
  document.getElementById(`menu-item-${id}`).classList.remove("focus");
  document.getElementById(`menu-item-${id}`).classList.remove("back");
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
      document.getElementById(`menu-item-${element}`).classList.remove("focus");
      document.getElementById(`menu-item-${element}`).classList.add("back");
      zIndex++;
    });
    document.getElementById(`window-${openedWindows[openedWindows.length - 1]}`).classList.remove("out-of-focus");
    document.getElementById(`menu-item-${openedWindows[openedWindows.length - 1]}`).classList.remove("focus");
    document.getElementById(`menu-item-${openedWindows[openedWindows.length - 1]}`).classList.add("focus");
  }
  // console.log(openedWindows[openedWindows.length - 1])
}

function bringWindowForward(id) {
  closeWindow(id);
  openWindow(id);
}

*/


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
  let window2width = document.getElementById("window-2").querySelector(".window-content").clientWidth;
  updateWindow1(window1width);
  updateWindow2(window2width);
  console.log(window1width);
}

function updateWindow1(width) {
  if (width < 360) {
    document.getElementById("about-intro-box").style.flexDirection = "column";
  } else {
    document.getElementById("about-intro-box").style.flexDirection = "row";
  }
}

function updateWindow2(width) {
  if (width < 360) {
    document.getElementById("code-collage-container").style.gridTemplateColumns = "auto";
  } else if (width < 540) {
    document.getElementById("code-collage-container").style.gridTemplateColumns = "auto auto";
  } else {
    document.getElementById("code-collage-container").style.gridTemplateColumns = "auto auto auto";
  }
}




