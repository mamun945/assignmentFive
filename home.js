        let allCardContainer = document.getElementById('allCardContainer');
        let changButtons = document.querySelectorAll('.changeButton');
        let numberOfIssue = document.getElementById('number-of-issue');
        let cardDetails = document.getElementById('card_details');
        let spinnerContainer = document.getElementById('spinnerDiv');
        let searchInput = document.getElementById('searchInput');
        let searchBtn = document.getElementById('searchBtn');
   
  //  spinner open function 
  function spinnerOpen(){
     allCardContainer.classList.add('hidden');
     spinnerContainer.classList.remove('hidden');
  } 
  
  // spinner close function 
  function spinnerClosed(){
     allCardContainer.classList.remove('hidden');
     spinnerContainer.classList.add('hidden');
  }


  //    all open closed button function
    function selectButton(id){
        changButtons.forEach( button =>{
            button.classList.remove('btn-primary','text-white');
            button.classList.add('btn','text-gray-600');
        })
        let selectElement = document.getElementById(id);
        selectElement.classList.add('btn-primary', 'text-white');

        if(id === 'all'){
             allCardLoad();
        }else if(id === 'open'){
              opeCard();
        }else if(id === 'closed'){
          closedCard();
        }

    }



        // all card section jonno 
       async function allCardLoad(){
             spinnerOpen();
            let res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
            let data = await res.json();
            allCardDisplay(data.data);
             spinnerClosed();   
       }
        // all card display
       function allCardDisplay(items){
        allCardContainer.innerHTML = '';
            items.forEach( item =>{
                let div = document.createElement('div');
                div.innerHTML =`
                      <div onclick="details(${item.id})" id="card" class="card shadow-2xl border-t-4 border-green-500 h-full">
                    <div class="p-4.5">
                        <!-- first section -->
                    <div class="first-section flex justify-between items-center">
                        <img id="status" class="status h-[20px] w-auto" alt="openlogo">
                        <button id="priority" class="priority px-[30px] py-[2px] rounded-full">${item.priority}</button>
                    </div>
                 <!-- second section  -->
                    <div class="second-section mt-2 space-y-3">
                        <div>
                        <h2 class="title text-md font-bold">${item.title}</h2>
                        <p class="description text-[#64748B]">${item.description}</p>
                        </div>
                        <div class="labels-section flex items-center gap-5">
                            <button id="label-1-btn" class="flex items-center text-[12px] label py-1 px-4 rounded-full">
                               <img id="label-1-image" src="">
                               <span id="label-1-text"></span>
                            </button>
                            <button id="label-2-btn" class="flex items-center gap-1 text-[12px] py-1 px-4 rounded-full">
                               <img id="label-2-image" src="">
                               <span id="label-2-text"></span>
                            </button>

                        </div>
                    </div>
                    </div>
                    <!-- third section  -->
                     <div class="author-date p-4 border-t-1 border-[#64748B]">
                        <p class="author text-[#64748B]">${item.author}</p>
                        <p class="createdAt text-[#64748B]">${item.createdAt}</p>
                     </div>
                 </div>
                `;
                let card = div.querySelector('#card');
                let status = div.querySelector('#status');
            
                  if(item.status === 'open'){
                    status.src = './assets/Open-Status.png';
                    card.classList.add('border-t-2','border-green-500');
                    card.classList.remove('border-t-2','border-purple-500');
                  }else{
                    status.src = './assets/Closed-Status.png';
                    card.classList.remove('border-t-2','border-green-500');
                    card.classList.add('border-t-2','border-purple-500');
                  }
                let priority = div.querySelector('#priority');
                  if(item.priority === 'high'){
                    priority.classList.add('bg-red-200','border-1','border-red-400','text-red-500');
                     priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'medium'){
                    priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.add('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'low'){
                     priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.add('bg-purple-200','border-purple-400','text-purple-500');
                  }

              let labelOne = div.querySelector('#label-1-btn');
              let labelTwo = div.querySelector('#label-2-btn');
              let labelOnimage = div.querySelector('#label-1-image');
              let labelOnText = div.querySelector('#label-1-text');
              let labelTwoimage = div.querySelector('#label-2-image');
              let labelTwoText = div.querySelector('#label-2-text');
            //    item.labels.forEach( label =>{
            //       labelOne.innerText = label;
            //       labelTwo.innerText = label;
            //    })
              if(item.labels.length === 1){
                  if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }
                    labelOne.classList.remove('hidden');
                    labelTwo.classList.add('hidden');
                    
                }else{

                   if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }

                  if(item.labels[1] == 'help wanted'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#FFF8DB]','border-1','border-[#FDE68A]','text-[#D97706]');
                    labelTwoimage.src ='./assets/help.png';
                  }else if(item.labels[1] == 'good first issue'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-blue-200','border-1','border-blue-500','text-blue-500');
                    labelTwoimage.src ='';
                  }else if(item.labels[1] == 'enhancement'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelTwoimage.src ='./assets/inhancement.png';
                  }


                    labelOne.classList.remove('hidden');
                    labelTwo.classList.remove('hidden');
                    // labelOne.innerText = item.labels[0];
                    // labelTwo.innerText = item.labels[1];
                }
             allCardContainer.appendChild(div);
            }) 
            
            let cards = allCardContainer.children.length;
             issueCount(cards);
       }
      

    //    dynamic number of issue
         function issueCount(cards){
            numberOfIssue.innerText = cards;
            // console.log(cards);
         }
  
