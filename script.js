document.getElementById('queryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var apiKey = document.getElementById('api_key').value;
    var query = document.getElementById('query').value;

    fetch('http://localhost:5000/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: apiKey,
            query: query,
            V_csv_file_path: 'A:\\RISE\\LLM-Archi Dev\\C_Image_Vision\\4_Embedding\\3_Embedding\\Getered_embd.csv',  
            L_csv_file_path: 'A:\\RISE\\LLM-Archi Dev\\B_Case_Study\\Content_csv\\TestRun2\\Content\\4_向量.csv',  
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        displayResults(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    var visualResults = data.visual;
    var logicalResults = data.logical;

    if (visualResults.length > 0) {
        var visualHeader = document.createElement('h2');
        visualHeader.textContent = '视觉相似度查询结果：';
        resultsDiv.appendChild(visualHeader);

        var visualList = document.createElement('ul');
        visualResults.forEach(function(result) {
            var listItem = document.createElement('li');
            listItem.textContent = result;
            visualList.appendChild(listItem);
        });
        resultsDiv.appendChild(visualList);
    }

    if (logicalResults.length > 0) {
        var logicalHeader = document.createElement('h2');
        logicalHeader.textContent = '逻辑相似度查询结果：';
        resultsDiv.appendChild(logicalHeader);

        var logicalList = document.createElement('ul');
        logicalResults.forEach(function(result) {
            var listItem = document.createElement('li');
            listItem.textContent = result;
            logicalList.appendChild(listItem);
        });
        resultsDiv.appendChild(logicalList);
    }
}
