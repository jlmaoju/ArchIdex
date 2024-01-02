// 有哪些方法可以让建筑的使用者在设计阶段就参与进来？

document.addEventListener('DOMContentLoaded', function() {
    let queryInput = document.querySelector('#query');
    let prompts = ["如何设计一个能够灵活适应多种教学形式的教学空间？",
                    "如何设计公共厕所？", 
                    "一个位于山上的酒店建筑，如何能够最大限度利用景色，让它可以看到不同角度不同样的景致？",
                    "如何能够在高铁车站的候车厅里提现结构建筑学",
                    "一个博物馆想要对本地的文化历史进行致敬都有哪些方法？", 
                    "针对传承传统戏曲文化这件事情能做什么设计？", 
                    "如何把结构建筑学的概念落实到大型高铁站设计中？"];
    typePrompts(queryInput, prompts);
});

document.getElementById('queryForm').addEventListener('submit', function(e) { 
    e.preventDefault(); // Prevent the default form submission


    // 显示加载提示信息
    var loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';

    // Call this function when you want to start the effect
    typeMessage("loadingMessage", messages);

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

    // // Set user query
    // userQueryContainer.textContent = `查询: ${userQuery}`;

    // 只有在有总结性描述的内容时才显示和填充#summary容器
    if (data.concluding_compendium) {
        var concludingCompendium = document.createElement('p');
        concludingCompendium.innerHTML = data.concluding_compendium.replace(/\n/g, '<br>');
        summaryContainer.appendChild(concludingCompendium);
        summaryContainer.style.display = 'block'; // 现在将#summary容器设置为可见
    }    

    // Display the summary description
    var concludingCompendium = document.createElement('p');
    concludingCompendium.innerHTML = data.concluding_compendium.replace(/\n/g, '<br>');
    // summaryContainer.appendChild(concludingCompendium);

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

            // 添加鼠标事件监听器到projectInfo
            projectInfo.addEventListener('mouseenter', function() {
                this.querySelector('.project-title').classList.add('hovered');
                this.querySelector('.project-description').classList.add('hovered');
            });

            projectInfo.addEventListener('mouseleave', function() {
                this.querySelector('.project-title').classList.remove('hovered');
                this.querySelector('.project-description').classList.remove('hovered');
            });

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






// Messages to cycle through
let messages = ["正在召开建筑设计研究员动员大会...",
                "正在兵分一万路找案例查资料...",
                "正在为研究员们准备第三杯咖啡...",
                "正在和历史学家争论建筑风格...",
                "正在给研究员报销机票...",
                "正在从未来偷带回一些灵感...",
                "正在让句子做热身运动，准备跳入你的屏幕...",
                "正在与世界各地的研究员进行思维风暴...",                
                "正在叫醒偷懒的研究员...",
                "正在收集整理研究员的报告...",
                "正在制作汇报文件...", ];




function typePrompts(input, prompts) {
    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;
    let typingDelay = 5000; // 打字后等待删除前的延迟时间
    let promptActive = true; // 控制是否显示打字动画
    let typeTimeout; // 用于存储setTimeout的变量

    // 检查输入框是否聚焦或含文本
    function checkInputFocusOrText() {
        if (input === document.activeElement || input.value !== "") {
            promptActive = false;
            clearTimeout(typeTimeout); // 如果输入框聚焦或含文本，清除挂起的setTimeout
            input.placeholder = ''; // 清除占位符文本
        } else {
            if (!promptActive) {
                // 如果promptActive之前为false，重新开始打字动画
                promptActive = true;
                type(); // 重新启动打字动画
            }
        }
    }

    input.addEventListener('focus', checkInputFocusOrText);
    input.addEventListener('blur', checkInputFocusOrText);
    input.addEventListener('input', checkInputFocusOrText);

    function type() {
        if (!promptActive) {
            return; // 如果不应显示打字动画，则退出函数
        }

        if (promptIndex >= prompts.length) promptIndex = 0;
        let prompt = prompts[promptIndex];

        if (!isDeleting) {
            input.placeholder = prompt.substring(0, charIndex++);
            if (charIndex === prompt.length + 1) {
                isDeleting = true;
                typeTimeout = setTimeout(type, typingDelay);
            } else {
                typeTimeout = setTimeout(type, typingSpeed);
            }
        } else {
            input.placeholder = prompt.substring(0, charIndex--);
            if (charIndex === 0) {
                isDeleting = false;
                promptIndex++;
                typeTimeout = setTimeout(type, 500); // 等待一段时间再打下一条提示
            } else {
                typeTimeout = setTimeout(type, typingSpeed);
            }
        }
    }

    type(); // 开始打字效果
    checkInputFocusOrText(); // 初始检查
}























function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
}

function typeMessage(elementId, messages) {
    let elem = document.getElementById(elementId);
    shuffleArray(messages); // 打乱消息顺序
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60; // Same typing speed for both typing and deleting

    function type() {
        if (messageIndex >= messages.length) {
            messageIndex = 0;
            shuffleArray(messages); // 当所有消息显示完，再次打乱顺序
        }

        let message = messages[messageIndex];

        if (!isDeleting) {
            elem.textContent = message.substring(0, charIndex++);
            if (charIndex === message.length + 1) {
                isDeleting = true;
                setTimeout(type, 5000); // Longer pause before deleting
            } else {
                setTimeout(type, typingSpeed);
            }
        } else {
            elem.textContent = message.substring(0, charIndex--);
            if (charIndex === 0) {
                isDeleting = false;
                messageIndex++;
                setTimeout(type, 500); // Longer pause before typing next message
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }

    type(); // Start the typing effect
}

// // Call this function when you want to start the effect
// typeMessage("typing-effect", messages);
