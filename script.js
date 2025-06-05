const user = document.getElementById('userid');
const userpass = document.getElementById('pass');
const submit = document.getElementById('submit');
const errorp = document.getElementById('error');
const text=document.getElementById('editable');
const modal = document.getElementById("loginModal");
const logout = document.getElementById("logout");
let isonline = true;

//offline is assible
window.addEventListener('load', () => {
      ping();
    });


async function ping() {
  try {
    const response = await fetch("https://newserv-mrot.onrender.com/");
    const data = await response.json();
    console.log("You are online");
    if (localStorage.getItem("hash") ===null){
      openBox();
      user.focus();
    }   
    else{
        closeBox();
        datafill();
    }
  } catch (error) {
    isonline=false;
    const savedText = localStorage.getItem('typedText');
    if (savedText) {
        editable.innerHTML = savedText;
    }
    else{
      {text.innerHTML=`<h1 style=\"margin: 0px 0px 20px; padding: 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif; font-size: 3em; color: rgb(251, 191, 36); letter-spacing: normal; text-align: center;\"><br></h1><h1 style=\"margin: 0px 0px 20px; padding: 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif; font-size: 3em; color: rgb(251, 191, 36); letter-spacing: normal; text-align: center;\"><br></h1><h1 style=\"margin: 0px 0px 20px; padding: 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif; font-size: 3em; color: rgb(251, 191, 36); letter-spacing: normal; text-align: center;\"><br></h1><div><br></div><h1 style=\"margin: 0px 0px 20px; padding: 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif; font-size: 3em; color: rgb(251, 191, 36); letter-spacing: normal; text-align: center;\">🚧 Server is Down</h1><p style=\"margin: 0px 0px 30px; padding: 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif; font-size: 1.2em; color: rgb(241, 245, 249); letter-spacing: normal; text-align: center;\">We're working on it and will be back shortly.But You can Still use it Save Will only work Locally<br>Hello website by Hardik</p>`;text.style.display = "block";closeBox();isonline=false}
    }
    text.style.display = "block";
    console.log("you are Offline");
  }
}


function openBox() {
  modal.style.display = "block";
}
function closeBox() {
  modal.style.display = "none";
}


// if (window.innerWidth <window.innerHeight)
//   console.log("mobile")
//   document.getElementById("loginModal").style.transform="translate(-50%, -50%)";


// initally Preload
// errorp.style.display = "none";

    //closeBox();
    //openBox();
// localStorage.setItem("userid", "hardik.57v");
let cout=0;
//first box1 box2 box3
user.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    userpass.focus()
  }
});

document.getElementById("addnew").addEventListener('click', function(event) {
    document.getElementById("error").style.display="none";
    document.getElementById("addnew").style.display="none";
    document.getElementById("userid").value="";
    document.getElementById("pass").value="";
    document.querySelector("h1").innerHTML="Create New User";
    document.querySelector("p").innerHTML="Welcome to Clipbrows";
    document.querySelector(".text").innerHTML="Sign up";
    document.getElementById("pass").type="text";
    document.getElementById("submit").onclick=()=>{
    createnew();
    };
});

userpass.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    submit.focus()
  }
});

submit.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    submitdata()
  }
});
//fix if user want to copy
text.addEventListener('keydown', function(event) {
      if (isonline && event.key !== 'Control') {
          setTimeout(()=>{
          autosave();
        },1000);
    }
    else{
      setTimeout(() => {
        localStorage.setItem('typedText', editable.innerHTML);
      }, 1000*2);
    }
});


async function submitdata() {
  console.log("searching");
  await fetch('https://newserv-mrot.onrender.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userid: user.value,
    pass: userpass.value
  })
})
.then(response => response.json())
.then(data =>{
    // console.log(data);
    console.log("Processed");
    if (data.found==="yes"){
      localStorage.setItem("hash", data.out.hash);
      location.reload();
    }
    else{
        document.getElementById("error").innerHTML="No Account Exist with provided username and Password"
        document.getElementById("error").style.display="block";
    }
}
    )
.catch(error => console.error('Error:', error));
}

async function createnew() {
  console.log("searching- new");
  await fetch('https://autoping-6jmo.onrender.com/newuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userid: user.value,
    pass: userpass.value
  })
})
.then(response => response.json())
.then(data =>{
    // console.log(data);
    console.log("Processed-new");
    if (data.status==="Created"){
      localStorage.setItem("hash", data.hash);
      location.reload();
    }
    else{
        document.getElementById("error").innerHTML="Account Already Exist with provided username and Password Try Logging in"
        document.getElementById("error").style.display="block";

    }
}
    )
.catch(error => console.error('Error:', error));
}

async function autosave() {
  console.log("Syncing"+cout);
  await fetch('https://autoping-6jmo.onrender.com/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    hash: localStorage.hash,
    data: text.innerHTML,
    lastused: new Date(),
    pc:cout
  })
})
.then(response => response.json())
.then(data => 
{
  if (data.pc==cout)
      console.log("Syncronized"+cout);
  cout+=1;
}
    )
.catch(error => console.error('Error:', error));
}

async function datafill() {
  await fetch('https://autoping-6jmo.onrender.com/cache', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "hash": localStorage.hash,
  })
})
.then(response => response.json())
.then(data => 
{   
    // console.log(data);
    if (data["status"] ==="No user"){
      localStorage.clear();
      location.reload();
    }
    text.innerHTML=data["data"];
    // console.log(data.data)
    text.style.display = "block";
    logout.style.display = "block";
    text.focus();
    const range = document.createRange();
    //pata nahi kya h ye but it works

    // Select all content inside the element
    range.selectNodeContents(text);
    // Collapse the range to the end (so cursor goes to the end)
    range.collapse(false);
    // Get current selection and remove any existing ranges
    const sel = window.getSelection();
    sel.removeAllRanges();
    // Add the new range to the selection
     sel.addRange(range);
}
    )
.catch(error => console.log(error));
}

