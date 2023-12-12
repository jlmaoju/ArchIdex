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

function adjustLayout() {
    const leftSection = document.querySelector('.left-section');
    const rightSection = document.querySelector('.right-section');

    leftSection.style.flex = '0.5';
    rightSection.style.flex = '2';
}

function displayExplanation(text) {
    const explanationContainer = document.querySelector('.left-section');
    explanationContainer.innerHTML = ''; // 清空现有内容

    let index = 0;
    let tagOpen = false; // 是否在HTML标签内

    const interval = setInterval(() => {
        if (index < text.length) {
            let char = text.charAt(index);
            // 检查是否遇到了HTML标签
            if (char === '<') tagOpen = true;
            if (char === '>') tagOpen = false;

            explanationContainer.innerHTML += char;

            // 如果不在HTML标签内，则正常逐字显示；如果在标签内，则继续直到标签闭合
            if (!tagOpen || char === '>') {
                index++;
            }
        } else {
            clearInterval(interval);
        }
    }, 50); // 每50毫秒添加一个字符
}


function displayQueryResults(projectUrls, imageUrls) {
    if (projectUrls && imageUrls && projectUrls.length === imageUrls.length) {
        projectUrls.forEach(function(projectUrl, index) {
            var img = document.createElement('img');
            img.src = imageUrls[index];
            img.className = 'grid-image'; // 使用 CSS 类来控制样式

            // 添加点击事件，当点击图片时，在新窗口打开对应的项目网页
            img.onclick = function() {
                window.open(projectUrl, '_blank');
            };

            document.querySelector('.right-section').appendChild(img);
        });
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}



function displayResults(data) {
    // 清空既有内容
    // document.querySelector('.left-section').innerHTML = '';
    document.querySelector('.right-section').innerHTML = '';

    // // 处理图片和项目网页 URL
    // var images = data.images;
    // var projectUrls = data.visual; // 获取项目网页 URL 数组

    // if (images && images.length > 0) {
    //     images.forEach(function(imageUrl, index) {
    //         var img = document.createElement('img');
    //         img.src = imageUrl;
    //         img.className = 'grid-image'; // 使用 CSS 类来控制样式

    //         // 添加点击事件，当点击图片时，在新窗口打开对应的项目网页
    //         if (projectUrls && projectUrls[index]) {
    //             img.onclick = function() {
    //                 window.open(projectUrls[index], '_blank');
    //             };
    //         }

    //         document.querySelector('.right-section').appendChild(img);
    //     });
    // }

    // 处理视觉查询结果
    displayQueryResults(data.visual, data.images);

    // 处理逻辑查询结果
    displayQueryResults(data.logical, data.L_images);    

    // // 处理解释性文字
    // var explanationText = "1. 关键信息提取：该项目名为..."; // 示例文本
    // if (explanationText) {
    //     displayExplanation(explanationText);
    // }

    var query = document.getElementById('query').value;
    var escapedQuery = escapeHTML(query);


    // 使用模板字符串嵌入变量
    var explanationText = `久等啦！<br>关于<strong>${escapedQuery}</strong>这件事情，<br>
    我从还比较有限的记忆中找到了一些关相关的案例，<br>
    列在了右侧。<br><br>

    这里面有些是单纯因为想起了这个画面，<br>
    有些则是我确实记得这个项目里有类似的问题和设计逻辑。<br>
    说不太好，不过我相信这些案例多多少少一定可以帮到你的。<br><br>
    
    另外，我的阅历还在增长中，<br>
    如果这些案例中没有你想要的，<br>
    请给我点成长的时间，我会继续努力~<br><br>

    （开始下一次查询请直接刷新网页）
    `;
    const explanationContainer = document.querySelector('.left-section');
    explanationContainer.innerHTML = explanationText;



    // 调整布局
    adjustLayout();
}

    if (images.length > 0) {
        var imagesContainer = document.createElement('div');
        images.forEach(function(imageUrl) {
            var img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '100px'; // 调整尺寸
            img.style.height = 'auto';
            img.style.margin = '5px';
            imagesContainer.appendChild(img);

            // // 鼠标悬停效果
            // img.onmouseover = () => img.style.opacity = '0.7';
            // img.onmouseout = () => img.style.opacity = '1';
        });
        document.querySelector('.right-section').appendChild(imagesContainer);
    }
    displayExplanation(explanationText);
