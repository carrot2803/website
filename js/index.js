// Include other JavaScript files
include("/js/functions/chat.js");
include("/js/functions/menu.js");
include("/js/functions/post.js");
include("/user-upload/avatar.js");
include("/js/functions/userlogin.js");

// Your custom JavaScript code here

// Function to include a JavaScript file
function include(file) {
  var script = document.createElement("script");
  script.src = file;
  script.type = "text/javascript";
  script.defer = true;
  document.getElementsByTagName("head").item(0).appendChild(script);
}
