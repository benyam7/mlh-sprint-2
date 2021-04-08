
const showBox = (ref ) => {

    let json = $.ajax({
      url: `../assets/jsons/${ref}.json`,
      dataType: "json",
      async: false,
    }).responseJSON;

    let img_file = `../assets/boxes/${json['img']}`
    let txt = json["text"]

    $('body').append(`<div class="box"> <div class="top-div"> <img class="brand-img" src="${img_file}" /> <p class="brand-p">
    ${txt}
    </p>  </div>
    <div class="btm-div">
    <button class="btm-btn" onclick="$(\'.box\').remove();">Continue</button>
    </div> </div>`);    
}
