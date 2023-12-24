document.getElementById('queryForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // 显示加载提示信息
    var loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';

    // 禁用提交按钮
    var submitButton = document.querySelector('input[type="submit"]');
    submitButton.disabled = true;    

    // Retrieve the api_key and query from the form
    var apiKey = document.getElementById('api_key').value;
    var query = document.getElementById('query').value;

    // Adjust this fetch URL to your actual app.py endpoint
    fetch('https://1wj7134184.iok.la/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: apiKey,
            query: query,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        displayResults(data); // Implement this function to handle and display the results
        loadingMessage.style.display = 'none';
        submitButton.disabled = false;
    })
    .catch((error) => {
        console.error('Error:', error);        
        loadingMessage.style.display = 'none';
        submitButton.disabled = false;
    });
});

// function displayResults(data) {
//     var resultsContainer = document.getElementById('results');
//     resultsContainer.innerHTML = ''; // Clear previous results

//     // Assuming the API returns a string message as a response
//     var responseElement = document.createElement('p');
//     responseElement.textContent = data.message; // Adjust according to the actual response structure
//     resultsContainer.appendChild(responseElement);

//     // TODO: Add more comprehensive result handling and display here
// }


function displayResults(data) {
    var resultsContainer = document.getElementById('results');
    // 直接将返回的 HTML 字符串设置为 resultsContainer 的内容
    resultsContainer.innerHTML = data.html_content;
}