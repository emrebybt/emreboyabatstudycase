const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const UserAddress = require('../models/userAddress');


exports.postRegister = (req, res, next) => {
    const {name, surname, username ,email, password, age, gender, profilPictureUrl} = req.body;
    bcrypt.hash(password, 10)
    .then(hashedPassword => {
        console.log(hashedPassword);
        const user = new User({
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: hashedPassword,
            age: age,
            gender: gender,
            profilPictureUrl: profilPictureUrl
        })
        console.log(user);
        //const user = new User(req.body)
        user.save()
        .then((user) => {
            res.json(user);
        }).catch((err) => {
            res.json({error:'Kullanıcı kaydı başarısız'});
        })
    })   
}

exports.postUserAddress = (req, res) => {
    const {name, city, district,street,description} = req.body;
    const userAddress = new UserAddress({
        name, city, district, street, description
    })
    userAddress.save()
    .then((userAddress) => {
        res.json(userAddress);
        //adres idsi usere eklenecek
    }).catch((err) => {
        res.json({error: 'Adres kaydı başarısız.',err})
    })
}

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body;
    User.findOne({username: username})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password)
            .then(result=>{
                if(result){ 
                    const payload={
                        name:user.name,
                        id: user._id
                    }
                    const secret_key='private Secret Key'
                    const token=jwt.sign( payload, secret_key, { expiresIn: '5m' })
                    
                    res.json(token)
                }
                else{
                    res.json('Şifre hatası')
                }
             })    
        }
        else{
            res.json('Kullanıcı bulunamadı')
        }
       
    })
}