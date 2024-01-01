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
        displayResults(data, query); // Pass the query to the display function
        loadingMessage.style.display = 'none';
        submitButton.disabled = false;
    })
    .catch((error) => {
        console.error('Error:', error);
        loadingMessage.style.display = 'none';
        submitButton.disabled = false;
    });
});

function displayResults(data, userQuery) {
    var resultsContainer = document.getElementById('results');
    var userQueryContainer = document.getElementById('userQuery');
    var summaryContainer = document.getElementById('summary');

    // Clear previous results
    resultsContainer.innerHTML = '';
    userQueryContainer.innerHTML = '';
    summaryContainer.innerHTML = '';

    // Set user query
    userQueryContainer.textContent = `查询: ${userQuery}`;

    // Display the summary description
    var concludingCompendium = document.createElement('p');
    concludingCompendium.innerHTML = data.concluding_compendium.replace(/\n/g, '<br>');
    summaryContainer.appendChild(concludingCompendium);

    // Check if the projects array exists and is not empty
    if (data.projects && data.projects.length > 0) {
        data.projects.forEach(function(project, index) {
            console.log(`Creating element for project ${index}:`, project);

            var projectElement = document.createElement('div');
            projectElement.className = 'project';

            // 创建一个包含图像的新 div
            var bgImageContainer = document.createElement('div');
            bgImageContainer.style.position = 'relative';
            bgImageContainer.style.height = '200px';
            bgImageContainer.style.overflow = 'hidden';

            // JavaScript中创建背景图片div的部分
            var bgImage = document.createElement('div');
            bgImage.style.backgroundImage = 'url(' + project.image_url + ')';
            bgImage.style.backgroundSize = 'cover';
            bgImage.style.backgroundPosition = 'center';
            bgImage.style.height = '200px'; // 确保这与`.project`的高度相同
            bgImage.style.width = '100%'; // 确保这覆盖整个`.project`
            bgImage.style.position = 'absolute';
            bgImage.style.top = '0';
            bgImage.style.left = '0';
            bgImage.style.opacity = '0.5'; // 半透明效果
            // 不要设置 z-index 或者设置为一个低于 `.project-info` 的正数


            // 将背景图像 div 添加到容器中
            bgImageContainer.appendChild(bgImage);

            // 添加鼠标悬停效果
            bgImageContainer.addEventListener('mouseenter', function() {
                bgImage.style.transform = 'scale(1.1)';
                bgImage.style.opacity = '1';
                bgImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            });
            bgImageContainer.addEventListener('mouseleave', function() {
                bgImage.style.transform = 'scale(1)';
                bgImage.style.opacity = '0.5';
            });
            

            // 然后将 bgImageContainer 添加到您的项目元素中
            projectElement.appendChild(bgImageContainer);

            

            var projectInfo = document.createElement('div');
            projectInfo.className = 'project-info';

            var titleElement = document.createElement('div');
            titleElement.className = 'project-title';
            titleElement.textContent = project.name;

            var descriptionElement = document.createElement('div');
            descriptionElement.className = 'project-description';
            descriptionElement.textContent = project.description;

            // Wrap image and text in a link
            var linkElement = document.createElement('a');
            linkElement.href = project.hyperlink;
            linkElement.target = "_blank";
            linkElement.appendChild(bgImage);
            linkElement.appendChild(projectInfo);
            projectInfo.appendChild(titleElement);
            projectInfo.appendChild(descriptionElement);

            projectElement.appendChild(linkElement);
            resultsContainer.appendChild(projectElement);

            console.log(`Project element for ${index} added to the DOM.`);
        });
    } else {
        console.log('No projects to display');
    }
}
