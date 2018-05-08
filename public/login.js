function SetAccountCookie(username,password){
  var d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  var cookie = "ETHAccount=" + username + ";" + expires + ";path=/";
  document.cookie = cookie;
}
function login(doc){
  accountAddr = document.getElementById('accountAddr').value
  password = document.getElementById('password').value

  if (password != "some-password"){
    console.log("incorrect-password")
    return
  }

  SetAccountCookie(accountAddr, password)
  window.location.href = "vote.html"
}
