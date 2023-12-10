document.getElementById('queryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    
    // 显示加载提示信息
    var loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';

    // 禁用提交按钮
    var submitButton = document.querySelector('input[type="submit"]');
    submitButton.disabled = true;    


    var apiKey = document.getElementById('api_key').value;
    var query = document.getElementById('query').value;

    fetch('https://1wj7134184.iok.la/query', {
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
        // 隐藏加载提示信息并启用按钮
        loadingMessage.style.display = 'none';
        submitButton.disabled = false;
    })
    .catch((error) => {
        console.error('Error:', error);        
        // 发生错误时也要隐藏提示信息并启用按钮
        loadingMessage.style.display = 'none';
        submitButton.disabled = false;
    });
});

function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // 清除旧的结果

    var visualResults = data.visual;
    var logicalResults = data.logical;

    // 创建和显示视觉相似度结果的超链接
    if (visualResults.length > 0) {
        var visualHeader = document.createElement('h2');
        visualHeader.textContent = '视觉相似度查询结果：';
        resultsDiv.appendChild(visualHeader);

        var visualList = document.createElement('ul');
        visualResults.forEach(function(url) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = url;  // 设置超链接的 URL
            link.textContent = url;  // 设置链接显示的文本
            link.target = '_blank';  // 设置链接在新窗口中打开
            listItem.appendChild(link);
            visualList.appendChild(listItem);
        });
        resultsDiv.appendChild(visualList);
    }

    // 创建和显示逻辑相似度结果的超链接
    if (logicalResults.length > 0) {
        var logicalHeader = document.createElement('h2');
        logicalHeader.textContent = '逻辑相似度查询结果：';
        resultsDiv.appendChild(logicalHeader);

        var logicalList = document.createElement('ul');
        logicalResults.forEach(function(url) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = url;  // 设置超链接的 URL
            link.textContent = url;  // 设置链接显示的文本
            link.target = '_blank';  // 设置链接在新窗口中打开
            listItem.appendChild(link);
            logicalList.appendChild(listItem);
        });
        resultsDiv.appendChild(logicalList);
    }
}