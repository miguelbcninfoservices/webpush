const {Router} = require('express');
const router = Router()

const webpush = require('../webpush');
let pushSubcription;


//Suscribir usuario
router.post('/subscription', async (req,res)=>{
    pushSubcription = req.body;
    res.status(200).json();
})

router.post('/new-message',  async (req,res)=>{

    const { message } = req.body;

   
    const payload = JSON.stringify( {
        title: 'Notificacion',
        message: message
    })


    try{

        await webpush.sendNotification(pushSubcription,payload)
    } catch(error) {
        console.log(error);
    }
})
   





module.exports = router;