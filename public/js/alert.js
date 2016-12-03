// Nodejs Fundamental     ---------------------------------------------------------------------------------------------------------------------------------------------------

// Callback   ->  Konsep, inget, konsep,w wkwkkwkwwk

// gini gini
// misal gw ada Fungsi A,  Fungsi B, dan Fungsi C

// nah gw mau pas panggil Fungsi A, Setelah fungsi A kelar, dia otomatis ngelanjutin dan manggil Fungsi B,  dan setelah fungsi B kelar,  dia lanjut manggil Fungsi C .
//                                                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                                                                 CALLBACK                                                    CALLBACK

//yaudah ini basic basic basic nya callback . intinya tuh tadi yg gw block icic

// jadi, pada umumny, fungsi callback itu yang pasti kita Customize, manggil fungsi yg sama, tapi setelahnya, berbeda yang di print
// bisa beda karena si callback nya beda iya  duh butuh quiz kayaknya, kok gw ragu sama yg gw ketahui ya,kayak lebih gampang dripada yg sebelumnya
// ckckckck ini paling gitu" doang soalnya, callback=fungsi, kalo yg tadi kan bnyk hal, fundamental etc etc
// trus hubungannya sama pemakaian di nodejs?  semua fungsi yang u pake di nodejs, dia gak ngereturn value. dia nerusin lewat callback. contoh nya gni


// Callback Return Function 

function ConnectDatabase(url, username, password, callback){
    // ................................................
    var database = {
        user: ["Dar","Hln"]
    };
}
var paramUsername = "Hln";
ConnectDatabase("localhost", "root", "", nextfunction /*perhatiin disini gw kirim fungsi, bukan invoke fungsi*/ );

function nextfunction(err, db){  

    if (err) throw err;

    var users = db.user;
    for(i = 0 ; i < users.length; i++){
        if(users[i] == paramUsername){
            console.log("Login success");
            break;
        }
    }
}

function MakeKitten(name, age, callback){
    console.log("Making Kitten");

    if(isNaN(age)){ 
        callback("Age is not a number", null);
    }

    var kitten = {
        Name: name,
        Age : age
    }

    console.log("Process done. Proceed to Callback");
    callback(null, kitten);
}

MakeKitten("Ten", 1, function(err, kitten){
    if(err) throw err;

    console.log("Callback function. Show Kitten Name");
    console.log(kitten.Name);
});

MakeKitten("Kitten", 5, function(err, kitten){
    if(err) throw err;
    
    console.log("Callback function. Show Kitten Age only");
    console.log(kitten.Age);
});

// Callback Middleware Function  -> ow ow Middleware . oh kayaknya tadi gw liat di docs.................. yup
// oh man
// jadi tadi kan kita pake callback buat cmn dapetin hasil gitu, nah kalo disini, kita pake Middleware buat nge extend fungsi

// oke bayangin pabrik mobil  -> 1. Taro kerangka  ->   2. Taro mesin  ->  3. Taro ban  -> 4. Taro spion  -> 5. Finishing  ->  

// nah step step 1 2 3 4 5 ini bisa kita modularisasikan  (pecah-pecahin) dgn Middleware


//nah knp kita hrs ngerti middleware itu krna ini, 
//di web app kita, sblm kita masuk ke fungsi utama nya si login
//kita pengen initialize dl aw putus kwkwkwk wkwkwk session has timed out. session. session :) ckckcckk
//kita pengen initialize dulu databasenya

app.use(function(req,res,next){
    mongo.connect("localhost", "root", "", function(err,db){
        req.db = db;
        next();
    });
});
app.use(function(req,res,next){
    if(req.db == null)
        res.send("db uninitialized");
    else
        next();
});
app.get("/register", function(req,res){

    req.db.create({}, function(err, ret){

    })
});
app.get("/login", function(req,res){
    req.db.find({user: req.params.user, pass: req.params.pass}, function(err,ret){

    });
});

// nih bayangkin kalo gk pake middleware, kita harus melakukan ini disetiap route'
// nah dengan middleware, kita bisa pecah tuh fungsi yg buat konek db , biar gak kita ulang ulang terus di dalem fungsi route nya
// jadi kalo middleware, seperti namanya middle itu ngisi di tengah fungsi yg kita jalanin? nah iya betul

// gw sempet liat grafik middleware yg bgs, cmn lupa dmn it's always ok dar. wkwkwkwk.

// baiklah

// ok wkwkkwkwwk
// inntinya middleware cmn gitu" doang ya, melakukan fungsi 
// dahhh yuk tidur lanjut bsk wkwkwkwk gitu2 doang tapi harus ktmu prakteknya nih biar fully ngerti.

//oke nanti siang akan gw lanjutin lg.

//jd gw benerin view, trus ya nosql aja lgsg, mumpung uda ngerti javascript object, nosql is a breeze
//aduh aduh. tapi where to start weh. ini ga bisa pake dasar api ya? mlab? firebase?
//firebase lebih fokus ke front end nya sih, nodejs gk tau dah suport firebase ato kgk

//oke... jadi gw pake mongo db ya... 
////iya paling, pake mlab lebih enak sih gak pusing 
//kalo mongodb lu hrs install install lagi, terus nyalain semacam node server.js lagi

//baiklah 
//ok saatnya tidur wkkwwwk wkwkwk kepala gw ud sakit wkwkwk
// thanks a lot dar, thank you.
// good night  no problem lenn , night too :)


app.get("/login", function(req,res){
    mongo.connect("localhost", "root", "", function(err,db){
         if(db == null)
            res.send("db error");

            db.find({user: req.params.user, pass: req.params.pass}, function(err,ret){

            });
    });
});
app.get("/register", function(req,res){
    mongo.connect("localhost", "root", "", function(err,db){
         if(db == null)
            res.send("db error");

            db.find({user: req.params.user, pass: req.params.pass}, function(err,ret){

            });
    });
});


