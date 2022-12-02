const studentContainer = document.querySelector(".studentContainer")
let studentList = [
  {
    name: "Aye Aye Aung",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Carlos Aung",
    gmail: 'brang@gmail.com',
    present: false,
    id: null
  },
  {
    name: "Anthea Baldwin Hla",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Detta Bu",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Carol Cal",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Maw Celebrate",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Ba Maw Chain",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Saw Doesoehta",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Naw Ehmuehtoo",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Chan Haymarn Thaw",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "Ca Tha Hlei Par",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
  {
    name: "saw arnold htoo",
    gmail: "carloz@gmail.com",
    present: false,
    id: null
  },
]

// let studentList = []
let userEmail;


// get and post data to localStorage

const postLocalStorage = (params) => {
  const converString = JSON.stringify(params)
  localStorage.setItem("studentList", converString)
}
const getLocalStorage = () => {
  let resultfrom = localStorage.getItem("studentList")
  convertParse = JSON.parse(resultfrom)
  studentList = convertParse
}

// getDate
const getDate = () => {
  let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  let todayDate = new Date();
  let day = todayDate.getDate();
  let month = monthNames[todayDate.getMonth()];
  let year = todayDate.getFullYear();
  let finalDate = `${day} ${month}, ${year}`
  return finalDate
}

// toastAlert
var addStudent = document.querySelector(".addStudent");
var box = document.querySelector(".box")
window.addEventListener("load", () => {
  let first = localStorage.getItem("first");
  if(first == 'ok'){
    creatingStudentInfo();
    return;
  }else{
    postLocalStorage(studentList)
    creatingStudentInfo();
    getUserEmail()
    addStudent.style.zIndex = "99999"
    addStudent.style.background = "rgba(0, 0, 0, 0.309)"
    box.style.opacity = '1'
  }

})


// IdUpdater
const idUpdater = () => {
  for(let i = 0; i < studentList.length; i++){
    studentList[i].id = i;
  }
}

  // Send Result Email
  const sendEmail = (PresentList, AbsentList) => {
    if(AbsentList.length == studentList.length){
      return alert("Please check the attendance again")
    }else{
      Email.send({
        SecureToken : "7e21c6f1-f47e-4770-95c5-0caef39d95d5",
        To : userEmail,
        From : "brangtsawmaung89@gmail.com",
        Subject : "Student Attendance",
        Body : `Present = ${PresentList.map(item => " " + item.name)}//////  Absent = ${AbsentList.map(item => " " + item.name)}`
    }).then(
      // message => alert("This result sent successfully!!!")
      message =>  console.log(userEmail)

    );
    }

  }
  // FileSaver
  const fileSaver = (PresentList, AbsentList) => {
    if(AbsentList.length == studentList.length){
      return "Please check the attendance again"
    }else{
      var blob = new Blob([`Present = ${PresentList.map(item => ' ' +item.name)}\n Absent = ${AbsentList.map(item => '  ' + item.name)}`], {type: "text/plain;charset=utf-8"});
      saveAs(blob, `Attendance - ${getDate()}`);
    }
  }

// Creating studentInfo

const creatingStudentInfo = () => {
  studentContainer.innerHTML = ''
  getLocalStorage()
  idUpdater()
  if(studentList.length == 0){
    const noContent = document.createElement("h2");
    noContent.classList.add("noContent")
    noContent.textContent = "There is no Student..."
    studentContainer.append(noContent)
    var submit = document.querySelector(".submit")
    submit.disabled = true;
    submit.style.background = 'rgba(113, 113, 113, 0.632)'
    
  }else{
    for(let i = 0; i < studentList.length; i++){

      const studentInfo = document.createElement("div");
      const name = document.createElement("h3");
      const email = document.createElement("p");
      const btns = document.createElement("div");
      const OK = document.createElement("button");
      const X = document.createElement('button')
      const PAndB = document.createElement("p")
      name.classList.add("name");
      email.classList.add("email");
      btns.classList.add("btns");
      OK.classList.add("OK");
      X.classList.add("X")
      PAndB.classList.add("PAndB")
      studentInfo.classList.add("student-info")
    
      OK.textContent = "OK";
      X.textContent = "X";
      name.textContent = `${studentList[i].name}`;
      email.textContent = `${studentList[i].gmail}`
    
      studentContainer.append(studentInfo)
      studentInfo.append(name, PAndB, btns);
      btns.append(OK, X)
    
      let traceok = document.querySelectorAll(".OK");
      let traceX = document.querySelectorAll(".X");
      var traceStudentInfo = document.querySelectorAll(".student-info")
      var trancePAndB = document.querySelectorAll(".PAndB")
    
      // OK button handlers
      traceok[i].addEventListener("click", () => {
        traceStudentInfo[i].style.borderTop = "3px solid green"
        traceStudentInfo[i].style.background = '#E3F3DB'
        trancePAndB[i].textContent = "Present"
        trancePAndB[i].style.color = "green"
        studentList[i].present = true;
      })
    
      // X button handlers
      traceX[i].addEventListener("click", () => {
        traceStudentInfo[i].style.borderTop = "3px solid red"
        traceStudentInfo[i].style.background = '#FFE6E7'
        trancePAndB[i].textContent = "Absent"
        trancePAndB[i].style.color = "red"
        studentList[i].present = false;
      })
    
    }
    // Refresher
    const refresh = document.querySelector(".refresh");
    refresh.addEventListener("click", () => {
      for(let i = 0; i < studentList.length; i++){
        traceStudentInfo[i].style.borderTop = "3px solid white"
        traceStudentInfo[i].style.background = '#fff'
        trancePAndB[i].textContent = ""
        trancePAndB[i].style.color = "white"
        studentList[i].present = false;
      }
    })
  
  
  
    // Submit event
    const submit = document.querySelector(".submit");
    let PresentList;
    let AbsentList;
    submit.addEventListener("click", () => {
      // for(let i = 0; i < studentList.length; i++){
      //   traceStudentInfo[i].style.borderTop = "3px solid white"
      //   traceStudentInfo[i].style.background = '#fff'
      //   trancePAndB[i].textContent = ""
      //   trancePAndB[i].style.color = "white"
      //   // console.log(studentList[i].present)
      //   // studentList[i].present = false;
      //   idUpdater()
      // }
      const checkPresent = (present) => {
        return present.present == true;
      }
      const checkAbsent = (absent) => {
        return absent.present == false;
      }
      PresentList = studentList.filter(checkPresent);
      AbsentList = studentList.filter(checkAbsent)
      // sendEmail(PresentList, AbsentList)
      // fileSaver(PresentList, AbsentList);
      modalContainer.style.zIndex = "9999"
      modalContainer.style.background = "rgba(0, 0, 0, 0.309)"
      modal.style.opacity = '1'
      createModalBtns("sendEmail", "saveAsFile", "Send Email", "Save File")
      const send = document.querySelector(".sendEmail");
      const saveAsFile = document.querySelector(".saveAsFile");
      send.addEventListener("click", () => {
        modalContainer.style.zIndex = "-1"
        modalContainer.style.background = "rgba(255, 255, 255, 0.179)"
        modal.style.opacity = '0'
        getUserEmail()
        sendEmail(PresentList, AbsentList)
      });
      saveAsFile.addEventListener("click", () => {
        modalContainer.style.zIndex = "-1"
        modalContainer.style.background = "rgba(255, 255, 255, 0.179)"
        modal.style.opacity = '0'
        fileSaver(PresentList, AbsentList)
      })
    })
    submit.disabled = false;
    submit.style.background = '#5d82f2'
  }

}

// Creating student list
const creatingStudentList = () => {
  if(studentList.length == 0){
    studentContainer.innerHTML = ''
    const noContent = document.createElement("h2");
    noContent.classList.add("noContent")
    noContent.textContent = "There is no Student..."
    studentContainer.append(noContent)
    var submit = document.querySelector(".submit")
    submit.disabled = true;
    submit.style.background = 'rgba(113, 113, 113, 0.632)'
    
  }else{
    studentContainer.innerHTML = '';
    const listContainer = document.createElement("div");
    const header = document.createElement("div");
    const itemsContainer = document.createElement("div")
    listContainer.classList.add("listContainer");
    header.classList.add("header");
    itemsContainer.classList.add("itemsContainer")
    header.textContent = "Student List"
    listContainer.append(header, itemsContainer);
    studentContainer.append(listContainer)
    var submit = document.querySelector(".submit")
    getLocalStorage();
    for(let i = 0; i < studentList.length; i++) {
        const item = document.createElement("div");
        const deleteStudent = document.createElement("i");
        deleteStudent.classList.add("fa-regular", "fa-circle-xmark")
        item.classList.add("item");
        const text = document.createElement("p");
        text.textContent = `${i + 1}. ${studentList[i].name}`;
        item.append(text, deleteStudent)
        itemsContainer.append(item)

        // deleteStudent Individually
        const deleteIndividual = document.querySelectorAll(".fa-circle-xmark")
        deleteIndividual[i].addEventListener("click", () => {
          let leftStudent = studentList.filter(item => item.id !== i )
          studentList = leftStudent
          idUpdater()
          postLocalStorage(studentList)
          creatingStudentList()
        })
    }
  }

  submit.disabled = true;
  submit.style.background = 'rgba(113, 113, 113, 0.632)'
}

// CreateModalBtns
const createModalBtns = (COne, CTwo, TOne, TTwo) => {
  const btnOne = document.createElement("button");
  const btnTwo = document.createElement("button");
  btnOne.classList.add(COne);
  btnTwo.classList.add(CTwo)
  btnOne.textContent = TOne
  btnTwo.textContent = TTwo
  modalBtnContainer.innerHTML = ''
  modalBtnContainer.append(btnOne, btnTwo)
}
 
// filter check and student list
const check = document.querySelector(".check");
const studentListpage = document.querySelector(".studentList");

check.addEventListener("click", () => {
  if(check.classList.contains("active")){
    return;
  }else{
    studentListpage.classList.remove("active")
    check.classList.add("active")
    creatingStudentInfo();
  }
})
studentListpage.addEventListener("click", () => {
  if(studentListpage.classList.contains("active")){
    return;
  }else{
    check.classList.remove("active")
    studentListpage.classList.add("active")
    creatingStudentList();
  }
})

// modal for repeat
const modalBtn = document.querySelector(".fa-buromobelexperte");
const closeModal = document.querySelector(".fa-xmark");
const modalContainer = document.querySelector(".modalContainer");
const modal = document.querySelector(".modal")
const modalBtnContainer = document.querySelector(".modalBtns")

closeModal.addEventListener("click", () => {
  modalContainer.style.zIndex = "-1"
  modalContainer.style.background = "rgba(255, 255, 255, 0.179)"
  modal.style.opacity = '0'
})
modalBtn.addEventListener("click", () => {
  modalContainer.style.zIndex = "9999"
  modalContainer.style.background = "rgba(0, 0, 0, 0.309)"
  modal.style.opacity = '1'
  createModalBtns("Add", "Delete", "Add Student", "Delete All")

  // addstudentPage

  const circleClose = document.querySelector(".fa-circle-xmark");
  var addStudent = document.querySelector(".addStudent");
  var box = document.querySelector(".box")
  const add = document.querySelector(".Add")
  var deleteAll = document.querySelector(".Delete")

  circleClose.addEventListener("click", () => {
    addStudent.style.zIndex = "-1"
    addStudent.style.background = "rgba(255, 255, 255, 0.179)"
    box.style.opacity = '0';
    modalContainer.style.zIndex = "-1"
    modalContainer.style.background = "rgba(255, 255, 255, 0.179)"
    modal.style.opacity = '0'
  })
  add.addEventListener("click", () => {
    addStudent.style.zIndex = "99999"
    addStudent.style.background = "rgba(0, 0, 0, 0.309)"
    box.style.opacity = '1'
    addName.value = ''
    getUserEmail()
    emailInput.value = userEmail;
  })
  deleteAll.addEventListener("click", () => {
    postLocalStorage([])
    creatingStudentInfo();
    idUpdater()
    modalContainer.style.zIndex = "-1"
    modalContainer.style.background = "rgba(255, 255, 255, 0.179)"
    modal.style.opacity = '0'
  })
})

// get and post mail to localStorage
const getUserEmail = () => {
  userEmail = localStorage.getItem("email")
}
const postUserEmail = () => {
    localStorage.setItem("email", userEmail)
}


// add new Students
const addStudentBtn = document.querySelector(".addStudentBtn");
const emailInput = document.querySelector(".emailInput");
const addName = document.querySelector(".addName")

addStudentBtn.addEventListener("click", () => {
  localStorage.setItem('first', "ok")
  addStudent.style.zIndex = "-2"
  addStudent.style.background = "rgba(0, 0, 0, 0.309)"
  box.style.opacity = '0'
  modalContainer.style.zIndex = "-1"
  modalContainer.style.background = "rgba(255, 255, 255, 0.179)"
  modal.style.opacity = '0'
  userEmail = emailInput.value
  postUserEmail()


  if(addName.value == ''){
    alert("You need to enter a name");
  }else{
    studentList.push({
      name: addName.value,
      gmail: "",
      present: false,
      id: null
    },)
    postLocalStorage(studentList)
    creatingStudentInfo()
    idUpdater()
  }

})


if(userEmail == undefined){
  emailInput.value = ''
}else{
  emailInput.value = userEmail
}