//    opeCard card niye function 
    async function opeCard(){
           spinnerOpen();
          let res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
          let data = await res.json();
          let cardDatas = data.data;
          opeCardDisplay(cardDatas);  
          spinnerClosed();
    }

    function opeCardDisplay(datas){
        allCardContainer.innerHTML = '';
        datas.forEach( item =>{
            if(item.status === 'open'){
                console.log(item);
                 let div = document.createElement('div');
                div.innerHTML =`
                      <div onclick="details(${item.id})" id="card" class="card shadow-2xl border-t-4 border-green-500 h-full">
                    <div class="p-4.5">
                        <!-- first section -->
                    <div class="first-section flex justify-between items-center">
                        <img id="status" class="status h-[20px] w-auto" alt="openlogo">
                        <button id="priority" class="priority px-[30px] py-[2px] rounded-full">${item.priority}</button>
                    </div>
                 <!-- second section  -->
                    <div class="second-section mt-2 space-y-3">
                        <div>
                        <h2 class="title text-md font-bold">${item.title}</h2>
                        <p class="description text-[#64748B]">${item.description}</p>
                        </div>
                        <div class="labels-section flex items-center gap-5">
                            <button id="label-1-btn" class="flex items-center text-[12px] label py-1 px-4 rounded-full">
                               <img id="label-1-image" src="">
                               <span id="label-1-text"></span>
                            </button>
                            <button id="label-2-btn" class="flex items-center gap-1 text-[12px] py-1 px-4 rounded-full">
                               <img id="label-2-image" src="">
                               <span id="label-2-text"></span>
                            </button>

                        </div>
                    </div>
                    </div>
                    <!-- third section  -->
                     <div class="author-date p-4 border-t-1 border-[#64748B]">
                        <p class="author text-[#64748B]">${item.author}</p>
                        <p class="createdAt text-[#64748B]">${item.createdAt}</p>
                     </div>
                 </div>
                `;
                let card = div.querySelector('#card');
                let status = div.querySelector('#status');
            
                  if(item.status === 'open'){
                    status.src = './assets/Open-Status.png';
                    card.classList.add('border-t-2','border-green-500');
                    card.classList.remove('border-t-2','border-purple-500');
                  }else{
                    status.src = './assets/Closed-Status.png';
                    card.classList.remove('border-t-2','border-green-500');
                    card.classList.add('border-t-2','border-purple-500');
                  }
                let priority = div.querySelector('#priority');
                  if(item.priority === 'high'){
                    priority.classList.add('bg-red-200','border-1','border-red-400','text-red-500');
                     priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'medium'){
                    priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.add('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'low'){
                     priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.add('bg-purple-200','border-purple-400','text-purple-500');
                  }

               let labelOne = div.querySelector('#label-1-btn');
              let labelTwo = div.querySelector('#label-2-btn');
              let labelOnimage = div.querySelector('#label-1-image');
              let labelOnText = div.querySelector('#label-1-text');
              let labelTwoimage = div.querySelector('#label-2-image');
              let labelTwoText = div.querySelector('#label-2-text');
            //    item.labels.forEach( label =>{
            //       labelOne.innerText = label;
            //       labelTwo.innerText = label;
            //    })
              if(item.labels.length === 1){
                  if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }
                    labelOne.classList.remove('hidden');
                    labelTwo.classList.add('hidden');
                    
                }else{

                   if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }

                  if(item.labels[1] == 'help wanted'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#FFF8DB]','border-1','border-[#FDE68A]','text-[#D97706]');
                    labelTwoimage.src ='./assets/help.png';
                  }else if(item.labels[1] == 'good first issue'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-blue-200','border-1','border-blue-500','text-blue-500');
                    labelTwoimage.src ='';
                  }else if(item.labels[1] == 'enhancement'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelTwoimage.src ='./assets/inhancement.png';
                  }


                    labelOne.classList.remove('hidden');
                    labelTwo.classList.remove('hidden');
                    // labelOne.innerText = item.labels[0];
                    // labelTwo.innerText = item.labels[1];
                }
             allCardContainer.appendChild(div);
                
            }
        })
        let cards = allCardContainer.children.length;
            issueCount(cards);
    }
      
  
