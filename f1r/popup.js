let StorageToken = "ToeknTheSiteF1rIRR";
if (localStorage.getItem(StorageToken) == null){
	let token = prompt("توکن خود را وارد کنید", "[YOUR-TOKEN]");
	localStorage.setItem(StorageToken, token);
}

document.getElementById("NewToken").addEventListener("click", Token);

function Token(){
    let t = prompt("توکن خود را وارد کنید","[YOUR-TOKEN]");
	localStorage.removeItem(StorageToken);
	localStorage.setItem(StorageToken, t);
	chrome.tabs.query({
    active: true,
    currentWindow: true,
	}, function (tabs) {
	  let urltab = tabs[0].url;
	  if (new RegExp(/((http|https|ftp):\/\/[^s]+)/i).test(urltab)){
		shourter(urltab);
	  } else {
		  document.getElementById("URL").setAttribute("value","از لینک استفاده کنید");
	  }
	});
}
let URL_input = document.getElementById("URL");
let status = document.getElementById("status");
let copyt = document.getElementById("copyText");
function shourter(url){
    let token = localStorage.getItem(StorageToken);
       fetch("https://f1r.ir/api/new/" + token + "?url="+url)
   .then(response => response.json())
  .then(data => {
      if (data.ok == false){
        console.log(data);
        URL_input.setAttribute("dir","rtl");
        URL_input.value = "توکن شما نا معتبر است";
      } else {
        URL_input.setAttribute("dir","ltr");
        URL_input.value=data.Short_URL;
        status.href=data.Information_URL;
      }
  });
}

copyt.addEventListener("click",copyTXT);
function copyTXT(){
    let url = URL_input.value;
    console.log(url);
    navigator.clipboard.writeText(url);
}
chrome.tabs.query({
    active: true,
    currentWindow: true,
}, function (tabs) {
  let urltab = tabs[0].url;
  if (new RegExp(/((http|https|ftp):\/\/[^s]+)/i).test(urltab)){
    shourter(urltab);
  } else {
      document.getElementById("URL").setAttribute("value","از لینک استفاده کنید");
  }
});
fetch("https://dl.f1r.ir/extensions/json.php")
  .then(response => response.json())
  .then(data => {
    let getData = localStorage.getItem('edchID'+data.id );
    if(getData == null){
      alert(data.message);
      localStorage.removeItem('edchID'+data.id - 1);
      localStorage.setItem('edchID'+data.id, true);
    }

});