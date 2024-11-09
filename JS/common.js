const addToTeam = document.querySelector('.addToTeam');
const formWrp = document.querySelector('.formWrp')
const form = document.querySelector("#form");
const closeBtn = document.querySelector('.closeBtn');
let fistName = document.getElementById('name');
const cardWrapper = document.querySelector('.cardWrp');

document.addEventListener("DOMContentLoaded", () => {
    populateNewTeamMember();
})

addToTeam.addEventListener("click", () => {
    formWrp.classList.remove('d-none');
})

form?.addEventListener('submit', async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];

    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const base64String = e.target.result;

            const formData = new FormData(form);
            const formDataObject = {};

            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });

            formDataObject.image = base64String;

            const uniqueKey = crypto.randomUUID();
            const currentTime = new Date().toISOString();
            const entry = {
                id: uniqueKey,
                name: formDataObject.name,
                createdAt: currentTime,
                avatar: formDataObject.image,
                memberType: "new-member",
            };

            let storedData = localStorage.getItem('formData');
            let dataArray = storedData ? JSON.parse(storedData) : [];
            dataArray.unshift(entry);
            localStorage.setItem('formData', JSON.stringify(dataArray));
            populateNewTeamMember()
            formWrp.classList.add('d-none');
            form.reset();
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
});

function populateNewTeamMember() {
    let formData = JSON.parse(localStorage.getItem('formData')) ?? [];
    let empData = JSON.parse(localStorage.getItem('emp_data')) ?? [];
    let data = [...formData, ...empData];

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

    cardWrapper.innerHTML = html;

}
cardWrapper.addEventListener('click', function (event) {
    if (event.target && (event.target.classList.contains('delete-member'))) {
        let memberType = event.target.dataset.membertype;
        let currentMember = event.target.parentElement.getAttribute('id');
        deleteMembers(memberType, currentMember);
    }
});

closeBtn?.addEventListener('click', function (ele) {
    ele.target.parentElement.classList.add('d-none')
    form.reset();
    document.getElementById('image').value = "";
})

function deleteMembers(memberType, currentMember) {
    let formData = JSON.parse(localStorage.getItem('formData')) ?? [];
    let employeeData = JSON.parse(localStorage.getItem('emp_data')) ?? [];
    if (!formData && !employeeData) {
        console.log('No data found in localStorage.');
        return;
    }
    if (memberType == "existing-member") {
        let newModifiedData = employeeData.filter(entry => entry.id !== currentMember);
        localStorage.setItem('emp_data', JSON.stringify(newModifiedData));
    } else if (memberType == "new-member") {
        let newFormData = formData.filter(entry => entry.id !== currentMember);
        localStorage.setItem('formData', JSON.stringify(newFormData));
    }
    populateNewTeamMember();
}