// closedCard jonno function
   async function closedCard(){
           spinnerOpen();
          let res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
          let data = await res.json();
          let cardDatas = data.data;
          closedCardDisplay(cardDatas);  
          spinnerClosed();
    } 
     
    
 function closedCardDisplay(datas){
        allCardContainer.innerHTML = '';
        datas.forEach( item =>{
            if(item.status === 'closed'){
                console.log(item);
                 let div = document.createElement('div');
                div.innerHTML =`
                      <div onclick="details(${item.id})" id="card" class="card shadow-2xl border-t-4 border-green-500 h-full">
                    <div class="p-4.5">
                        <!-- first section -->
                    <div class="first-section flex justify-between items-center">
                        <img id="status" class="status h-[20px] w-auto" alt="openlogo">
                        <button id="priority" class="priority px-[30px] py-[2px] rounded-full">${item.priority}</button>
                    </div>
                 <!-- second section  -->
                    <div class="second-section mt-2 space-y-3">
                        <div>
                        <h2 class="title text-md font-bold">${item.title}</h2>
                        <p class="description text-[#64748B]">${item.description}</p>
                        </div>
                       <div class="labels-section flex items-center gap-5">
                            <button id="label-1-btn" class="flex items-center text-[12px] label py-1 px-4 rounded-full">
                               <img id="label-1-image" src="">
                               <span id="label-1-text"></span>
                            </button>
                            <button id="label-2-btn" class="flex items-center gap-1 text-[12px] py-1 px-4 rounded-full">
                               <img id="label-2-image" src="">
                               <span id="label-2-text"></span>
                            </button>

                        </div>
                    </div>
                    </div>
                    <!-- third section  -->
                     <div class="author-date p-4 border-t-1 border-[#64748B]">
                        <p class="author text-[#64748B]">${item.author}</p>
                        <p class="createdAt text-[#64748B]">${item.createdAt}</p>
                     </div>
                 </div>
                `;
                let card = div.querySelector('#card');
                let status = div.querySelector('#status');
            
                  if(item.status === 'open'){
                    status.src = './assets/Open-Status.png';
                    card.classList.add('border-t-2','border-green-500');
                    card.classList.remove('border-t-2','border-purple-500');
                  }else{
                    status.src = './assets/Closed-Status.png';
                    card.classList.remove('border-t-2','border-green-500');
                    card.classList.add('border-t-2','border-purple-500');
                  }
                let priority = div.querySelector('#priority');
                  if(item.priority === 'high'){
                    priority.classList.add('bg-red-200','border-1','border-red-400','text-red-500');
                     priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'medium'){
                    priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.add('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'low'){
                     priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.add('bg-purple-200','border-purple-400','text-purple-500');
                  }

             let labelOne = div.querySelector('#label-1-btn');
              let labelTwo = div.querySelector('#label-2-btn');
              let labelOnimage = div.querySelector('#label-1-image');
              let labelOnText = div.querySelector('#label-1-text');
              let labelTwoimage = div.querySelector('#label-2-image');
              let labelTwoText = div.querySelector('#label-2-text');
            //    item.labels.forEach( label =>{
            //       labelOne.innerText = label;
            //       labelTwo.innerText = label;
            //    })
              if(item.labels.length === 1){
                  if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }
                    labelOne.classList.remove('hidden');
                    labelTwo.classList.add('hidden');
                    
                }else{

                   if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }

                  if(item.labels[1] == 'help wanted'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#FFF8DB]','border-1','border-[#FDE68A]','text-[#D97706]');
                    labelTwoimage.src ='./assets/help.png';
                  }else if(item.labels[1] == 'good first issue'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-blue-200','border-1','border-blue-500','text-blue-500');
                    labelTwoimage.src ='';
                  }else if(item.labels[1] == 'enhancement'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelTwoimage.src ='./assets/inhancement.png';
                  }


                    labelOne.classList.remove('hidden');
                    labelTwo.classList.remove('hidden');
                    // labelOne.innerText = item.labels[0];
                    // labelTwo.innerText = item.labels[1];
                }
             allCardContainer.appendChild(div);
                
            }
        })
        let cards = allCardContainer.children.length;
            issueCount(cards);
    }
   
