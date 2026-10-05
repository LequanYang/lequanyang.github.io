/* ============================================================================
 *  i18n.js — 全站文案（英文 / 中文）
 *
 *  ★ 想改网页上的任何文字，只需要改这个文件，不用碰 HTML。
 *  ★ 每个 key 在 en 和 zh 里都要有一份，key 名字不要改。
 *  ★ 带 <strong> 的条目（research.1.authors）会按 HTML 解析，用来加粗姓名；
 *    其他条目都是纯文本，写 HTML 标签会原样显示出来。
 *  ★ skills.*.items 用逗号分隔，会自动拆成一个个标签气泡（中英文都支持「,」和「、」）。
 *
 *  论文状态为「在投」，如已录用/见刊请更新 research.1.venue 并删掉页面上的徽章。
 * ========================================================================== */

window.SITE_I18N = {

  /* ------------------------------------------------------------------ 英文 */
  en: {
    'meta.title': 'Lequan Yang (杨乐泉) — Personal Website',
    'meta.description':
      'Personal website of Lequan Yang (杨乐泉) — undergraduate researcher working on computer vision, multimodal learning, and LLM agents.',

    'a11y.skip': 'Skip to content',

    'nav.aria': 'Main navigation',
    'nav.menu': 'Open menu',
    'nav.toTop': 'Back to top',
    'lang.toggleText': '中文',
    'lang.toggleLabel': 'Switch to Chinese',
    'theme.toDark': 'Switch to dark mode',
    'theme.toLight': 'Switch to light mode',

    'nav.about': 'About',
    'nav.research': 'Research',
    'nav.awards': 'Awards',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',

    /* 首屏 */
    'hero.name': 'Lequan Yang',
    'hero.nameAlt': '杨乐泉',
    'hero.role': 'Undergraduate Student in Network Engineering',
    'hero.affiliation': 'School of Information Engineering, Gansu Minzu Normal University',
    'hero.link.email': 'Email',
    'hero.link.cv': 'CV',
    'hero.photoAlt': 'Lequan Yang in front of the Canton Tower at night',
    'hero.bio':
      'I am an undergraduate student in Network Engineering at Gansu Minzu Normal University, graduating in 2027. My research interests lie in computer vision, multimodal learning, and LLM-based agents. I have led student teams to build LLM-powered multimodal systems, and I am currently working on unified vision transformers with geometric priors.',

    /* 关于我 */
    'about.kicker': '01 — Profile',
    'about.title': 'About Me',
    'about.p1':
      'I am an undergraduate student in the School of Information Engineering at Gansu Minzu Normal University, majoring in Network Engineering and expected to graduate in June 2027. My work sits between computer vision and multimodal learning: I am interested in how geometric structure can be injected into vision transformers, how diffusion models can be trained more stably, and how large language models can be grounded in embodied devices.',
    'about.p2':
      'I enjoy leading small teams and turning research ideas into working systems. I led a seven-person team to build a multimodal emotion model for psychological counseling scenarios, and led the design of an end-to-end LLM agent deployed on a robot car. Outside of research, I take part in data mining and innovation competitions, and I like writing code that is fast enough to run on real hardware.',
    'about.edu.period': '2023.08 — 2027.06 (expected)',
    'about.edu.school': 'Gansu Minzu Normal University',
    'about.edu.major': 'B.Eng. in Network Engineering, School of Information Engineering',
    'about.edu.gpa': 'GPA 3.0/4.0 — top 10% of the major',

    /* 科研经历 */
    'research.kicker': '02 — Research',
    'research.title': 'Research Experience',
    'research.sub': 'Currently under review.',

    'badge.underReview': 'Under Review',

    'research.1.title':
      'Unified Multi-Task Vision Transformer: Zero-Shot Adaptation with Geometric Priors',
    'research.1.period': '2025.06 — Present',
    'research.1.authors': '<strong>Lequan Yang</strong> · First author',
    'research.1.venue': 'NeurIPS 2026',
    'research.1.p1':
      'Proposes a framework spanning visual perception, generation, and world modeling, addressing inconsistent cross-task and cross-time representations in existing systems.',
    'research.1.p2':
      'Designs spatio-temporal geometry-aligned tokenization that builds geometry-consistent video tokens from 4D cues including depth, surface normals, and motion.',
    'research.1.p3':
      'Develops geometry-conditioned attention that injects geometric structure into the attention computation, enabling task-adaptive and consistent feature aggregation, and extending to diffusion generation and persistent world modeling.',
    'research.1.p4':
      'Designs a task prompt encoder that supports natural-language-driven open-vocabulary generalization.',

    /* 竞赛获奖 */
    'awards.kicker': '03 — Honors',
    'awards.title': 'Competitions & Awards',
    'award.1.name': '“Challenge Cup” Extracurricular Academic & Technological Works Competition',
    'award.1.prize': 'Grand Prize · Provincial',
    'award.1.role': 'Team lead',
    'award.2.name': 'Chinese Collegiate Computing Competition',
    'award.2.prize': 'Second Prize · Provincial',
    'award.2.role': 'Team lead',
    'award.3.name': 'Gansu Provincial Data Mining Challenge',
    'award.3.prize': 'Second Prize · Provincial',
    'award.4.name': 'China International College Students’ Innovation Competition',
    'award.4.prize': 'Third Prize · Provincial',
    'award.5.name': 'Huang Yanpei Vocational Education Innovation & Entrepreneurship Competition',
    'award.5.prize': 'Third Prize · Provincial',

    /* 专业技能 */
    'skills.kicker': '04 — Skills',
    'skills.title': 'Technical Skills',
    'skills.g1.title': 'CV / LLM Foundations',
    'skills.g1.note':
      'PyTorch and Transformer architectures; principles and training pipelines of mainstream vision backbones including ViT and Swin; efficient fine-tuning with LoRA and PEFT.',
    'skills.g1.items': 'PyTorch, Transformer, ViT, Swin, LoRA, PEFT',
    'skills.g2.title': 'Multi-Task Learning',
    'skills.g2.note':
      'Unified architecture design, task prompt encoding, zero-shot task adaptation, and parameter-efficient transfer with shared representation learning.',
    'skills.g2.items':
      'Unified architectures, Task prompt encoding, Zero-shot adaptation, Shared representations',
    'skills.g3.title': 'Engineering & Optimization',
    'skills.g3.note': 'Custom operators, on-device deployment, and memory-efficient training at scale.',
    'skills.g3.items': 'CUDA / FFT operators, TensorRT FP16, Gradient checkpointing, Mixed precision',
    'skills.g4.title': 'Languages',
    'skills.g4.note': 'Comfortable reading and writing technical English for research papers.',
    'skills.g4.items': 'Chinese (native), English',

    /* 联系方式 */
    'contact.kicker': '05 — Contact',
    'contact.title': 'Get in Touch',
    'contact.sub':
      'I am happy to discuss research collaborations, internship opportunities, or anything related to computer vision and multimodal learning. Email is the fastest way to reach me.',

    'footer.copyright': '© 2026 Lequan Yang. All rights reserved.',
    'footer.updated': 'Last updated: October 2026'
  },

  /* ------------------------------------------------------------------ 中文 */
  zh: {
    'meta.title': '杨乐泉 Lequan Yang — 个人主页',
    'meta.description':
      '杨乐泉（Lequan Yang）的个人主页 —— 本科生，研究方向为计算机视觉、多模态学习与大模型智能体。',

    'a11y.skip': '跳到主要内容',

    'nav.aria': '主导航',
    'nav.menu': '打开菜单',
    'nav.toTop': '回到顶部',
    'lang.toggleText': 'EN',
    'lang.toggleLabel': '切换到英文',
    'theme.toDark': '切换到黑夜模式',
    'theme.toLight': '切换到白天模式',

    'nav.about': '关于',
    'nav.research': '科研',
    'nav.awards': '竞赛',
    'nav.skills': '技能',
    'nav.contact': '联系',

    'hero.name': '杨乐泉',
    'hero.nameAlt': 'Lequan Yang',
    'hero.role': '网络工程专业 本科生',
    'hero.affiliation': '甘肃民族师范学院 信息工程学院',
    'hero.link.email': '邮箱',
    'hero.link.cv': '简历',
    'hero.photoAlt': '杨乐泉在广州塔前',
    'hero.bio':
      '我是甘肃民族师范学院网络工程专业本科生，预计 2027 年 6 月毕业。研究兴趣集中在计算机视觉、多模态学习与基于大语言模型的智能体。我曾带队构建基于大模型的多模态系统，目前正在从事融合几何先验的统一视觉 Transformer 研究。',

    'about.kicker': '01 — 简介',
    'about.title': '关于我',
    'about.p1':
      '我就读于甘肃民族师范学院信息工程学院，网络工程专业，预计 2027 年 6 月毕业。我的工作位于计算机视觉与多模态学习的交叉地带：我关注几何结构如何注入视觉 Transformer、扩散模型如何更稳定地训练，以及大语言模型如何落地到具身设备上。',
    'about.p2':
      '我喜欢带领小团队，把研究想法做成能跑起来的系统。我曾带领 7 人团队构建面向心理辅导场景的多模态情感模型，也主导了一个部署在机器人小车上的端到端 LLM 智能体的设计。科研之外，我参加数据挖掘与创新创业类竞赛，也喜欢写那些能在真实硬件上跑得足够快的代码。',
    'about.edu.period': '2023.08 — 2027.06（预计）',
    'about.edu.school': '甘肃民族师范学院',
    'about.edu.major': '信息工程学院 · 网络工程 · 工学学士',
    'about.edu.gpa': 'GPA 3.0/4.0 —— 专业前 10%',

    'research.kicker': '02 — 科研',
    'research.title': '科研经历',
    'research.sub': '目前投稿中。',

    'badge.underReview': '在投',

    'research.1.title': '统一多任务视觉 Transformer：融合几何先验的零样本适配架构',
    'research.1.period': '2025.06 — 至今',
    'research.1.authors': '<strong>杨乐泉</strong> · 第一作者',
    'research.1.venue': 'NeurIPS 2026',
    'research.1.p1': '提出面向视觉感知、生成与世界建模的统一框架，针对现有系统跨任务、跨时间表征不一致的问题。',
    'research.1.p2': '设计时空几何对齐令牌化方法，利用深度、法向、运动等 4D 线索构建几何一致的视频令牌。',
    'research.1.p3':
      '开发几何条件注意力，将几何结构融入注意力计算，实现任务自适应且一致的特征聚合，并扩展至扩散生成与持久世界建模。',
    'research.1.p4': '设计任务提示编码器，支持自然语言驱动的开放词汇泛化。',

    'awards.kicker': '03 — 荣誉',
    'awards.title': '竞赛获奖',
    'award.1.name': '“挑战杯”大学生课外学术科技作品竞赛',
    'award.1.prize': '省级特等奖',
    'award.1.role': '团队负责人',
    'award.2.name': '中国大学生计算机设计大赛',
    'award.2.prize': '省级二等奖',
    'award.2.role': '团队负责人',
    'award.3.name': '甘肃省数据挖掘挑战赛',
    'award.3.prize': '省级二等奖',
    'award.4.name': '中国国际大学生创新大赛',
    'award.4.prize': '省级三等奖',
    'award.5.name': '黄炎培职业教育创新创业大赛',
    'award.5.prize': '省级三等奖',

    'skills.kicker': '04 — 技能',
    'skills.title': '专业技能',
    'skills.g1.title': 'CV / LLM 基础',
    'skills.g1.note':
      '熟悉 PyTorch 与 Transformer，理解 ViT、Swin 等主流视觉骨干的原理与训练流程，掌握 LoRA、PEFT 等高效微调方法。',
    'skills.g1.items': 'PyTorch、Transformer、ViT、Swin、LoRA、PEFT',
    'skills.g2.title': '多任务学习',
    'skills.g2.note': '熟悉统一架构设计，掌握任务提示编码、零样本任务适配与共享表示学习下的参数高效迁移。',
    'skills.g2.items': '统一架构设计、任务提示编码、零样本任务适配、共享表示学习',
    'skills.g3.title': '工程与优化',
    'skills.g3.note': '自定义算子、端侧部署与大规模训练的内存效率优化。',
    'skills.g3.items': 'CUDA / FFT 算子、TensorRT FP16 部署、梯度检查点、混合精度训练',
    'skills.g4.title': '语言能力',
    'skills.g4.note': '可流畅阅读与撰写英文科研论文。',
    'skills.g4.items': '中文（母语）、英语',

    'contact.kicker': '05 — 联系',
    'contact.title': '联系我',
    'contact.sub': '欢迎交流科研合作、实习机会，或任何与计算机视觉、多模态学习相关的话题。邮件是最快的联系方式。',

    'footer.copyright': '© 2026 杨乐泉 保留所有权利。',
    'footer.updated': '最后更新：2026 年 10 月'
  }
};
