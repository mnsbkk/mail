document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.body.querySelector("#compose-form").addEventListener("submit", submit_mail);




  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';


}

function load_mailbox(mailbox) {




  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;


  // This will determine which box function to invoke
  if (mailbox === "inbox"){
    inbox_mails();
  }
  else if (mailbox === "sent"){
    sent_mails();
  }
  else if (mailbox === "archive"){
    archived_mails();
  }

}


// This function retrieve the sent mail
function sent_mails(){

  // This create the images header
  const emails = document.body.querySelector("#emails-view");
  const new_div_header = document.createElement("div");
  new_div_header.className = "new-header-div";
  const img1 = document.createElement("img");
  img1.src = "https://pics.freeicons.io/uploads/icons/png/16484365561552994184-512.png"
  img1.className = "img1"
  const img2= document.createElement("img");
  img2.src = "https://pics.freeicons.io/uploads/icons/png/2495438061548336236-512.png"
  img2.className = "img2"
  const img3 = document.createElement("img");
  img3.src = "https://pics.freeicons.io/uploads/icons/png/10669457391554126471-512.png"
  img3.className = "img3"
  emails.appendChild(new_div_header);
  new_div_header.appendChild(img1);
  new_div_header.appendChild(img2);
  new_div_header.appendChild(img3);

  // This fetches the sent mails
  fetch("emails/sent")


  .then(response => response.json())
  .then(data => {
    const data_size = Object.keys(data).length;
    // Looping on the mails
    for (let i = 0; i < data_size; i++){
      const emails = document.body.querySelector("#emails-view");
      const new_div = document.createElement("div");
      new_div.className = "new-div-unread";
      // This determines if a message's read value is true
      if (data[i].read === true){
        // This class is modified in style.css file
        new_div.className = "new-div-read";
      }
      // Here lables are created to store information of mail values
      const snd_label = document.createElement("label");
      snd_label.className = "snd-label"
      const subj_label = document.createElement("label");
      subj_label.className = "subj-label"
      const time_label = document.createElement("label");
      time_label.className = "time-label";
      new_div.setAttribute("id", `new-div${i}`);
      const mail_id = document.createElement("input");
      mail_id.value = data[i].id;
      mail_id.type = "hidden";

      // Here values are assigned to the elements created earlier
      snd_label.innerHTML = data[i].sender;
      subj_label.innerHTML = (data[i].subject).slice(0, 20);
      time_label.innerHTML = data[i].timestamp

      emails.appendChild(new_div);
      new_div.appendChild(snd_label);
      new_div.appendChild(subj_label);
      new_div.appendChild(time_label);
      new_div.appendChild(mail_id);

      // For each row (div) a function is associated to open the email in a separate div
      document.querySelector(`#new-div${i}`).addEventListener("click", function(){

        const emailsdiv = document.body.querySelector("#emails-view");
        const id = emailsdiv.querySelector(`#new-div${i}`).childNodes[3].value;
        // This passes the mail id and invokes the individual mail function to display the mail
        individual_mail(id);

      });

    }
  })



}

