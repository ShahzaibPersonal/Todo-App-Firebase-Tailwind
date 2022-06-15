import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { doc, addDoc, setDoc, getFirestore, collection, query, where, getDoc, getDocs, updateDoc, onSnapshot, orderBy, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIrYTTHspe-RI63NcS1MK2d6y8oEYs0G0",
  authDomain: "todo-fc0b9.firebaseapp.com",
  projectId: "todo-fc0b9",
  storageBucket: "todo-fc0b9.appspot.com",
  messagingSenderId: "672106542167",
  appId: "1:672106542167:web:45d7caec24022d2ceedf12",
  measurementId: "G-BWEV5R51SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth();

const userDocumentRef = collection(db, "users");
// const taskDocumentRef = collection(db,"users", "tasks");


const addTaskBtn = document.getElementById("addTaskBtn")
const addBtn = document.getElementById("add-btn")
const title = document.getElementById("title")
const header = document.getElementById("header")
const addTaskForm = document.getElementById("form")
const addTaskFormBlur = document.getElementById("blur")
const logBtn = document.getElementById("logBtn")
const signBtn = document.getElementById("signBtn")
const logoutBtn = document.getElementById("logoutBtn")
const welcome = document.getElementById("welcome")
const list = document.getElementById("list")
const body = document.getElementById("body")
const no_task = document.getElementById("no_task")

let click = 0
let updated = 0







async function logout() {
  localStorage.removeItem("user_name")
  window.location.href = "index.html";
  const alertSuccess = document.createElement("div")
  const alertBox = document.createElement("div")
  const alertDescription = document.createElement("p")

  alertBox.classList.add("absolute", "top-0", "p-3", "w-screen")
  alertSuccess.classList.add("bg-red-500", "top-0", "p-3", "rounded-md", "text-neutral-50", "shadow-lg")
  alertDescription.textContent = "User has been logged out"

  alertSuccess.appendChild(alertDescription)
  alertBox.appendChild(alertSuccess)
  body.appendChild(alertBox)


  setInterval(function () {
    alertBox.classList.add("hidden")
  }, 2000);
}

if (addTaskBtn) {

  if (localStorage.getItem("user_name")) {
    addTaskBtn.addEventListener('click', () => {
      console.log("add Task Button clicked")

      const title_task = document.getElementById("title_task")
      const desc_task = document.getElementById("desc_task")
      const due_time = document.getElementById("due_time")
      const critical_level = document.getElementById("critical_level")

      // console.log(title_task.value + " " + desc_task.value + " " + due_time.value + " " + critical_level.value)

      addTask(title_task.value, desc_task.value, due_time.value, critical_level.value)

    })

  }

  else {
    logout()
  }


}

if (addBtn) {

  addBtn.addEventListener('click', () => {

    if (click == 0) {

      addBtn.classList.add("add_click");

      no_task.classList.add("hidden")
      addTaskForm.classList.add("top-1/4")
      addTaskForm.classList.add("mt-5")
      addBtn.classList.add("object-scale-down");

      addTaskForm.style.display = "inline"
      addBtn.classList.remove('close_click')
      header.classList.add("blur-sm")
      logoutBtn.classList.add("hidden")
      logoutBtn.disabled = true;
      addBtn.src = 'res/close.png';
      click = 1;


      console.log("open")

    } else {

      console.log("closed")
      header.classList.remove("blur-sm")

      logoutBtn.disabled = false;
      no_task.classList.remove("hidden")
      logoutBtn.classList.remove("hidden")
      addTaskForm.style.display = "none"
      addBtn.classList.add('close_click')

      addBtn.src = 'res/add.png'
      click = 0;

    }

  })

}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout()
  })
}

if (welcome) {
  welcome.innerHTML += " " + localStorage.getItem("user_name").toLowerCase()
    .split(" ")
    .map((e) => e.charAt(0).toUpperCase() + e.substring(1))
    .join(" ");

    welcome.classList.add ("hover:text-emerald-500")

}

