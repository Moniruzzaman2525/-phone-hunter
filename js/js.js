const container = document.getElementById('main');
const phoneDetails = document.getElementById('mobile-details');
const inputButton = document.getElementById('input-button').addEventListener('click', phone => {
    const input = document.getElementById('input-field');
    const error = document.getElementById('error');
    const inputField = input.value;
    // const phone = ['iphone' && 'samsung']

    if (!isNaN(input.value) || inputField == "") {
        error.innerText = "please inter a some phone names";
        container.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
    // else if (!phone) {
    //     alert('please inter a phone name')
    // }
    else {
        main.innerHTML = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${input.value}`)
            .then(resp => resp.json())
            .then(data => phoneDisplay(data.data))
    }


})

const phoneDisplay = (phones) => {
    if (phones.length === 0) {
        error.innerText = "Please enter a phone name";
        container.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
    const first20 = phones.slice(0, 20);
    for (const phone of first20) {
        error.innerText = '';
        // console.log(phone)
        const div = document.createElement('div');
        phoneDetails.innerHTML = '';
        div.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button class="btn btn-primary" onclick="seeDetails('${phone.slug}')">See Details</button>
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
            const phoneInfo = data.data;
            // const phoneDetails = document.getElementById('mobile-details');
            console.log(phoneInfo)
            console.log(phoneInfo?.releaseDate)
            const div = document.createElement('div');
            main.innerHTML = '';
            div.innerHTML = `
                <div class="card mx-auto" style="width: 20rem;">
                    <img src="${phoneInfo.image}" class="card-img-top" alt="...">
                    <div class="card-body text-start">
                        <h2 class="text-center text-success">${phoneInfo.brand}</h2>
                        <h2 class="text-center text-success">${phoneInfo.name}</h2>
                        <div class="card-text">
                        <h5>First Release: ${phoneInfo.releaseDate ? phoneInfo.releaseDate : "No release date found"}</h5>
                        <h2>Connectivity</h2>
                        <p>WLAN: ${phoneInfo.others.WLAN}</p>
                        <p>Bluetooth: ${phoneInfo.others.Bluetooth}</p>
                        <p>GPS: ${phoneInfo.others.GPS}</p>
                        <p>Radio: ${phoneInfo.others.Radio}</p>
                        <p>USB: ${phoneInfo.others.USB}</p>
                        <p>NFC: ${phoneInfo.others.NFC}</p>
                        <p>WLAN: ${phoneInfo.name}</p>
                        <h2>Performance</h2>
                        <p>Chipset: ${phoneInfo.mainFeatures.chipSet}</p>
                        <p>Display: ${phoneInfo.mainFeatures.displaySize}</p>
                        <p>MicroSD Slot: ${phoneInfo.mainFeatures.storage}</p>
                        <p>Chipset: ${phoneInfo.mainFeatures.sensors}</p>
                    </div>
                    </div>
                </div>
                `;
            phoneDetails.appendChild(div);
        })
}




