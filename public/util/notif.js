const showNotif = (txt) => {
    $('body').append(`<div class="notif"> 
        <img class="notif-img" src="../img/info.png" />
        <div class="txt-holder">
        <span class="notif-txt"> ${txt} </span>
        </div>
    </div>`);    

    setTimeout( () => {
        $('.notif').remove()
    }, 7000);
}