async function addTask(title_task, desc_task, due_time, critical_level) {


  const q = query(collection(db, "users"), where("id", "==", localStorage.getItem("user_id")));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((docs) => {


    const taskRef = collection(userDocumentRef, docs.id, "tasks");


    addDoc(taskRef, {

      title_task: title_task,
      desc_task: desc_task,
      due_time: due_time,
      critical_level: critical_level,
      timestamp: Timestamp.fromDate(new Date(new Date().getTime())),
    });

    const alertSuccess = document.createElement("div")
    const alertBox = document.createElement("div")
    const alertDescription = document.createElement("p")

    alertBox.classList.add("absolute", "top-0", "p-3", "w-screen")
    alertSuccess.classList.add("bg-emerald-500", "top-0", "p-3", "rounded-md", "text-neutral-50")
    alertDescription.textContent = "Task has been added Successfully"

    alertSuccess.appendChild(alertDescription)
    alertBox.appendChild(alertSuccess)
    body.appendChild(alertBox)


    setInterval(function () {

      alertBox.classList.add("hidden")
    }, 2000);




  })

}

async function getInformation(uid) {

  const q = query(collection(db, "users"), where("id", "==", uid));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
  
    const userInfo = doc.data()
    console.log(doc.id, " => ", userInfo);

    localStorage.setItem("user_name", userInfo.first_name + " " + userInfo.last_name);
    localStorage.setItem("user_id", uid);

    window.location.href = "dashboard.html";

    const alertSuccess = document.createElement("div")
    const alertBox = document.createElement("div")
    const alertDescription = document.createElement("p")

    alertBox.classList.add("absolute", "top-0", "p-3", "w-screen")
    alertSuccess.classList.add("bg-emerald-500", "top-0", "p-3", "rounded-md", "text-neutral-50")
    alertDescription.textContent = "Task has been added Successfully"

    alertSuccess.appendChild(alertDescription)
    alertBox.appendChild(alertSuccess)
    body.appendChild(alertBox)


    setInterval(function () {

      alertBox.classList.add("hidden")

    }, 5000);

  });

}

if (logBtn) {

  logBtn.addEventListener('click', () => {

    const user_email = document.getElementById("user_email")
    const user_password = document.getElementById("user_password")

    const auth = getAuth();
    signInWithEmailAndPassword(auth, user_email.value, user_password.value)
      .then((userCredential) => {


        const user = userCredential.user;
        const uid = user.uid

        getInformation(uid)

      })
      .catch((error) => {

        const alertSuccess = document.createElement("div")
        const alertBox = document.createElement("div")
        const alertDescription = document.createElement("p")
        alertBox.classList.add("absolute", "top-0", "p-3", "w-screen")
        alertSuccess.classList.add("bg-red-500", "top-0", "p-3", "rounded-md", "text-neutral-50")
        alertDescription.textContent = "Invalid credentials"

        alertSuccess.appendChild(alertDescription)
        alertBox.appendChild(alertSuccess)
        body.appendChild(alertBox)


        setInterval(function () {

          alertBox.classList.add("hidden")

        }, 2000);


      })
  })
}

if (signBtn) {
  signBtn.addEventListener('click', (e) => {
    e.preventDefault()


    const newUserFirstName = document.getElementById("newUserFirstName");
    const newUserLastName = document.getElementById("newUserLastName");
    const newUserEmail = document.getElementById("newUserEmail");
    const newUserPassword = document.getElementById("newUserPassword");



    createUserWithEmailAndPassword(auth, newUserEmail.value, newUserPassword.value)
      .then((userCredential) => {
        // Signed in 

        const user = userCredential.user;


        setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          email: newUserEmail.value,
          first_name: newUserFirstName.value,
          last_name: newUserLastName.value,
          password: newUserPassword.value,
        })


        const alertSuccess = document.createElement("div")
        const alertBox = document.createElement("div")
        const alertDescription = document.createElement("p")

        alertBox.classList.add("absolute", "top-0", "p-3", "w-screen")
        alertSuccess.classList.add("bg-emerald-500", "top-0", "p-3", "rounded-md", "text-neutral-50")
        alertDescription.textContent = "User account has been created"

        alertSuccess.appendChild(alertDescription)
        alertBox.appendChild(alertSuccess)
        body.appendChild(alertBox)


        setInterval(function () {

          alertBox.classList.add("hidden")
       
        }, 2000);


      })
      .catch((error) => {

        const alertSuccess = document.createElement("div")
        const alertBox = document.createElement("div")
        const alertDescription = document.createElement("p")

        alertBox.classList.add("absolute", "top-0", "p-3", "w-screen")
        alertSuccess.classList.add("bg-red-500", "top-0", "p-3", "rounded-md", "text-neutral-50")
        alertDescription.textContent = "PLease enter valid credentials"

        alertSuccess.appendChild(alertDescription)
        alertBox.appendChild(alertSuccess)
        body.appendChild(alertBox)


        setInterval(function () {
          alertBox.classList.add("hidden")
        }, 2000);


      })

  })
}

