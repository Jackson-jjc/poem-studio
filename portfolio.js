const studioWorks = [
  {
    id: 'yuexiu', name: '悦绣', category: 'app', type: 'App 设计 / 情感识别',
    image: 'yuexiu', cover: 'edit-yuexiu', label: '广绣学习 App',
    title: '融入情感识别的广绣学习 App。', note: '从一幅绣样找到配色、针法与视频示范。',
    description: '悦绣的设计来自广绣课堂，也把情感识别引入学习体验。打开一幅喜欢的绣样，可以先看用色，再找相应针法的视频示范，练习后留下自己的学习记录。',
    award: '2022 RoboCom CAIA 数字创意全国总决赛二等奖',
    theme: 'pulse',
    film: {src: 'yuexiu-walkthrough.mp4', poster: 'yuexiu-walkthrough.webp', title: '悦绣界面演示', caption: '从首页进入课程视频，再查看绣样、配色和个人学习记录。'},
    lead: ["yx-opening", "从绣样进入悦绣。启动页以花形和针线引出学习界面。"],
    chapters: [
      { title: "从哪里开始学", intro: "把一个初学者会遇到的问题放回导航里。首页先给出可选的内容，再带人进入具体的课程。", plates: [
        ["yx-map", "功能结构", "课程、工具与个人学习内容在同一张结构图中的位置。"],
        ["yx-home", "首页与课程入口", "从首页找到课程，进入具体绣样。"]
      ] },
      { title: "跟着一幅绣样练习", intro: "花瓣用什么颜色，落针时手怎样走？两类问题各有一个可以随时查阅的入口。", plates: [
        ["yx-lesson", "视频与图案", "视频可以横屏跟练，图案页保留颜色与示范入口。"],
        ["yx-library", "配色库与针法库", "颜色按色组查找，针法按动作查找。"]
      ] },
      { title: "从课堂回到个人记录", intro: "练完一段，把课程与自己的学习记录联系起来。", plates: [
        ["yx-profile", "练习之后", "学习、个人页与记录界面的衔接。"]
      ] },
    ]
  },
  {
    id: 'meyou', name: 'MeYou', category: 'health', type: '健康信息 / AI 产品',
    image: 'meyou', cover: 'index-meyou', label: '从包装查产品',
    title: '识读包装、核对跨境医美产品资料的 AI 工具。', note: '入围 2026 谷歌 AI 出海创想赛 Top 30。',
    description: '同一款产品，到了另一个地区，名称和监管分类都可能变。MeYou 从包装照片、产品名称或一段描述入手，把可见信息、候选词条和待核实的问题分开，再引导用户查阅各地区的公开记录。',
    award: '入围 2026 谷歌 AI 出海创想赛 Top 30',
    links: [['体验 MeYou 网页版','https://cross-border-aesthetic-information-guide-728691111179.europe-west1.run.app/']],
    lead: ["site-meyou", "MeYou 网页首页。用户从一个跨境医美信息问题开始核验。"],
    chapters: [
      { title: "先说清楚手上有什么", intro: "同一个名称在包装、社交媒体和诊所里可能指向不同的东西。第一步先交代看到它的地区和信息来源。", plates: [
        ["site-my-0", "核验入口", "三个示例问题和一组地区、来源选项，帮助用户把问题问具体。"]
      ] },
      { title: "把词条和地区放在一起读", intro: "术语索引解决“这个词指什么”，对比页接着回答“各地怎样记录它”。两种阅读任务分别占一页。", plates: [
        ["site-my-1", "术语索引", "按药剂、仪器、材料或产品浏览公开样本。"],
        ["site-my-2", "地区对比", "选定同一条目后，并排查看各地公开记录样本的分类与状态。"]
      ] },
      { title: "给不确定的信息留位置", intro: "查完资料还能回到解释页，区分名称混淆、资料缺口和需要进一步核实的结论。", plates: [
        ["site-my-3", "常识笔记", "从名称混淆、地区差异或包装核验等常见问题进入。"],
        ["site-my-4", "信息边界", "说明公开样本的覆盖范围、AI 的用途与资料来源。"]
      ] },
    ]
  },
  {
    id: 'time-tools', name: 'DeTime × EchoTime', category: 'web', type: '科研工具 / WEB UI',
    image: 'edit-time', cover: 'index-time', label: '拆解与比较时间曲线',
    title: '给研究者看数据的两套网页。', note: 'DeTime 看一组数据怎样变化，EchoTime 比较两组数据哪里相似。',
    description: '团队为两款开源科研工具设计了网页界面。打开 DeTime，可以看一组数据的长期走势和反复出现的波动。打开 EchoTime，可以把两组记录放在一起，找出变化相似的时段。',
    award: '项目仓库 · DeTime 54 Stars / EchoTime 22 Stars（2026.11.20）',
    links: [['访问 DeTime','https://systems-mechanobiology.github.io/DeTime/'],['访问 EchoTime','https://zipengwu.me/EchoTime/'],['DeTime 仓库','https://github.com/systems-mechanobiology/DeTime'],['EchoTime 仓库','https://github.com/ZipengWu365/EchoTime']], theme: 'offgrid',
    lead: ["index-time", "两款独立科研工具的网页首页。上方是 DeTime，下方是 EchoTime。"],
    chapters: [
      { title: "DeTime · 看一组数据怎么变", intro: "比如看一年的气温，既想知道天气总体在变暖还是变冷，也想看反复出现的温差。我们把原始记录、长期走势和周期波动上下排列，让读者沿着同一个日期对照。", plates: [
        ["site-de", "官网首页", "从项目说明进入安装、示例与方法文档。"],
        ["time-de-panel", "分解面板", "原始记录在上方，下方分别显示长期走势、周期波动和剩余变化。"],
        ["site-de-tool", "方法对照表", "用一张表比较不同的分析方法。"]
      ] },
      { title: "EchoTime · 看两组记录哪里相似", intro: "两条曲线可能某一段一起上升，另一段却各走各的。我们把两条曲线放在同一条时间轴上，方便读者找出这些差异，再打开报告看比较结果。", plates: [
        ["site-echo", "官网首页", "文档、教程与 Playground 各有入口。"],
        ["time-echo-panel", "区间对照", "在滚动时间轴上对照两条曲线。"],
        ["site-echo-tool", "在线演示", "从 Playground 进入可运行的比较示例。"]
      ] },
    ]
  },
  {
    id: 'graduate', name: '南安普顿大学毕业礼物组合', category: 'object', type: '毕业礼物 / 3D 打印',
    image: 'graduate-magnets', cover: 'index-graduate', label: '南安普顿大学毕业礼物组合',
    title: '把毕业典礼做成一份可以带走的礼物。', note: '系列已在英国本土和加拿大售出。',
    description: '五款冰箱贴各自配有南安普顿大学校徽背卡。穿着学位袍的人偶手持证书，身旁是一束花。礼物组合已在英国本土和加拿大售出，我们还会继续开发这个系列。',
    lead: ["graduate-magnets", "五款毕业冰箱贴与各自的校徽背卡，黑底系列合照。"],
    chapters: [
      { title: "五款礼物里的个人细节", intro: "同样是学位袍、证书和花束，发型、肤色与手中物件的搭配，让每一款都有自己的模样。", plates: [
        ["graduate", "正面细节", "证书、学位袍与粉色花束组合在同一块底座上。"],
        ["graduate-longhair", "金色长发款", "金色长发垂在学位袍两侧，一旁的证书和粉色花束与方帽款呼应。"]
      ] },
      { title: "把毕业礼物放进花束", intro: "同一份毕业礼物也可以有不同的送法。两张搭配图把人偶放进花束，系列海报则把不同发型放在一起，方便挑选。", plates: [
        ["graduate-bouquet", "手捧花束", "在教学楼前的搭配图里，方帽款放在粉色与黄色花枝之间。"],
        ["graduate-ribbon", "缎带花束", "金色长发款配米白色包纸，花束在图书馆前系上一道金色缎带。"],
        ["graduate-collection", "系列海报", "用四张相片并排对照不同发型与方帽的搭配。"]
      ] },
    ]
  },
  {
    id: 'name-bridge', name: '名桥计划', category: 'object', type: '公共艺术 / 参与式设计',
    image: 'edit-bridge', cover: 'edit-bridge', title: '在等一块姓名牌的时间里，认识一个人。',
    description: '在南安普顿的社区工作坊，一个常被念错的名字成了交谈的起点。参与者选定拼写、字体和颜色，和工作人员一起建模，再看着自己的名字被打印出来。三次路演累计接待超过 80 人次，参与者来自 12 个国家和地区。',
    award: '时报金犊奖开放创作赛 2025 · 公益向善设计项优秀奖',
    lead: ["bridge", "草地上的成品姓名牌。不同名字保留了各自的拼写与配色。"],
    chapters: [
      { title: "从一个常被念错的名字开始", intro: "工作坊把姓名拼写、读音和称呼带到桌边。选定字形和颜色，也给陌生人留下开口交谈的时间。", plates: [
        ["bridge-context", "设计缘起", "项目材料里的三个交流情境。"],
        ["bridge-session", "工作坊节奏", "参与者在 15–30 分钟内经历选名、设计和制作。"]
      ] },
      { title: "把名字从屏幕递到手里", intro: "名字要先变成能打印的模型。现场还需要知道谁在等、哪件做好了、哪里需要重印。", plates: [
        ["bridge-amira-shape", "Amira · 字形示意", "按这枚成品的轮廓还原字形、底板和左侧挂孔。"],
        ["bridge-amira-print", "Amira · 打印成品", "同一枚姓名牌留在打印板上，紫色字母叠在白色底板上。"],
        ["bridge-workshop", "现场服务", "等候、查看进度、取件与返修四个环节。"]
      ] },
      { title: "工作坊走进社区", intro: "活动海报把人带到桌前，现场打印让参与者看到名字一点点成形。三次路演累计超过 80 人次。", plates: [
        ["bridge-market-table", "南安普顿工作台", "打印机、线材和样品摆在同一张桌上。"],
        ["bridge-posters", "招募与传播", "三张工作坊海报，用各自的场景介绍同一项活动。"],
        ["bridge-names", "最终成品", "不同语言背景的名字，成为可以随身携带的物件。"]
      ] },
    ]
  },
  {
    id: 'robot-arm', name: '黑客松机械臂', category: 'object', type: '实体交互 / 机械臂原型',
    image: 'arm-prototype', title: '让一台机械臂从日常穿衣讲起。',
    description: '「你今天好好穿衣服了吗？」是《狗王出世》在香港黑客松展位上问观众的问题。桌上摊开一件蓝色衣物，机械臂的末端夹着一块花形图案，伸向布面。',
    award: '2026 香港 Physical AI Hackathon · 最具创意奖',
    links: [['打开机械臂项目网页 ↗','https://de5920c1555343ac93fa943a5c9909b1.prod.enter.pro/']],
    lead: ["arm-prototype", "机械臂末端夹着花形图案，移向展台上的蓝色衣物。"],
    chapters: [
      { title: "把原型带上舞台", intro: "从观众席望过去，舞台大屏把项目介绍展示给整个会场。", plates: [
        ["arm-auditorium", "现场路演", "从观众席侧后方看舞台和投影大屏。"]
      ] },
      { title: "从展台到舞台", intro: "在香港 Physical AI Hackathon 现场，演讲和投影让台下观众也能跟上演示。", plates: [
        ["arm-stage", "现场投影", "会场大屏呈现演示内容。"]
      ] },
      { title: "现场结果", intro: "作品获赛事最具创意奖。", plates: [
        ["arm-award", "颁奖现场", "大屏上的 Most Creative Award 与现场领奖合影。"]
      ] },
    ]
  },
  {
    id: 'drawnwork', name: '纱以生花', category: 'research', type: '分形数学 / 非遗工艺',
    image: 'drawnwork-ip100-01', cover: 'drawnwork-master-plate', title: '用分形数学设计纹样，再把绣谱做成抽纱实物。',
    description: '从潮汕抽纱中提取花心、边饰和重复单元，用分形规则推演数字绣谱，再把纹样转入实际制作。对照手巾与设计稿，能看到屏幕上的线条如何变成布面上的针脚与镂空。',
    award: '作品获第十届广东省非物质文化遗产创意设计大赛优秀奖、未来设计师·全国高校数字艺术设计大赛广东赛区三等奖，入围 2025 年「岭南文化 IP100 计划」百件作品，入选 2025 中国—东盟（广西）数字设计艺术大展。作品曾在广州图书馆展出。',
    links: [['潮汕抽纱数字档案 · ACM JOCCH','https://doi.org/10.1145/3858626'],['抽纱纹样生成 · 北大核心期刊','https://szys.cbpt.cnki.net/portal/journal/portal/client/paper/0c65f9ffd7c97957a8e038613c21951d']],
    lead: ["drawnwork-master-plate", "完整数字绣谱。八瓣花心居中，四角的花叶与四边的边饰重复呼应。"],
    chapters: [
      { title: "用分形推演花样", intro: "先从潮汕抽纱中提取花心、边饰与重复单元，再改变重复次数和排列方向，推演出不同的绣谱。", plates: [
        ["drawnwork-ip100-01", "花形的起点", "单个花样从中心向外延伸。"],
        ["drawnwork-ip100-02", "纹样推演", "将单元重排为方形、圆形及连续边饰。"]
      ] },
      { title: "到布面验证针脚", intro: "数字图案里的一处留白，到了手巾上就是一处真实的镂空。设计稿与实物同页，可以对照花心与边缘的处理。", plates: [
        ["drawnwork-ip100-03", "数字绣谱与抽纱手巾", "手巾实物、局部圆形样本与方形设计稿。"]
      ] },
      { title: "让纹样走出手巾", intro: "同一组花形换到不同尺度，延伸为空间装饰与日常物件。", plates: [
        ["drawnwork-ip100-04", "空间陈设", "在蓝白色的空间方案中观察连续花纹。"],
        ["drawnwork-ip100-05", "应用提案", "衣物、屏风与陈列中的纹样延伸。"]
      ] },
    ]
  },
  {
    id: 'diaozhuo', name: '碉琢', category: 'brand', type: '品牌与包装 / 地方文创',
    image: 'diaozhuo-ip100-03', cover: 'edit-diaozhuo', title: '把开平碉楼的轮廓，收进一组桌上器物。',
    description: '从碉楼的立面提取线条，缩小尺度，做成桌上陈列。灰绿色贯穿盆器、纸盒和手提袋，把器物与包装联系起来。',
    award: '第十八届中国之星设计奖 · 文创产品类铜奖',
    lead: ["edit-diaozhuo", "碉琢系列的盆器与包装组合。建筑轮廓贯穿器物与纸盒。"],
    chapters: [
      { title: "从碉楼立面取形", intro: "屋顶轮廓、窗洞与层叠的体块，为标志和器物提供了同一套形态线索。", plates: [
        ["diaozhuo-ip100-01", "标志与建筑", "将字标和几类碉楼立面并置观察。"]
      ] },
      { title: "把建筑缩到桌面", intro: "建筑的高低关系缩成一组桌上盆器，配件、绿植和留白共同决定陈列的尺度。", plates: [
        ["diaozhuo-ip100-03", "器物组合", "正面与侧面的组合陈列。"],
        ["diaozhuo-ip100-04", "配件细节", "鹅形配件与植物共享器皿中的空间。"]
      ] },
      { title: "从盒内到盒外", intro: "灰绿色和建筑线条延伸到纸盒与手提袋。翻开包装，还能看到同一造型如何被固定和展示。", plates: [
        ["diaozhuo-ip100-02", "包装系统", "盆器、纸盒与手提袋的组合。"],
        ["diaozhuo-ip100-05", "陈列与收纳", "从多个角度看系列的包装结构。"]
      ] },
    ]
  },
  {
    id: 'shenwan', name: '神湾镇品牌设计', category: 'brand', type: '地方品牌 / 视觉识别',
    image: 'sw-identity', cover: 'index-shenwan', title: '用菠萝、丫髻山和西江构成神湾的品牌标志。',
    description: '从一枚标志出发，为中山神湾镇设计中英文字标、色彩和辅助图形。品牌里的菠萝纹、山形和水纹延伸到地方风景插画、明信片与茶具。',
    award: '作品入选首届乡村文化创意设计成果馆校联展，在广东省博物馆等单位联合主办的始兴围楼文化旅游周期间展出，随后巡展至佛山南海区博物馆。',
    lead: ["shenwan-motion.gif", "「中山 · 神湾」动态标志与中英文字标。"],
    chapters: [
      { title: "标志从哪里来", intro: "丫髻山、神湾菠萝、西江与江心岛屿，在参展稿中被提炼成一组有层次的色块。", plates: [
        ["sw-origins", "四个地方线索", "参展稿里的丫髻山、菠萝、西江与岛屿。"]
      ] },
      { title: "三幅插画，三种地方产业", intro: "农业用暖黄衬出山形与田园；渔业换成水蓝，线条沿江面展开；旅游业用深蓝串起镇上的建筑。三幅都来自参展系列原稿。", plates: [
        ["sw-agriculture", "农业", "从山体轮廓、果实和农舍展开画面。"],
        ["sw-fishery", "渔业", "水蓝色画面里的江岸、船只与山水线条。"],
        ["sw-tourism", "旅游业", "用连续线条串联建筑与城镇空间。"]
      ] },
      { title: "从纸面到器物", intro: "明信片保留整幅风景，笔记本将插画延伸到封面。做成茶具时，菠萝轮廓又回到立体的器物上。", plates: [
        ["sw-print", "明信片", "三种产业的图形落在成组的纸品上。"],
        ["sw-notebook", "笔记本", "内页与封面沿用同一套地方视觉。"],
        ["sw-tea", "茶具", "菠萝造型茶滤与杯、碟的组合。"]
      ] },
    ]
  }
];
const portfolioImage = name => 'assets/portfolio/' + name + '.webp';
const portfolioSections = [
  { id: 'brand', name: '品牌与包装', en: 'Brand & Packaging', categories: ['brand'], cover: 'diaozhuo' },
  { id: 'digital', name: '网页与应用', en: 'Digital Products', categories: ['web','app','health'], cover: 'yuexiu' },
  { id: 'objects', name: '实物与交互', en: 'Objects & Interaction', categories: ['object'], cover: 'name-bridge' },
  { id: 'research', name: '非遗与工艺', en: 'Heritage & Craft', categories: ['research'], cover: 'drawnwork' }
];
const researchNotes = [
  {
    type: '开源项目', name: '可穿戴 AI 研究图谱',
    credit: '文献更新与网站 UI',
    description: '我们持续收录新的研究，也负责图谱网站的界面设计与维护。读者可以按疾病预测、干预、个人数字孪生和混合现实四个方向查找文献，回到原论文核对证据。',
    links: [['浏览研究图谱', 'https://zipengwu.me/awesome-wearable-ai/']]
  },
  {
    type: '学术论文', name: '潮汕抽纱数字档案',
    credit: '入选 GCH 2026 · ACM JOCCH 视觉遗产专题',
    description: '将抽纱档案中的文字和图像关联到原始出处。研究者可以从一条记录回看原文或图像，判断两份材料之间的联系。',
    links: [['阅读论文', 'https://doi.org/10.1145/3858626']]
  },
  {
    type: '田野观察', name: '街头 3D 打印',
    credit: '名桥计划 · 南安普顿社区工作坊',
    description: '一块姓名牌从建模到打印，需要等多久？我们在工作坊记录参与者怎样查看进度、核对名字，以及发现瑕疵后怎样重印。',
    links: [['看工作坊现场', 'project.html?id=name-bridge#chapter-2']]
  }
];