// okeh len gw gak bisa mikir lagi, ini jadi homework gw, bikin sistem middleware. nanti kalo uda kelar gw coba utk jelaskan
var CarProductionSteps = [];
var UseStep = function(middleware){
    if(CarProductionSteps.length > 0){
        CarProductionSteps[CarProductionSteps.length - 1].next = middleware; 
    } else {
        middleware.next = function(){
            console.log("Done");
        }
    }
    CarProductionSteps.push(middleware);
}
UseStep(function(err,car,next){
    // Assemble chasis
    car.chasis = 1;
    next();
});
UseStep(function(err,car,next){
    // Assemble engine
    car.engine = {
        horsepower: 480,
        litre: 1500
    }
    next();
});
UseStep(function(err,car,next){
    // Assemble wheel
    car.wheel = 4;
    next();
});


function ProduceCar(brand, callback){
    var car = {
        brand: brand
    }
    console.log(CarProductionSteps[0]);
    CarProductionSteps[0](null, car); 

    callback(err, car);
}


ProduceCar("Honda", function(err, car){
    console.log(car); //yasudah khusus middle
});


return;
 
// Javascript Fundamental ---------------------------------------------------------------------------------------------------------------------------------------------------


(function (){
    console.log("Hello Unnamed Function");
})(); 

// nah jadi ya kalo mau bikin unnamed function dan mau dipake lagi kita simpen di var 

var referenceToUnnamedFunction = function(){
    console.log("Hey I'm here");
}

referenceToUnnamedFunction();

// Named Function  ->  fungsi yang memiliki nama  yaitu MutateObject
function MutateObject(obj){
    //alamat si obj itu adalah alamat baru
    //value  si obj itu adalah alamatnya si Hooman

    // berati obj.HP  menuju ke alamatnya si Hooman

    obj.HP = 100;
    obj.AP = 100;
}


var VariableMutateObject = MutateObject; //disini VariableMutateObject kan valuenya mengcopy  alamat obenar juga. tpi kalo dari awal dia fungsi, kyk si mutate object. abis kita

//ubah jadi helo rarwrarwawr itu, berarti hilang? yapppppppppppppppp well said (y)

VariableMutateObject({}); 
//yg ini tuh ketika kita invoke, dia gak langsung menuju fungsinya kan, sedangkan melalui variable VariableMutateObject tsb
//Karena ini Variable, BERARTI DYNAMIC, artinya 


VariableMutateObject = "Hehehe";  //code ini merubah si VariableMutateObject yang tadi isinya itu sebuah fungsi memennjjaadidi  sstring ? iyappp

 // console log kan bisa terima string, terima objek juga bisa malah kan 
console.log(VariableMutateObject); 

VariableMutateObject = function(){
    console.log("Fungsi baru buat dia"); 
}

//tapi pas kita invoke  na
VariableMutateObject();//ygg ini ya mksd u? iya yg tadi throw error wkwkw pdhl console log nya kan di atas? hrsnya kluar hehehe? tadi kayaknya gw melihat yg ada error itu lohh itu di mana ya wkwkwkw
//error karena si variable mutate object ini
 // oh ini uda gak boleh, bakal throw ini, karena lu meng invoke non-function, soalnya isi dari VariableMutateObject itu udah String, bukan Function lagi
//i seeeeeee nah ini error , gituuu

MutateObject({});
//kalo yg ini kita lgsg akses MutateObject nya .. bedanya tu gni//
//nah kalo yg ini
MutateObject = "Hello RAwradadasdas"; // harusnya gak bisa ya gw jg krg yakin blm perna coba tadi di variable itu error karena?

console.log(MutateObject);

// Named Function -> namanya Test
function Test(obj){
    //alamat si obj itu adalah alamat baru
    //berarti obj != Hooman
    var replaceObject = {
        Test: "None"
    }
    //oleh karena itu ketika value alamat si obj kita ganti ke alamat si replaceObject, si Hoomannya tetep gak keganti, karena alamat nya dia tetep damai dan tentram
    obj = replaceObject; 
}


// Unn


// Standard  Javascript Object
var Hooman = {
    Nama: "Billy", 
    Umur: 20, 
    Nilai: 100
};
Hooman.FavoriteFoods = ["Chicken", "Food", "Cow"];

Test(Hooman);
console.log(Hooman);

// Kitten(kitten) kan, nah kitten nya itu si objek yg tdi gw blok
// nah skrg quick quiz deh, misal ya
function Kitten (kitten) {
    var self = this;
    this.Name = kitten.Name;
    this.Age = kitten.Age;
    this.FavoriteFoods = kitten.FavoriteFoods;
    this.Hygeine = kitten.Hygeine || 100; 

    this.Bath = function(){
        self.Hygeine += 10;
    }
}

// nih cth kasus lagi
var yellowKitten = new Kitten({  
    Name: "Kitty Cat",
    Age: 0.5,
    FavoriteFoods: ["Peanut", "Bar"]
});
console.log(yellowKitten.Hobby); // -> undefined

yellowKitten.Hobby = "Rolling and Playing";
console.log(yellowKitten.Hobby); // -> Rolling and Playing

yellowKitten.Bath();



var userList = [];

userList.push({
    Name: "Dar",
    Age: 20, 
    Role: "admin"
});

var clientObject = {
    Name: "Hln",
    Age: 20,
    Role: "client",
    Referral: "HLN20"
}
userList.push(clientObject);


userList.push(123);
userList.push("Hello World"); 

userList.push({
    Name: "Arlet",
    Age: 20,
    Role: "client",
    Referral: "HLN20"
});
