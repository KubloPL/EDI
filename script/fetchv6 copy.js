document.addEventListener('DOMContentLoaded', async () => {
  let data = [];
  let currentPage = 1;
  const perPage = 10;

  const fetchAndDisplayData = async () => {
    try {
      const response = await fetch('https://api.mockaroo.com/api/1edbb1e0?count=1000&key=f8ab4540');
      data = await response.json();
      displayData(currentPage);
      renderPieChart();
      createStackedBarChart();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const displayData = (page) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentPageData = data.slice(startIndex, endIndex);

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    currentPageData.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.breach_id}</td>
        <td>${entry.breach_data}</td>
        <td>${entry.company_name}</td>
        <td>${entry.employee_count}</td>
        <td>${entry.affected_customers}</td>
        <td>${entry.data_type}</td>
        <td>${entry.data_stolen}</td>
        <td>${entry.attack_type}</td>
        <td>${entry.attack_vector}</td>
        <td>${entry.response_time}</td>
        <td>${entry.response_cost}</td>
        <td>${entry.notification_method}</td>
        <td>${entry.investigation_status}</td>
        <td>${entry.breach_location}</td>
        <td>${entry.breach_country}</td>
      `;
      tableBody.appendChild(row);
    });

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = page === 1;
    nextBtn.disabled = endIndex >= data.length;
  };

  const createStackedBarChart = () => {
    const breachesByIndustry = {};

    data.forEach(entry => {
      const industry = entry.industry;
      const breachType = entry.breach_type;

      if (!breachesByIndustry[industry]) {
        breachesByIndustry[industry] = {};
      }

      if (!breachesByIndustry[industry][breachType]) {
        breachesByIndustry[industry][breachType] = 1;
      } else {
        breachesByIndustry[industry][breachType]++;
      }
    });

    const labels = Object.keys(breachesByIndustry);
    const datasets = Object.keys(data.reduce((acc, entry) => ({ ...acc, [entry.breach_type]: true }), {})).map(breachType => ({
      label: breachType,
      data: labels.map(industry => breachesByIndustry[industry][breachType] || 0),
    }));

    const ctx = document.getElementById('stackedBarChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets.map((dataset, index) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: `hsla(${(index * 50) % 360}, 70%, 50%, 0.8)`, // Adjust color as needed
        })),
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });
  };

  const renderPieChart = () => {
    const breachTypeCounts = countBreachTypes(data);
    const labels = Object.keys(breachTypeCounts);
    const counts = Object.values(breachTypeCounts);

    const ctx = document.getElementById('breachPieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Breach Types',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            // Add more colors as needed
          ],
        }],
      },
    });
  };

  const countBreachTypes = (data) => {
    const counts = {};
    data.forEach(entry => {
      const type = entry.attack_type;
      if (counts[type]) {
        counts[type]++;
      } else {
        counts[type] = 1;
      }
    });
    return counts;
  };

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayData(currentPage);
    }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil(data.length / perPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayData(currentPage);
    }
  });

  fetchAndDisplayData();
});
