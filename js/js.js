const container = document.getElementById('main');
const phoneDetails = document.getElementById('mobile-details');
const inputButton = document.getElementById('input-button').addEventListener('click', phone => {
    const input = document.getElementById('input-field');
    const inputField = input.value;
    // const phone = ['iphone' && 'samsung']

    if (!isNaN(input.value) || inputField == "") {
        alert("please inter a phone name");
    }
    // else if (!phone) {
    //     alert('please inter a phone name')
    // }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${input.value}`)
            .then(resp => resp.json())
            .then(data => phoneDisplay(data.data))
    }


})

const phoneDisplay = (phones) => {
    if (phones.length === 0) {
        alert('hoto')
    }
    const first20 = phones.slice(0, 20);
    for (const phone of first20) {
        // console.log(phone)
        const div = document.createElement('div');
        const phoneSlug = phone.slug;
        phoneDetails.innerHTML = '';
        div.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="seeDetails('${phone.slug}')">See Details</button>
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    }
}

const seeDetails = (phone) => {
    // console.log(phone)
    fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
        .then(resp => resp.json())
        .then(data => {
            const allPhone = data.data;
            console.log(allPhone.others)
            const div = document.createElement('div');
            main.innerHTML = '';
            div.innerHTML = `
                <div class="card mx-auto" style="width: 18rem;">
                    <img src="${allPhone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">Sensors: ${allPhone.mainFeatures.sensors}</p>
                        <div class="card-text">
                        Other: 
                        <h6>Bluetooth:${allPhone.others.Bluetooth}</h6>
                        <h6>GPS:${allPhone.others.GPS}</h6>
                        <h6>NFC:${allPhone.others.NFC}</h6>
                        <h6>Radio:${allPhone.others.Radio}</h6>
                        <h6>USB:${allPhone.others.USB}</h6>
                        <h6>WLAN:${allPhone.others.WLAN}</h6>
                        </div>

                    </div>
                </div>
            `;
            phoneDetails.appendChild(div);
        })
}