// This functions retrieves all inbox mails
function inbox_mails(){

  const emails = document.body.querySelector("#emails-view");
  const new_div_header = document.createElement("div");
  new_div_header.className = "new-header-div";
  const img1 = document.createElement("img");
  img1.src = "https://pics.freeicons.io/uploads/icons/png/16484365561552994184-512.png"
  img1.className = "img1"
  const img2= document.createElement("img");
  img2.src = "https://pics.freeicons.io/uploads/icons/png/2495438061548336236-512.png"
  img2.className = "img2"
  const img3 = document.createElement("img");
  img3.src = "https://pics.freeicons.io/uploads/icons/png/10669457391554126471-512.png"
  img3.className = "img3"
  emails.appendChild(new_div_header);
  new_div_header.appendChild(img1);
  new_div_header.appendChild(img2);
  new_div_header.appendChild(img3);




  fetch("emails/inbox")
  .then(response => response.json())
  .then(data => {
    const data_size = Object.keys(data).length;
    for (let i = 0; i < data_size; i++){
      const emails = document.body.querySelector("#emails-view");
      const new_div = document.createElement("div");
      new_div.className = "new-div-unread";
      if (data[i].read === true){
        new_div.className = "new-div-read";
      }
      const snd_label = document.createElement("label");
      snd_label.className = "snd-label"
      const subj_label = document.createElement("label");
      subj_label.className = "subj-label"
      const time_label = document.createElement("label");
      time_label.className = "time-label";
      new_div.setAttribute("id", `new-div${i}`);
      const mail_id = document.createElement("input");
      mail_id.value = data[i].id;
      mail_id.type = "hidden";
      if (data[i].archived === false){
      snd_label.innerHTML = data[i].sender;
      subj_label.innerHTML = (data[i].subject).slice(0, 20);
      time_label.innerHTML = data[i].timestamp
      emails.appendChild(new_div);
      new_div.appendChild(snd_label);
      new_div.appendChild(subj_label);
      new_div.appendChild(time_label);
      new_div.appendChild(mail_id);


      document.querySelector(`#new-div${i}`).addEventListener("click", function(){

        const emailsdiv = document.body.querySelector("#emails-view");
        const id = emailsdiv.querySelector(`#new-div${i}`).childNodes[3].value;
        // alert(id)
        individual_mail(id);

      });

      } // end if

    }
  })


}

// This functions retrieves all archived mails
function archived_mails(){

  const emails = document.body.querySelector("#emails-view");
  const new_div_header = document.createElement("div");
  new_div_header.className = "new-header-div";
  const img1 = document.createElement("img");
  img1.src = "https://pics.freeicons.io/uploads/icons/png/16484365561552994184-512.png";
  img1.className = "img1"
  const img2= document.createElement("img");
  img2.src = "https://pics.freeicons.io/uploads/icons/png/2495438061548336236-512.png"
  img2.className = "img2"
  const img3 = document.createElement("img");
  img3.src = "https://pics.freeicons.io/uploads/icons/png/10669457391554126471-512.png"
  img3.className = "img3"
  emails.appendChild(new_div_header);
  new_div_header.appendChild(img1);
  new_div_header.appendChild(img2);
  new_div_header.appendChild(img3);


  fetch("emails/archive")
  .then(response => response.json())
  .then(data => {
    const data_size = Object.keys(data).length;
    for (let i = 0; i < data_size; i++){
      const emails = document.body.querySelector("#emails-view");
      const new_div = document.createElement("div");
       new_div.className = "new-div-unread";
      if (data[i].read === true){
        new_div.className = "new-div-read";
      }
      const snd_label = document.createElement("label");
      snd_label.className = "snd-label"
      const subj_label = document.createElement("label");
      subj_label.className = "subj-label"
      const time_label = document.createElement("label");
      time_label.className = "time-label";
      new_div.setAttribute("id", `new-div${i}`);
      const mail_id = document.createElement("input");
      mail_id.value = data[i].id;
      mail_id.type = "hidden";
      if (data[i].archived === true) {
      snd_label.innerHTML = data[i].sender;
      subj_label.innerHTML = (data[i].subject).slice(0, 20);
      time_label.innerHTML = (data[i].body).slice(0, 30);

      emails.appendChild(new_div);
      new_div.appendChild(snd_label);
      new_div.appendChild(subj_label);
      new_div.appendChild(time_label);
      new_div.appendChild(mail_id);

      document.querySelector(`#new-div${i}`).addEventListener("click", function(){

        const emailsdiv = document.body.querySelector("#emails-view");
        const id = emailsdiv.querySelector(`#new-div${i}`).childNodes[3].value;
        // alert(id)
        individual_mail(id);

      });

      } // end if


    }
  })


}



