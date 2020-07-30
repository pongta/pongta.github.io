  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDG7ZCcPDtCD5ExlrrToXHyJSRkNHBV77U",
    authDomain: "r-o-l-38d8d.firebaseapp.com",
    databaseURL: "https://r-o-l-38d8d.firebaseio.com",
    projectId: "r-o-l-38d8d",
    storageBucket: "r-o-l-38d8d.appspot.com",
    messagingSenderId: "370548668323"
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();

  // Disable deprecated features
db.settings({
    timestampsInSnapshots: true
  });

  const quesRef = db.collection("1");

  var questionTitleNo = "35";

  //citiesRef.orderBy("name").limit(3)


  const selectedQuestionTitle = document.querySelector("#selectQuestion");
  const idInputTextField = document.querySelector("#_id");
  const questionInputTextField = document.querySelector("#_question");
  const option1InputTextField = document.querySelector("#_option1");
  const option2InputTextField = document.querySelector("#_option2");
  const option3InputTextField = document.querySelector("#_option3");
  const option4InputTextField = document.querySelector("#_option4");
  const correctAnsInputTextField = document.querySelector("#_correct_ans");
  const ansDetailInputTextField = document.querySelector("#_ans_detail");
  const saveButton = document.querySelector("#saveButton"); 

  saveButton.addEventListener("click", function(){
      const questionToSave = questionInputTextField.value;
      const option1ToSave = option1InputTextField.value;
      const option2ToSave = option2InputTextField.value;
      const option3ToSave = option3InputTextField.value;
      const option4ToSave = option4InputTextField.value;
      const correctAnsToSave = correctAnsInputTextField.value;
      const ansDetailToSave = ansDetailInputTextField.value;
     // questionTitleNo = selectedQuestionTitle.value;

      console.log("I am going to save" + questionToSave + "to Firestore");
      
      const qno =  parseInt(idInputTextField.innerText)

    //   console.log("qno "+ qno + "Selected question title " +  selectedQuestionTitle.value);


      db.collection(questionTitleNo).add({
          serverId: qno,
          q: questionToSave,
          opt1: option1ToSave,
          opt2: option2ToSave,
          opt3: option3ToSave,
          opt4: option4ToSave,
          ans: correctAnsToSave,
          detail: ansDetailToSave
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        questionInputTextField.value = "";
        option1InputTextField.value = "";
        option2InputTextField.value = "";
        option3InputTextField.value = "";
        option4InputTextField.value = "";
        correctAnsInputTextField.value = "";
        ansDetailInputTextField.value = "";

        idInputTextField.innerText = parseInt(idInputTextField.innerText)+ 1;

      //  alert("Question submitted to server");

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    


  })

  getLastQuestionId = function(){
    // const lastId = quesRef.orderBy("qno").limit(1);
    var maxId = 0;
    db.collection(questionTitleNo).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().serverId}`);
            const mydata = doc.data();
            if(maxId<= mydata.serverId)
                maxId = mydata.serverId
        });
        idInputTextField.innerText = parseInt(maxId)+ 1;
        console.log("last Id " + maxId);
    });



  }

  loadQuestiontitles = function(){

    var select = document.getElementById("selectQuestion"); 
// var options = ["1", "2", "3", "4", "5"]; 

// for(var i = 0; i < options.length; i++) {
//     var opt = options[i];
//     var el = document.createElement("option");
//     el.text = opt;
//     el.value = opt;
//     select.add(el);}


    db.collection("Question").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().serverId}`);
            const mydata = doc.data();
            var el = document.createElement("option");
            el.text = mydata.questionTitle;
            el.value = mydata.serverId;
            select.add(el)
        });

    });
    
  }


  onQuestionTitleSelect = function(){

    console.log("selected nth question  is "+ selectedQuestionTitle.value);
    questionTitleNo = selectedQuestionTitle.value;
    getLastQuestionId();
  }

  getLastQuestionId();
  loadQuestiontitles();
