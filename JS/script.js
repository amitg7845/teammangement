let html = "";

async function getEmployeeDetails() {
    try {
        const response = await fetch('https://teknopointstaging.com/api/mock/users.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching employee details:', error);
    }
}

async function showData() {
    try {
        let empData = JSON.parse(localStorage.getItem("emp_data"));
        if (!empData || empData.length == 0) {
            const data = await getEmployeeDetails();
          let response = data.items;
            localStorage.setItem("emp_data", JSON.stringify(response));
        }
        populateNewTeamMember();
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

showData();