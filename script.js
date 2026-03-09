  
//   sine up section jonno 
  const signBtn = document.getElementById('signBtn');
    const passwordInput = document.getElementById('passwordInput');
    const userNameInput = document.getElementById('userNameInput');

    signBtn.addEventListener('click', ()=>{
        let password = passwordInput.value;
        let userName = userNameInput.value;
        console.log(password);
        console.log(userName);
        if(userName === 'admin' && password === 'admin123'){
            alert('login success!')
            window.location.assign('/homepage.html');
        }else{
            alert('login Failed');
            userNameInput.value = '';
            passwordInput.value = '';
        }
    })

    // sinup section end