// This function displays a given mail separately taking that mail's id
function individual_mail(id){

  const email_id = id;
  const div = document.body.querySelector("#emails-view");
  const new_div = document.createElement("div");
  new_div.style.display = "flex";

  // This will make each mail as read
  fetch(`/emails/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
      read: true
  })
});


  // This clears out all existing divs
  while(div.firstChild)
  {
    div.removeChild(div.firstChild);
  }

  const single_mail = document.createElement("form");
  single_mail.setAttribute("class", "form form-group");
  single_mail.className = "single-mail"
  const sender_input = document.createElement("input");
  sender_input.setAttribute("class", "form form-control");
  sender_input.disabled = true;
  const subject_input = document.createElement("input");
  subject_input.setAttribute("class", "form form-control");
  subject_input.disabled = true;
  const body_input = document.createElement("textarea");
  const btn_reply = document.createElement("button");
  const btn_archive = document.createElement("button");
  const btn_inbox = document.createElement("button");
  btn_inbox.setAttribute("class","btn btn-secondary" );
  btn_inbox.style.marginLeft = `${10}px`;
  btn_inbox.setAttribute("id", "btn-inbox");
  btn_inbox.textContent = "Back"
  btn_archive.setAttribute("id", "btn-archive");
  btn_archive.style.marginLeft = `${10}px`;
  btn_archive.setAttribute("class", "btn btn-warning");
  btn_reply.setAttribute("class", "btn btn-primary");
  btn_reply.textContent = "Reply";
  btn_reply.setAttribute("id", "btn-reply");
  body_input.disabled = true;
  body_input.setAttribute("class", "form form-control");
  fetch(`emails/${id}`)
  .then(response => response.json())
  .then(data => {
    if (data.archived === false){
      btn_archive.textContent = "Archive";
    }
    else if (data.archived === true){
      btn_archive.textContent = "Unarchive"
    }
    sender_input.value = `From: ${data.sender}`;
    subject_input.value = `Subject: ${data.subject}`;
    body_input.value = data.body;
    div.appendChild(new_div);
    single_mail.appendChild(btn_reply);
    single_mail.appendChild(btn_archive);
    single_mail.appendChild(btn_inbox);
    new_div.appendChild(single_mail);
    single_mail.appendChild(sender_input);
    single_mail.appendChild(subject_input);
    single_mail.appendChild(body_input);

    const txt = btn_archive.textContent;
    const recipient = data.recipients[0];
    const time = data.timestamp;
    document.body.querySelector("#btn-inbox").addEventListener("click", () => load_mailbox("inbox"));
    document.body.querySelector("#btn-reply").addEventListener("click", () => email_reply(recipient, data.sender, data.subject, data.body, time));
    document.body.querySelector("#btn-archive").addEventListener("click", () => make_archive(txt, email_id));

  });


}


function email_reply(sender, recipient, subject, body, time){

     document.body.querySelector("h3").innerHTML = "Reply"
    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

    //
    document.querySelector('#compose-recipients').value = recipient;
    document.querySelector('#compose-subject').value = subject;
    document.querySelector('#compose-body').value = `On ${time} ${sender} wrote: ${body}`

    event.preventDefault();
}

function make_archive(message, id){


  if (message === "Archive"){

        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: true
          })
  });

  }else if(message === "Unarchive"){
    fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: false
          })
  });
  }

  load_mailbox("archive")

}



// This function sends the email
function submit_mail() {

  const recipient = document.body.querySelector("#compose-recipients").value;
  const subject = document.body.querySelector("#compose-subject").value;
  const body = document.body.querySelector("#compose-body").value;

    fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipient,
        subject: subject,
        body: body
        })
      })
      .then(response => response.json())
      .then(result => {
          // Print result
          console.log(result);
          alert(result.message)

      });
  load_mailbox("sent");

  event.preventDefault();

}