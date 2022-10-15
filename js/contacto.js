function changeForm(value){

    if(value.checked){
        //Agregar los cosos
        var inner_html = ` <container id="turnos">
        <div class="input-group mb-3" id="dias">
            <container class="me-3">
                <input class="form-check-input" type="checkbox" name="Lunes" id="lunes">
                <label class="form-check-label" for="lunes">
                    Lunes
                </label>
            </container>
            <container class="me-3">
                <input  class="form-check-input" type="checkbox" name="Martes" id="martes">
                <label class="form-check-label" for="martes">
                    Martes
                </label>
            </container>
            <container class="me-3">
                <input class="form-check-input" type="checkbox" name="Miercoles" id="miercoles">
                <label class="form-check-label" for="miercoles">
                    Miercoles
                </label>
            </container>
            <container class="me-3">
                <input class="form-check-input" type="checkbox" name="Jueves" id="jueves">
                <label class="form-check-label" for="jueves">
                    Jueves
                </label>
            </container>
            <container class="me-3">
                <input class="form-check-input" type="checkbox" name="Viernes" id="viernes">
                <label class="form-check-label" for="viernes">
                    Viernes
                </label>
            </container>
            <container class="me-3">
                <input class="form-check-input" type="checkbox" name="Sabado" id="sabado">
                <label class="form-check-label" for="sabado">
                    Sabado
                </label>
            </container>

        </div>

         <div class="mb-3" id="opciones" >
            <select class="form-select"  name="Horario" id="hora" >
                <option value="" >Horarios Disponibles</option>
                <option value="8 a 10">8am-10am</option>
                <option value="10 a 12">10am-12pm</option>
                <option value="13 a 15">1pm-3pm</option>
                <option value="15 a 17">3pm-5pm</option>
                <option value="17 a 19">5pm-7pm</option>

              </select>
        </div> 
     </container> 
    `
        document.getElementById('checkbox').insertAdjacentHTML('afterend', inner_html)

    }else{
       document.getElementById('turnos').remove()
    
    }
}

async function handleSubmit(event)
{
    event.preventDefault();
    var isValid = validateForm();
    if (!isValid){
        return;
    }
    var form = document.getElementById('contactForm');
    var data = new FormData(event.target);
    
    console.log(data)
    var response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      })
    if(response.ok){
        alert('Gracias por contactarnos!')
        this.reset();
        changeForm(document.contactForm.check);
       
       
    }else{
        alert('Hubo un error, intente mas tarde.')
    }

}
document.getElementById('contactForm').addEventListener("submit", handleSubmit)


function validateForm(){
    //form name=contactForm
    //input id=name
    //asi validas los datos
    //Por cada input le pones un id y escribiendo document.contactForm.{id}
    //tenes el elemento y te fijas que validas
    // Buscar la validacion email -> regex formato o buscar como validar email
    //Le agregas la clase error y un elemenot con un id=error{id}
    // Y lo eliminas antes del if
    var isValid = true;
    document.getElementById('errorName')?.remove();

    if (document.contactForm.name.value.length == 0) {
        //alert("Ingresa tu nombre.")
        //document.contactForm.name.focus()
        document.getElementById('name').classList.add("error")
        document.getElementById('name').insertAdjacentHTML('afterend', `<p class="error-text" id="errorName">Debe insertar su nombre</p>`)
        isValid = false;
    }else{
        document.getElementById('name').classList.remove('error')
    }

    document.getElementById('errorEmail')?.remove()
    //document.getElementById('errorEmail2')?.remove()
    if (document.contactForm.email.value.length == 0) {

        document.getElementById('email').classList.add("error")
        document.getElementById('email').insertAdjacentHTML('afterend', `<p class="error-text" id="errorEmail">Debe insertar su correo</p>`)
        isValid = false;
    }else{
        document.getElementById('email').classList.remove('error')
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (document.contactForm.email.value.match(validRegex)) { 
            document.getElementById('email').classList.remove('error')
        }else{
            isValid = false;
            document.getElementById('email').classList.add("error")
            document.getElementById('email').insertAdjacentHTML('afterend', `<p class="error-text" id="errorEmail">Formato del correo invalido</p>`)
        
        }
    }
    //Esto solo si el turnos estan en true document.contactForm.check.checked
    // console.log(document.contactForm.check.checked)
    // console.log(document.contactForm.hora.value)
    //Para la hora sea valida que el value sea distinto a vacio != "" or .lenght >0
    //Para los dias que alguno este cheked
    document.getElementById('errorDay')?.remove()
    document.getElementById('errorTime')?.remove()

    if(document.contactForm.check.checked){
        var lunes = document.contactForm.lunes.checked;
        var martes = document.contactForm.martes.checked;
        var miercoles = document.contactForm.miercoles.checked;
        var jueves = document.contactForm.jueves.checked;
        var viernes = document.contactForm.viernes.checked;
        var sabado = document.contactForm.sabado.checked;
        if(!lunes && !martes && !miercoles && !jueves && !viernes && !sabado){
            //Ninguna esta checked!!
            isValid = false;
            document.getElementById('hora').insertAdjacentHTML('afterend', `<p class="error-text" id="errorDay">Debe elegir al menos un día</p>`)
        }
        if(document.contactForm.hora.value.length == 0){
            isValid = false;
            document.getElementById('hora').insertAdjacentHTML('afterend', `<p class="error-text" id="errorTime">Debe elegir algun horario</p>`)

        }
    }

    //Si no se seleciono el boton de sacar turno el mensaje no puede estar vacio
    document.getElementById('errorMessage')?.remove();

    if(!document.contactForm.check.checked){

        if (document.contactForm.mensaje.value.length == 0) {
            //alert("Ingresa tu nombre.")
            //document.contactForm.name.focus()
            isValid = false;
            document.getElementById('mensaje').classList.add("error")
            document.getElementById('mensaje').insertAdjacentHTML('afterend', `<p class="error-text" id="errorMessage">Su mensaje esta en blanco!</p>`)
            
        }else{
            document.getElementById('mensaje').classList.remove('error')
        }
    }else{
        document.getElementById('mensaje').classList.remove('error')

    }

    //Agregar un spinner al boton de enviar
    //desabilitar el boton mientras haces la validacion
    //desabilitarlo cuando entras a la funcion y antes de irte volver a habilitarlo
    return isValid;
}



