/// paste this into your developer  tools console

// config your click delay here
// --------
const CLICK_DELAY_MS = 90;
// --------

let do_clicking = false;
let remove_pests = false;

const intervalId = setInterval(doClicking, CLICK_DELAY_MS);

let clicker_button = null;

var doClickingCheckbox = document.createElement("input");
doClickingCheckbox.type = "checkbox";
doClickingCheckbox.id = "doClicking";

var doClickingLabel = document.createElement("label");
doClickingLabel.htmlFor = "doClicking";
doClickingLabel.appendChild(document.createTextNode("Do Clicking"));

var removeWeedsCheckbox = document.createElement("input");
removeWeedsCheckbox.type = "checkbox";
removeWeedsCheckbox.id = "removeWeeds";

var removeWeedsLabel = document.createElement("label");
removeWeedsLabel.htmlFor = "removeWeeds";
removeWeedsLabel.appendChild(document.createTextNode("Remove Weeds"));

var targetElement = document.querySelector(
  ".default__9026a.logo_cf3f70.logoGreen_cf3f70",
);
if (targetElement) {
  clicker_button = targetElement;
  targetElement.appendChild(doClickingCheckbox);
  targetElement.appendChild(doClickingLabel);
  targetElement.appendChild(removeWeedsCheckbox);
  targetElement.appendChild(removeWeedsLabel);

  doClickingCheckbox.addEventListener("change", function () {
    do_clicking = this.checked;
  });

  removeWeedsCheckbox.addEventListener("change", function () {
    remove_pests = this.checked;
  });
} else {
  alert("There was a problem running the script (clicker element  not found)");
}

function doClicking() {
  if (do_clicking) {
    simulateClick(clicker_button);
  }
}

function simulateClick(element) {
  const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(clickEvent);
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (remove_pests && mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const clickableElements =
            node.getElementsByClassName("clickable_fa03d7");
          const clickableElements2 =
            node.getElementsByClassName("lawnmower__78658");
          const allClickableElements = [
            ...clickableElements,
            ...clickableElements2,
          ];
          allClickableElements.forEach((element) => {
            simulateClick(element);
            console.log("Removed pest");
          });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
