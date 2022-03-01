const container = document.getElementById('main');
const phoneDetails = document.getElementById('mobile-details');

const inputButton = document.getElementById('input-button').addEventListener('click', () => {
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
        input.value = '';
    }


})

const phoneDisplay = (phones) => {
    if (phones.length === 0) {
        error.innerText = "No phone found";
        container.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
    const first20 = phones.slice(0, 20);
    first20.forEach(phone => {
        error.innerText = '';
        // console.log(phone)
        const div = document.createElement('div');
        phoneDetails.innerHTML = '';
        div.innerHTML = `
        <div class="col shadow-lg p-3 mb-5 bg-body rounded">
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title text-success">${phone.phone_name}</h5>
                <p class="card-text text-info">${phone.brand}</p>
                <button class="btn btn-primary" onclick="seeDetails('${phone.slug}')">See Details</button>
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    })
}

const seeDetails = (phone) => {
    // console.log(phone)
    fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
        .then(resp => resp.json())
        .then(data => {
            const phoneInfo = data.data;
            // const phoneDetails = document.getElementById('mobile-details');
            console.log(phoneInfo?.name)
            const div = document.createElement('div');
            // main.innerHTML = '';
            phoneDetails.innerHTML = '';
            div.innerHTML = `
                <div class="card mx-auto" style="width: 13rem;">
                    <img width="50px" src="${phoneInfo.image}" class="card-img-top" alt="...">
                    <div>
                        <div class="card-body text-start">
                            <h4 class="text-center text-success">${phoneInfo.name}</h4>
                            <h2 class="text-center text-info">${phoneInfo.brand}</h2>
                            <div class="card-text">
                            <h5>First Release: ${phoneInfo?.releaseDate ? phoneInfo.releaseDate : "No date found"}</h5>
                            <h2 class="text-primary">Performance:</h2>
                            <p>Chipset: ${phoneInfo?.chipSet ? phoneInfo.chipSet : "No date found"}</p>
                            <p>Display: ${phoneInfo?.displaySize ? phoneInfo.displaySize : "No date found"}</p>
                            <p>MicroSD Slot: ${phoneInfo?.mainFeatures?.storage ? phoneInfo.mainFeatures.storage : "No date found"}</p>
                            <h5 class="text-success">Sensors:</h5> 
                            <p>${phoneInfo?.mainFeatures?.sensors ? phoneInfo.mainFeatures.sensors : "No date found"}</p>
                            <h2 class="text-primary">Connectivity:</h2>
                            <p>WLAN: ${phoneInfo?.others?.WLAN ? phoneInfo.others.WLAN : "No date found"}</p>
                            <p>Bluetooth: ${phoneInfo?.others?.Bluetooth ? phoneInfo.others.Bluetooth : "No  date found"}</p>
                            <p>GPS: ${phoneInfo?.others?.GPS ? phoneInfo.others.GPS : "No date found"}</p>
                            <p>Radio: ${phoneInfo?.others?.Radio ? phoneInfo.others.Radio : "No date found"}</p>
                            <p>USB: ${phoneInfo?.others?.USB ? phoneInfo.others.USB : "No date found"}</p>
                            <p>NFC: ${phoneInfo?.others?.NFC ? phoneInfo.others.NFC : "No date found"}</p>
                        </div>
                        </div>
                    </div>
                </div>
                `;
            phoneDetails.appendChild(div);
        })
}




