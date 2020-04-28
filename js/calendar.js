
// localStorage.token = 'token1';

document.addEventListener('DOMContentLoaded', function() {
  console.log('primer');
  
  document.getElementById('agregarbtnfechamodal').addEventListener('click', function(){

    // console.log(document.getElementById('dateInicioagregar').value);
    // console.log(document.getElementById('dateInicioagregar').value.length);
    // console.log(document.getElementById('horaInicioagregar').value);

    let title = document.getElementById('tituloagregar').value;
    let descripcion = document.getElementById('descripcionagregar').value;

    let dia_inicio = document.getElementById('dateInicioagregar').value;
    let hora_inicio = document.getElementById('horaInicioagregar').value;

    let dia_fin = document.getElementById('dateFinalagregar').value;
    let hora_fin = document.getElementById('horaFinalagregar').value;

    let url = document.getElementById('urlagregar').value;


    if( title.length < 1 ){ alert('Debe de tener un título'); return;}
    if( dia_inicio < 10 ){ alert('Debe de tener una fecha de inicio'); return;}
    

    console.table({
      title,
      dia_inicio,
      hora_inicio,
      dia_fin,
      hora_fin,
      descripcion,
      url
    });

  
    calendar.addEvent({    
      title: title,
      start: `${dia_inicio}T${hora_inicio}`,
      end: `${(dia_fin < 1) ? dia_inicio : dia_fin}T${hora_fin}`,
      descripcion: descripcion,
      status: 'pendiente',
      image: url+''
    });

    fetch('http://localhost:3000/data?userid='+(localStorage.token[localStorage.token.length -1]), {
      method: 'GET'
    }).then( res => res.json())
    .then( data => {

      console.log('-------------------');
      console.log(data);
      console.log(data[ parseInt(localStorage.token[localStorage.token.length - 1]) - 1 ]);
      
      // data[ parseInt(localStorage.token[localStorage.token.length - 1]) - 1 ].data.push({
      data[ 0 ].data.push({
        title: title,
        start: (dia_inicio+'T'+hora_inicio),
        end: (`${(dia_fin < 1) ? dia_inicio : dia_fin}T${hora_fin}`),
        extendedProps: {
          descripcion: descripcion,
          status: 'pendiente',
          image: url+''
          }
        });

      console.log(data);
      console.log('-------------------');
        

      fetch('http://localhost:3000/data', {
        headers: {
          'content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then( status => {console.log(status)});
        
        
      
    });

    console.log(calendar.getEvents());
  });


});

// localStorage.token += 'token1';
// localStorage.token = '';
console.log(localStorage.token);

let calendar;

// Revisa la sesion
fetch('http://localhost:3000/users?token='+localStorage.token, {
      method: 'GET'
  })
  .then( res => res.json())
  .then( users => {

    if(users.length > 0){
      document.getElementById('navbaruser').innerText = users[0].user;
      document.getElementById('navbarlogin').hidden = true;
      document.getElementById('navbarsignin').hidden = true;
      document.getElementById('navbarlogout').hidden = false;
      console.log('users:');
      console.log(users);
      loadCalendarData(users[0].userid);
    }else{
      document.getElementById('navbaruser').hidden = true;
      document.getElementById('navbarlogin').hidden = false;
      document.getElementById('navbarsignin').hidden = false;
      document.getElementById('navbarlogout').hidden = true;
    }
    
    console.log(localStorage.token);
    console.log('promise');
    console.log(users);
});

function loadCalendarData(userid){

  let calendarEl = document.getElementById('calendar');

  fetch('http://localhost:3000/data?userid='+userid, {
      method: 'GET'
  })
  .then( res => res.json())
  .then( data => {

    console.log('data');
    console.log(data);
    console.log(userid);

    calendar = new FullCalendar.Calendar( calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      footer: {
        right: 'AgregarEventoBtn'
      },
      defaultDate: Date.now(),
      navLinks: true,
      businessHours: true,
      editable: true,
      events: data[0].data,
  
      eventClick: function(info) {
  
        let container = document.getElementById('detail-content');
  
        container.innerHTML = 
        `<h4>${info.event.title}</h4>
        <p>status: ${info.event.extendedProps.status}<p>
        <p>Fecha de inicio: ${info.event.start}</p>
        ${(info.event.end != undefined) ? `<p>Fecha de fin: ${info.event.end} </p>` : '' }
        ${ (info.event.extendedProps.descripcion.length > 1) ? `<p>descripcion: ${info.event.extendedProps.descripcion}</p>` : '' }
        ${(info.event.extendedProps.image.length > 1) ? `<img src="${info.event.extendedProps.image}" alt="eventimage" height=auto width=100%>` : `` }
        <br>
        <button type="button" class="btn btn-info" id="editarstatus">Cambiar status</button>
        <button type="button" class="btn btn-warning" id="editarEvento">Editar</button>
        <button type="button" class="btn btn-danger" id="eliminarEvento">Eliminar</button>`;
        
        // change the border color just for fun
        // ${(info.event.url.length > 1) ? `<img src="${info.event.url}" alt="eventimage" height=auto width=100%>` : `` }
        info.el.style.borderColor = 'red';
        console.log('im showing details');
      },
  
      customButtons: {
        AgregarEventoBtn: {
            text: "Agregar evento",
            click:function()
            {
              //   alert("agregarbtn");
                $('#modelId').modal('toggle');  
            }
        }
      }
  
    });

    console.table(data.data);

    calendar.render();

  });
}





// logout function
function logout(){
  localStorage.token = '';
  location.reload();
}

function updateDataServer( data ){

}









/*document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      footer: {
          right: 'AgregarEventoBtn'
      },
      defaultDate: Date.now(),//'2020-02-12',
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: true,
      events: [
        {
          title: 'Business Lunch',
          start: '2020-02-03T13:00:00',
          constraint: 'businessHours'
        },
        {
          title: 'Meeting',
          start: '2020-02-13T11:00:00',
          constraint: 'availableForMeeting', // defined below
          color: '#257e4a'
        },
        {
          title: 'Conference',
          start: '2020-02-18',
          end: '2020-02-20'
        },
        {
          title: 'Party',
          start: '2020-02-29T20:00:00'
        },

        // areas where "Meeting" must be dropped
        {
          groupId: 'availableForMeeting',
          start: '2020-02-11T10:00:00',
          end: '2020-02-11T16:00:00',
          rendering: 'background'
        },
        {
          groupId: 'availableForMeeting',
          start: '2020-02-13T10:00:00',
          end: '2020-02-13T16:00:00',
          rendering: 'background'
        },

        // red areas where no events can be dropped
        {
          start: '2020-02-24',
          end: '2020-02-28',
          overlap: false,
          rendering: 'background',
          color: '#ff9f89'
        },
        {
          start: '2020-02-06',
          end: '2020-02-08',
          overlap: false,
          rendering: 'background',
          color: '#ff9f89'
        }
      ],

      customButtons: {
          AgregarEventoBtn: {
              text: "Agregar evento",
              click:function()
              {
                //   alert("agregarbtn");
                  $('#modelId').modal('toggle');
                  
              }
          }
      }

    });

    calendar.render();

    calendar.addEvent({
      title: 'dynamic event',
      start: '2020-04-23T13:00:00',
      end: '2020-04-23T14:00:00',
      allDay: false
    });

    calendar.render();
  });*/