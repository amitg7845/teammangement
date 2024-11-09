
populateNewTeamMember();


function populateNewTeamMember() {
    const cardWrapper = document.querySelector('.cardWrp');
    let data = JSON.parse(localStorage.getItem('formData')) ?? [];;
    if (!cardWrapper) {
        console.error('Element with id "cardWrapper" not found');
        return;
    }

    let html = "";

    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const imageSrc = element.avatar ? element.avatar : '/img/dogs3.jpeg';
            html += `
            <div class="card-crossBtn-wrp">
                <div class="card" id="${element.id}">
                    ${imageSrc ? `<img src="${imageSrc}" onerror="this.onerror=null; this.src='/img/dogs3.jpeg';" class="image" alt="avatar">` : ''}
                    <div class="name">${element.name}</div>
                    <img src="/img/icons8-cancel-50.png" data-memberType = ${element?.memberType || 'existing-member'} class="delete-member" alt="delete" srcset="">
                </div>
            </div>`;
        }
    } else {
        console.error('Data is not an array');
    }

    console.log(html);
    cardWrapper.innerHTML = html;
}