//  modal function    
async function details(id){
    cardDetails.showModal();
    let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    let data = await res.json();
    detailsDisplay(data.data);
}

function detailsDisplay(datas){
  let modalTitle = document.getElementById('modalTitle');
  let status = document.getElementById('status2');
  let author = document.getElementById('author');
  let createdAt = document.getElementById('createdAt');
  let description = document.getElementById('description');
  let assignee = document.getElementById('assignee');
  let priority = document.getElementById('priority2');
  let labelContainer = document.getElementById('labels-container');
   labelContainer.innerHTML ='';
  let div = document.createElement('div');

    div.innerHTML = `
        <div class="labels-section flex items-center gap-5">
                            <button id="label-one-btn" class="flex items-center text-[12px] label py-1 px-4 rounded-full">
                               <img id="label-One-image" src="">
                               <span id="label-one-text"></span>
                            </button>
                            <button id="label-two-btn" class="flex items-center gap-1 text-[12px] py-1 px-4 rounded-full">
                               <img id="label-Two-image" src="">
                               <span id="label-two-text"></span>
                            </button>

                        </div>
    `;    
    
    labelContainer.appendChild(div);


              let labelOne = document.querySelector('#label-one-btn');
              let labelTwo = document.querySelector('#label-two-btn');
              let labelOnimage = document.querySelector('#label-One-image');
              let labelOnText = document.querySelector('#label-one-text');
              let labelTwoimage = document.querySelector('#label-Two-image');
              let labelTwoText = document.querySelector('#label-two-text');
            
              if(datas.labels.length === 1){
                  if(datas.labels[0] == 'bug'){
                    labelOnText.innerText = datas.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(datas.labels[0] == 'enhancement'){
                     labelOnText.innerText = datas.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(datas.labels[0] == 'documentation'){
                    labelOnText.innerText = datas.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }
                    labelOne.classList.remove('hidden');
                    labelTwo.classList.add('hidden');
                    
                }else{

                   if(datas.labels[0] == 'bug'){
                    console.log(datas.labels);
                    labelOnText.innerText = datas.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                    console.log(labelOnText);
                  }else if(datas.labels[0] == 'enhancement'){
                     labelOnText.innerText = datas.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(datas.labels[0] == 'documentation'){
                    labelOnText.innerText = datas.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }

                  if(datas.labels[1] == 'help wanted'){
                    labelTwoText.innerText = datas.labels[1];
                    labelTwo.classList.add('bg-[#FFF8DB]','border-1','border-[#FDE68A]','text-[#D97706]');
                    labelTwoimage.src ='./assets/help.png';
                  }else if(datas.labels[1] == 'good first issue'){
                    labelTwoText.innerText = datas.labels[1];
                    labelTwo.classList.add('bg-blue-200','border-1','border-blue-500','text-blue-500');
                    labelTwoimage.src ='';
                  }else if(datas.labels[1] == 'enhancement'){
                    labelTwoText.innerText = datas.labels[1];
                    labelTwo.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelTwoimage.src ='./assets/inhancement.png';
                  }


                    labelOne.classList.remove('hidden');
                    labelTwo.classList.remove('hidden');
                }





   if(datas.priority === 'high'){
     priority.innerText = datas.priority;
     priority.classList.add('bg-[#FEECEC]','text-[#EF4444]');
     priority.classList.remove('bg-[#FFF6D1]','text-[#F59E0B]');
     priority.classList.remove('bg-[#EEEFF2]','text-[#9CA3AF]');
   }else if(datas.priority === 'medium'){
    priority.innerText = datas.priority;
     priority.classList.remove('bg-[#FEECEC]','text-[#EF4444]');
     priority.classList.add('bg-[#FFF6D1]','text-[#F59E0B]');
     priority.classList.remove('bg-[#EEEFF2]','text-[#9CA3AF]');
   }else if(datas.priority === 'low'){
     priority.innerText = datas.priority;
     priority.classList.remove('bg-[#FEECEC]','text-[#EF4444]');
     priority.classList.remove('bg-[#FFF6D1]','text-[#F59E0B]');
     priority.classList.add('bg-[#EEEFF2]','text-[#9CA3AF]');
   }

   if(datas.status === 'open'){
    status.innerText = datas.status;
    status.classList.add('bg-[#CBFADB]','text-[#00A96E]');
    status.classList.remove('bg-[#F0E2FF]','text-purple-500');
   }else if(datas.status === 'closed'){
    status.innerText = datas.status;
    status.classList.remove('bg-[#CBFADB]','text-[#00A96E]');
    status.classList.add('bg-[#F0E2FF]','text-purple-500');
   }

  modalTitle.innerText = datas.title;
   author.innerText = datas.author;
   createdAt.innerText = datas.createdAt;
   description.innerText =datas.description;
   assignee.innerText = datas.assignee;
}
   

// search function section
 searchBtn.addEventListener('click', searchFunction);
 async function searchFunction(){
    spinnerOpen();
    let searchValue = searchInput.value;
    let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`);
    let data = await res.json();
    searchDisplay(data.data);
    spinnerClosed();
  }
 
  function searchDisplay(items){
          allCardContainer.innerHTML = '';
            items.forEach( item =>{
                let div = document.createElement('div');
                div.innerHTML =`
                      <div onclick="details(${item.id})" id="card" class="card shadow-2xl border-t-4 border-green-500 h-full">
                    <div class="p-4.5">
                        <!-- first section -->
                    <div class="first-section flex justify-between items-center">
                        <img id="status" class="status h-[20px] w-auto" alt="openlogo">
                        <button id="priority" class="priority px-[30px] py-[2px] rounded-full">${item.priority}</button>
                    </div>
                 <!-- second section  -->
                    <div class="second-section mt-2 space-y-3">
                        <div>
                        <h2 class="title text-md font-bold">${item.title}</h2>
                        <p class="description text-[#64748B]">${item.description}</p>
                        </div>
                        <div class="labels-section flex items-center gap-5">
                            <button id="label-1-btn" class="flex items-center text-[12px] label py-1 px-4 rounded-full">
                               <img id="label-1-image" src="">
                               <span id="label-1-text"></span>
                            </button>
                            <button id="label-2-btn" class="flex items-center gap-1 text-[12px] py-1 px-4 rounded-full">
                               <img id="label-2-image" src="">
                               <span id="label-2-text"></span>
                            </button>

                        </div>
                    </div>
                    </div>
                    <!-- third section  -->
                     <div class="author-date p-4 border-t-1 border-[#64748B]">
                        <p class="author text-[#64748B]">${item.author}</p>
                        <p class="createdAt text-[#64748B]">${item.createdAt}</p>
                     </div>
                 </div>
                `;
                let card = div.querySelector('#card');
                let status = div.querySelector('#status');
            
                  if(item.status === 'open'){
                    status.src = './assets/Open-Status.png';
                    card.classList.add('border-t-2','border-green-500');
                    card.classList.remove('border-t-2','border-purple-500');
                  }else{
                    status.src = './assets/Closed-Status.png';
                    card.classList.remove('border-t-2','border-green-500');
                    card.classList.add('border-t-2','border-purple-500');
                  }
                let priority = div.querySelector('#priority');
                  if(item.priority === 'high'){
                    priority.classList.add('bg-red-200','border-1','border-red-400','text-red-500');
                     priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'medium'){
                    priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.add('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.remove('bg-purple-200','border-purple-400','text-purple-500');
                  }else if(item.priority === 'low'){
                     priority.classList.remove('bg-red-200','border-red-400','text-red-500');
                    priority.classList.remove('bg-yellow-200','border-yellow-400','text-yellow-500');
                    priority.classList.add('bg-purple-200','border-purple-400','text-purple-500');
                  }

              let labelOne = div.querySelector('#label-1-btn');
              let labelTwo = div.querySelector('#label-2-btn');
              let labelOnimage = div.querySelector('#label-1-image');
              let labelOnText = div.querySelector('#label-1-text');
              let labelTwoimage = div.querySelector('#label-2-image');
              let labelTwoText = div.querySelector('#label-2-text');
            //    item.labels.forEach( label =>{
            //       labelOne.innerText = label;
            //       labelTwo.innerText = label;
            //    })
              if(item.labels.length === 1){
                  if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }
                    labelOne.classList.remove('hidden');
                    labelTwo.classList.add('hidden');
                    
                }else{

                   if(item.labels[0] == 'bug'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#FEECEC]','border-1','border-[#FECACA]','text-[#EF4444]');
                    labelOnimage.src ='./assets/bug.png';
                  }else if(item.labels[0] == 'enhancement'){
                     labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelOnimage.src ='./assets/inhancement.png';
                  }else if(item.labels[0] == 'documentation'){
                    labelOnText.innerText = item.labels[0];
                    labelOne.classList.add('bg-purple-100','border-1','border-purple-400','text-purple-500');
                    labelOnimage.src ='';
                  }

                  if(item.labels[1] == 'help wanted'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#FFF8DB]','border-1','border-[#FDE68A]','text-[#D97706]');
                    labelTwoimage.src ='./assets/help.png';
                  }else if(item.labels[1] == 'good first issue'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-blue-200','border-1','border-blue-500','text-blue-500');
                    labelTwoimage.src ='';
                  }else if(item.labels[1] == 'enhancement'){
                    labelTwoText.innerText = item.labels[1];
                    labelTwo.classList.add('bg-[#DEFCE8]','border-1','border-[#BBF7D0]','text-[##00A96E]');
                    labelTwoimage.src ='./assets/inhancement.png';
                  }


                    labelOne.classList.remove('hidden');
                    labelTwo.classList.remove('hidden');
                    // labelOne.innerText = item.labels[0];
                    // labelTwo.innerText = item.labels[1];
                }
             allCardContainer.appendChild(div);
            }) 
            
            let cards = allCardContainer.children.length;
             issueCount(cards);
  }
   

       searchFunction();
       allCardLoad();