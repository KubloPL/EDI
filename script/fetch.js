    // Function to fetch data from the API
    fetch('https://my.api.mockaroo.com/swieczki.json?key=e8c704d0')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('dataTable');

    data.forEach(item => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${item.breach_id}</td>
        <td>${item.breach_date}</td>
        <td>${item.company_name}</td>
        <td>${item.industry}</td>
        <td>${item.employee_count}</td>
        <td>${item.affected_customers}</td>
        <td>${item.data_stolen}</td>
        <td>${item.attack_type}</td>
        <td>${item.attack_vector}</td>
        <td>${item.response_time}</td>
        <td>${item.response_cost}</td>
        <td>${item.notification_method}</td>
        <td>${item.investigation_status}</td>
        <td>${item.breach_location}</td>
        <td>${item.breach_country}</td>
        <td>${item.breach_impact}</td>
      `;
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
  });