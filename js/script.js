let array = [

];

if(localStorage.getItem("newArray") !== null) {
    array = JSON.parse(localStorage.getItem("newArray"));
}

let starter = () => {
    if (array.length == 0) {
        document.querySelector('#watching').insertAdjacentHTML("beforeend", '<p id="empty" class="display-6 text-center">Liste boş</p>');
    }
    else {
        for (let i = 0; i < array.length; i++) {
            let li = 
                `<li class="text-center">
                    <div class='ms-5'>${array[i].name}</div>
                    <div>
                        <button class="btn btn-danger w-40 me-3" onclick='sil(${array[i].id})'>SİL</button>
                        <button class="btn btn-success w-40" onclick='editFirst(${array[i].id})'>EDIT</button>
                    </div>
                </li>`;
            document.querySelector('#watching').insertAdjacentHTML("beforeend", li);
        }
    }
}

starter();

let goruntule = () => {
    for (let i = array.length - 1; i < array.length; i++) {
        let li = 
            `<li class="text-center">
                <div class='ms-5'>${array[i].name}</div>
                <div>
                    <button class="btn btn-danger w-40 me-3" onclick='sil(${array[i].id})'>SİL</button>
                    <button class="btn btn-success w-40" onclick='editFirst(${array[i].id})'>EDIT</button>
                </div>
            </li>`;
        document.querySelector('#watching').insertAdjacentHTML("beforeend", li);
        console.log(array[i].id);
    }
}



let ekle = () => {
    let warn = document.querySelector('#crud form #warn').innerHTML;
    let warningp = document.getElementById('warn');
    let empty = document.getElementById('empty');
    let val = document.querySelector('#crud input').value;

    if (val == "") {
        if (!(warn.includes('girin'))) {
            warningp.innerHTML = "Lütfen bir değer girin";
        }
    }
    else {
        if (array.length == 0) {
            empty.remove();
            array.push({'id': 0, 'name': val})
            if (warn.includes('girin')) {
                warningp.innerHTML = "";
            }
        }
        else {
            array.push({'id': array[array.length - 1].id + 1, 'name': val});
            if (warn.includes('girin') || warn.includes('zaten')) {
                warningp.innerHTML = "";
            }
        }

        for (let i = 0; i < (array.length - 1); i++) {
            if (array[i].name == val) {
                array[array.length - 1].name = `${val}*`;
                warningp.innerHTML = 'Bu değer zaten girilmiş';
            }
        }
        goruntule();
        document.querySelector('#crud input').value = "";
        localStorage.setItem('newArray', JSON.stringify(array));
    }
    }


let sil = (id) => {
    let silId;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            silId = i;
        }
    }
    array.splice(silId,1);
    location.reload();
    localStorage.setItem('newArray', JSON.stringify(array));
}

let deleteAll = () => {
    array.splice(0, array.length);
    location.reload();
    localStorage.setItem('newArray', JSON.stringify(array));
}

let editFirst = (id) => {
    var editId;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            editId = i;
        }
    }
    let newForm = `<input type="text" id="${editId}" class="form-control mt-3">
    <button type='button' class="btn btn-outline-success mt-3 w-100" onclick='editSecond()'>DÜZENLE</button>
    <p id='warn' class='display-6 mt-3 bg-danger text-white'></p>`;
    /* document.querySelector('#crud form input.form-control').value = array[document.querySelector('#crud form input.form-control').id].name; */
    document.querySelector('#crud form').innerHTML = newForm;
}

let editSecond = () => {
    let warn = document.querySelector('#crud form #warn').innerHTML;
    let warningp = document.getElementById('warn');
    let myEditId = parseInt(document.querySelector('#crud form input.form-control').id);
    let newVal = document.getElementById(document.querySelector('#crud form input.form-control').id).value;
    if (newVal == "") {
        if (!(warn.includes('girin'))) {
            warningp.innerHTML = "Lütfen bir değer girin";
        }
    }
    else {
        array.splice(myEditId, 1, {"id": array[myEditId].id, "name": newVal});
        for (let i = 0; i < (array.length - 1); i++) {
            if (array[i].name == newVal) {
                array[myEditId].name = `${newVal}*`;
                warningp.innerHTML = 'Bu değer zaten girilmiş';
            }
        }
        location.reload();
        localStorage.setItem('newArray', JSON.stringify(array));
        if (warn.includes('girin')) {
            warningp.innerHTML = "";
        }
    }
}

