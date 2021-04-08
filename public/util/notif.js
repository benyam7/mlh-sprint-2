const showNotif = () => {
    $('body').append(`<div class="notif"> 
        <span> Notif text here </span>
    </div>`);    

    setTimeout( () => {
        $('.notif').remove()
    }, 3000);
}