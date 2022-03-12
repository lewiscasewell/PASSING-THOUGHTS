// offline data
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
  if (err.code == "failed-precondition") {
    // multiple tabs might be open at once
    console.log("persistence failed");
  } else if (err.code == "unimplemented") {
    // lack of browser support
    console.log("persistence is not available");
  }
});

// real-time listener
db.collection("thoughts").onSnapshot((snapshot) => {
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      // add the document data to the web page
      renderThought(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      // remove the document data from the webpage
      removeThought(change.doc.id);
    }
  });
});

// add new thoughts
const form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const thought = {
    title: form.title.value,
    content: form.content.value,
  };

  db.collection("thoughts")
    .add(thought)
    .catch((err) => console.log(err));

  form.title.value = "";
  form.content.value = "";
});

// delete a recipe
const thoughtContainer = document.querySelector(".thoughts");
thoughtContainer.addEventListener("click", (evt) => {
  console.log(evt);
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    db.collection("thoughts").doc(id).delete();
  }
});