// get list functions 

async function getList() {

  console.log("get list is being called")

  console.log(localStorage.getItem("user_id"))


  onSnapshot(doc(db, "users", localStorage.getItem("user_id")), () => {

    const tasked = query(collection(db, "users/" + localStorage.getItem("user_id") + "/tasks"), orderBy('timestamp', 'asc'));
  
    onSnapshot(tasked, (querySnapshot) => {

      list.innerHTML = ''
      list.classList.add("border", "border-xl", "m-3", "rounded-md")

      const title = document.createElement('h1')
      title.textContent = "List of Tasks"
      title.classList.add("text-4xl", "font-light", "text-center", "mb-2", "hover:text-emerald-500")

      list.appendChild(title)


      if (querySnapshot)

        querySnapshot.forEach((doc) => {


          if (doc.exists) {

            const task = document.createElement('form');
            const title = document.createElement('input');
            const desc = document.createElement('input');
            const due_time = document.createElement('input');
            const updateBtn = document.createElement('Button');
            const removeBtn = document.createElement('Button');
            const completeBtn = document.createElement('Button');
            const critical_level = document.createElement('select');

            var selected = doc.data().critical_level

            if (selected == "") {

              var option = document.createElement("option");

              option.value = "Choose criticality level here";
              option.text = "Choose criticality level here";

              option.hidden = true
              option.selected = true

              critical_level.appendChild(option);

            }

            //Create array of options to be added
            var array = ["low", "medium", "high"];

            //Create and append select list

            task.appendChild(critical_level)

            for (var i = 0; i < array.length; i++) {

              var option = document.createElement("option");
              option.value = array[i];
              option.text = array[i];


              critical_level.appendChild(option);

              if (selected == array[i]) {

                critical_level.selectedIndex = i

              }

            }



            due_time.type = "datetime-local"
            title.type = "text"
            desc.type = "text"

            due_time.value = doc.data().due_time

            critical_level.classList.add("font-bold", "text-xl", "px-1", "py-1", "w-full", "hover:border", "hover:border-emerald-500", "hover:px-2", "hover:rounded-md", "hover:overflow-hidden")
            due_time.classList.add("font-normal", "text-md", "px-1", "py-1", "w-full", "hover:border", "hover:border-emerald-500", "hover:px-3", "hover:rounded-md")

            title.value = doc.data().title_task
            title.classList.add("font-bold", "text-2xl", "px-1", "py-1", "w-full", "hover:border", "hover:border-emerald-500", "hover:px-3", "hover:rounded-md", "max-w-full")
            desc.value = doc.data().desc_task
            desc.classList.add("font-light", "text-xl", "px-1", "py-1", "w-full", "hover:border", "hover:border-emerald-500", "hover:px-3", "hover:rounded-md")

            task.appendChild(title)
            task.appendChild(desc)
            task.appendChild(due_time)
            task.appendChild(critical_level)
            task.setAttribute("id", doc.id)
            updateBtn.click


            const container_scroll = document.getElementById('list_container');
            container_scroll.classList.add("container_scroll")

            task.classList.add("border", "rounded-md", "p-3")


            if (updated == 0) {

              list.appendChild(task)

            } else {


            }
          }
          else {
            console.log("No record exists")
          }

        })

    });

  });

}

if (list) {

  getList()

}





