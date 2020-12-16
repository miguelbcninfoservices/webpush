

const ID_KEY='BK7MOkWBcVPEaP8feUiXJc10SR5HuiV8RjP4DKjf3GGi_kRaVk1fqoykSNfbfopuWeLSFmdZLtNHy2RyAl8eHgw';
const pushButton = document.querySelector('#permitir');
const form = document.querySelector('#myform');
const message = document.querySelector('#message');

let isSubscribed = false;
var register;


//Funcion para pasar de base64 a unit8 (documentación)
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


//Cambia el valor del botón en función de si el usuario esta subscrito 
  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Mensajeria Push bloqueada';
      pushButton.disabled = true;
      return;
    }
  
    if (isSubscribed) {
      pushButton.textContent = 'Desabilitar mensajeria push';
      form.style.visibility='visible';
  
    } else {
      pushButton.textContent = 'Habilitar mensajeria push';
      form.style.visibility='hidden';
    }
  
    pushButton.disabled = false;
  };
//Da el valor de issubscribe al comenzar la aplicación y aporta funcionalidad al botón
  async function initializeUI() {
    // Set the initial subscription value
    await register.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);
  
      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }
      updateBtn();
    });

    pushButton.addEventListener('click', function() {
      pushButton.disabled = true;
      if (isSubscribed) {
        unsubscribeUser();
      } else {
        subscription();
      }
    });

  }

  // dar de baja al usuario
  function unsubscribeUser() {
    register.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
  
      console.log('User is unsubscribed.');
      isSubscribed = false;
  
      updateBtn();
    });
  }

  // suscribir al usuario
const subscription = async() => {
   const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(ID_KEY)
    });

   await fetch('/subscription',{
    method: 'POST',
    body:JSON.stringify(subscription),
    headers:{
        "Content-Type":"application/json"
    }
});
console.log('Suscrito!!')
isSubscribed = true;
updateBtn();
}

//Crea el service worker
const sw = async () => {
 register = await navigator.serviceWorker.register('/worker.js',{
  scope:'/'
});
console.log('new Service Worker');
initializeUI();
}

//Envia al server la frase para la notificación personalizada
form.addEventListener('submit', e =>{
  e.preventDefault();
     fetch('/new-message',{
    method:'POST',
    body: JSON.stringify({
      message: message.value
    }),
    headers: {
      'Content-Type':'application/json'
    }
  });
  
  form.reset();
})

// mira la compatibilidad del navegador utilizado
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');
   sw();
  
   
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }