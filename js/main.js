//FUNCIONALIDADES

//1) Mostrar cuentas en el DOM
//2) Permitir registrar gastos en cada cuenta
//3) Permitir ingresos gastos en cada cuenta
//3) Mostrar resumen de cuenta en el DOM
//4) Mostrar balance en el importe


//GENERAMOS LAS CLASES 

class Gasto{
    constructor(importe,desc,cuenta){
        this.importe = importe;
        this.desc = desc;
        this.cuenta = cuenta;
    }
}

class Ingreso{
    constructor(importe,desc,cuenta){
        this.importe = importe;
        this.desc = desc;
        this.cuenta = cuenta;
    }
}

class Cuenta{
    constructor(id,nombre,img){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.valor = 0.0;
    }
}

//INSTANCIAMOS LAS CUENTAS

const cuentaPrincipal = new Cuenta(1,"Cuenta Principal","./img/principal.png");
const cuentaEfectivo = new Cuenta(2,"Cuenta Efectivo","./img/efectivo.png");
const cuentaBanco = new Cuenta(3,"Cuenta Banco","./img/banco.webp");
const cuentaDolar =  new Cuenta(4,"Cuenta Dolar","./img/dolar.webp");

const cuentas = [cuentaPrincipal,cuentaEfectivo,cuentaBanco,cuentaDolar];

//INSTANCIAMOS LOS GASTOS e INGRESOS

const gastos = [];

const ingresos = [];


//LOCALSTORAGE:

if(localStorage.getItem("gastos")){
    gastoAlmacen = JSON.parse(localStorage.getItem("gastos"))
};


if(localStorage.getItem("ingresos")){
    ingAlmacen = JSON.parse(localStorage.getItem("ingresos"))
};

//APPI DOLAR

const paginaDolar = "https://criptoya.com/api/dolar";


//GENERAMOS LAS CUENTAS EN EL DOM

const contenedorCuentas = document.getElementById("contenedorCuentas");
const contenedorResumen = document.getElementById("contenedorResumen");

const mostrarCuentas = () => {
    cuentas.forEach( cuenta =>{
        const card = document.createElement("div");
        card.classList.add("col-lg-6","col-md-6","col-sm-12");
        if(cuenta.nombre=="Cuenta Dolar"){
            card.innerHTML=`
            <div class="card">
                <img src="${cuenta.img}" class="card-img-top imgCuentas" alt="${cuenta.nombre}">
                <div class="card-body">
                <h5 class="text-center">${cuenta.nombre}</h5>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <p id="valorCuenta${cuenta.id}">USD$ ${cuenta.valor}</p>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <p id="valorCuentaPesos${cuenta.id}">$ ${cuenta.valor}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <form action="" class="text-center">
                            <input id="campoA${cuenta.id}" type="text" placeholder="Ingrese Descripcion">
                            <input id="campoB${cuenta.id}" type="text" placeholder="Ingrese Importe">
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <button id="registrarGasto${cuenta.id}" class="colorBotonB btn">Registrar Gasto</button>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                    <button id="registrarIng${cuenta.id}" class="colorBotonA btn">Registrar Ingreso</button>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                    <button id="verResumen${cuenta.id}" class="colorBotonC btn">Ver Resumen</button>
                    </div>
                </div>
            </div>
        `
        }
        else{
            card.innerHTML=`
            <div class="card">
                <img src="${cuenta.img}" class="card-img-top imgCuentas" alt="${cuenta.nombre}">
                <div class="card-body">
                <h5 class="text-center">${cuenta.nombre}</h5>
                <p id="valorCuentaPesos${cuenta.id}">$ ${cuenta.valor}</p>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <form action="" class="text-center">
                            <input id="campoA${cuenta.id}" type="text" placeholder="Ingrese Descripcion">
                            <input id="campoB${cuenta.id}" type="text" placeholder="Ingrese Importe">
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <button id="registrarGasto${cuenta.id}" class="colorBotonB btn">Registrar Gasto</button>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                    <button id="registrarIng${cuenta.id}" class="colorBotonA btn">Registrar Ingreso</button>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                    <button id="verResumen${cuenta.id}" class="colorBotonC btn">Ver Resumen</button>
                    </div>
                </div>
            </div>
        `
        }
        
        contenedorCuentas.appendChild(card);

        const importe = document.getElementById(`campoB${cuenta.id}`);
        const descripcion = document.getElementById(`campoA${cuenta.id}`);

        const registrarGasto = document.getElementById(`registrarGasto${cuenta.id}`);


        registrarGasto.addEventListener("click",()=>{
            cargarGasto(cuenta.id,descripcion.value,importe.value)
        })

        const registrarIngreso = document.getElementById(`registrarIng${cuenta.id}`);
        
        registrarIngreso.addEventListener("click",()=>{
            cargarIngreso(cuenta.id,descripcion.value,importe.value)
        })

        const verResumenes = document.getElementById(`verResumen${cuenta.id}`);
        verResumenes.addEventListener("click",()=>{
            verResumen(cuenta.id);
        })

        localStorage.setItem("gastos", JSON.stringify(gastos));
        localStorage.setItem("ingresos", JSON.stringify(ingresos))
        
    })  
}

mostrarCuentas();

const cargarGasto = (id,desc,imp) =>{
    let nombreGasto = desc;
    let valorGasto = parseInt(imp);

    if(desc === ""){
        Swal.fire({
            title: 'Sin Datos',
            text: "Ingresa datos validos en el campo de descripcion",
            icon: 'error',
            confirmButtonText: 'Continuar'
          })
    }
    else if(imp === "" ){
        Swal.fire({
            title: 'Sin Datos',
            text: "Ingresa datos validos en el campo de importe",
            icon: 'error',
            confirmButtonText: 'Continuar'
          })
    }
    else{

    let gastoCargado = new Gasto(valorGasto,nombreGasto,id);
    gastos.push(gastoCargado);

    if(id===cuentaDolar.id){
        actualizarImporteCuentaDolar(id);
    }
    else{
        actualizarImporteCuenta(id);
    }
    

    localStorage.setItem("gastos", JSON.stringify(gastos));

    Swal.fire({
        title: 'Carga Exitosa',
        text: "Tu gasto fue cargado con exito",
        icon: 'success',
        confirmButtonText: 'Continuar'
      })
    }
}

const cargarIngreso = (id,desc,imp) =>{
    let nombreIng = desc;
    let valorIng = parseInt(imp);

    if(nombreIng === ""){
        Swal.fire({
            title: 'Sin Datos',
            text: "Ingresa datos validos en el campo de descripcion",
            icon: 'error',
            confirmButtonText: 'Continuar'
          })
    }
    else if(imp === "" ){
        Swal.fire({
            title: 'Sin Datos',
            text: "Ingresa datos validos en el campo de importe",
            icon: 'error',
            confirmButtonText: 'Continuar'
          })
    }
    else{
    let ingCargado = new Ingreso(valorIng,nombreIng,id);
    ingresos.push(ingCargado);
    
    if(id===cuentaDolar.id){
        actualizarImporteCuentaDolar(id);
    }
    else{
        actualizarImporteCuenta(id);
    }
    
   

    localStorage.setItem("ingresos", JSON.stringify(ingresos));

    Swal.fire({
        title: 'Carga Exitosa',
        text: "Tu ingreso fue cargado con exito",
        icon: 'success',
        confirmButtonText: 'Continuar'
      })
    }  
}

const verResumen = (id) =>{
    contenedorResumen.innerHTML="";

   const gastosResumen = [];
   const ingresosResumen = [];

   gastos.forEach(gasto=>{
        if(gasto.cuenta === id){
            gastosResumen.push(gasto);
        }
   })

   ingresos.forEach(ing=>{
    if(ing.cuenta === id){
        ingresosResumen.push(ing);
    }
   })

   gastosResumen.forEach(gasto=>{
        cuentaResumen = cuentas.find(cuenta => cuenta.id === gasto.cuenta);
        const card = document.createElement("div");
        card.classList.add("col-lg-12","col-md-12","col-sm-12");
        card.innerHTML=`
        <div>
            <p class="text-center">la cuenta ${cuentaResumen.nombre} gasto $${gasto.importe} en ${gasto.desc}</p>
        </div>
        `
        contenedorResumen.appendChild(card);
   })

   ingresosResumen.forEach(ing=>{
    cuentaResumen = cuentas.find(cuenta => cuenta.id === ing.cuenta);
    const card = document.createElement("div");
    card.classList.add("col-lg-12","col-md-12","col-sm-12");
    card.innerHTML=`
    <div>
        <p class="text-center">la cuenta ${cuentaResumen.nombre} ingreso $${ing.importe} debido a ${ing.desc}</p>
    </div>
    `
    contenedorResumen.appendChild(card);

   })

   balanceResumen = document.createElement("div");
   balanceResumen.classList.add("col-lg-12","col-md-12","col-sm-12");
   if(id===cuentaDolar.id){
    balance = setInterval(()=>
    fetch(paginaDolar)
    .then(response => response.json())
    .then(({oficial}) => {
        balance = (calcularBalance(id)).toString();
        balancePesos = (oficial.price*calcularBalance(id)).toString();
        balanceResumen.innerHTML=`
        <p class="text-center">El balance de la cuenta es USD$${balance}</p>
        <p class="text-center">El balance de la cuenta en Pesos es $${balancePesos}</p>
       `
       contenedorResumen.appendChild(balanceResumen);
    }))
}
else{
    balance = (calcularBalance(id)).toString();
    balanceResumen.innerHTML=`
    <p class="text-center">El balance de la cuenta es $${balance}</p>
   `
   contenedorResumen.appendChild(balanceResumen);
}

   if(id===cuentaDolar.id){
    actualizarImporteCuentaDolar(id);
}
else{
    actualizarImporteCuenta(id);
}

}

const calcularBalance = (id) =>{
    let balance =0;
    let totalGasto = 0;
    let totalIng = 0;
    
    gastos.forEach(gasto =>{
        if(gasto.cuenta === id){
            totalGasto = totalGasto+gasto.importe;
        }    
    })

    ingresos.forEach(ing =>{
        if(ing.cuenta === id){
            totalIng = totalIng+ing.importe;
        }
    })

    balance =(totalIng - totalGasto);
    return balance;
    
}


const actualizarImporteCuenta = (id) =>{
    const valorCuenta = document.getElementById(`valorCuenta${id}`);
    valorCuenta.innerHTML = `<p id="valorCuenta${id}">$ ${calcularBalance(id)}</p>`;
}

const actualizarImporteCuentaDolar = (id) =>{
setInterval(()=>
    fetch(paginaDolar)
    .then(response => response.json())
    .then(({oficial}) => {

        const valorCuenta = document.getElementById(`valorCuentaPesos${id}`);
        valorCuenta.innerHTML = `<p id="valorCuentaPesos${id}"> $ ${oficial.price*calcularBalance(id)}</p>`;
    
        const valorCuentaPesos = document.getElementById(`valorCuenta${id}`);
        valorCuentaPesos.innerHTML = `<p id="valorCuenta${id}"> USD$ ${calcularBalance(id)}</p>`
    })
    );

}

