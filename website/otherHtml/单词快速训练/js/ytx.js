let WORD_LIST = [{name: 'mastered', chinese: '掌握了'}, {name: 'involved', chinese: '涉及'}, {
    name: 'various',
    chinese: '各种各样的'
}, {name: 'occasions', chinese: '场合'}, {name: 'frictions', chinese: '摩擦'}, {
    name: 'assists',
    chinese: '协助'
}, {name: 'maintaining', chinese: '维持'}, {name: 'lasting', chinese: '长久的'}, {
    name: 'occupational',
    chinese: '职业的工作的'
}, {name: 'occupation', chinese: '职业'}, {name: 'collaborate', chinese: '合作'}, {
    name: 'acquisition',
    chinese: '获得'
}, {name: 'consciously', chinese: '有意识的'}, {name: 'disregarded', chinese: '无视'}, {
    name: 'repaired',
    chinese: '俢好了的'
}, {name: 'repair', chinese: '修理'}, {name: 'inaccurate', chinese: '不准确的'}, {
    name: 'company',
    chinese: '公司'
}, {name: 'terms', chinese: '条款'}, {name: 'contract', chinese: '合同'}, {name: 'consult', chinese: '咨询'}, {
    name: 'claim',
    chinese: '声称'
}, {name: 'extensively', chinese: '广泛的'}, {name: 'refers', chinese: '指的是'}, {
    name: 'incident',
    chinese: '事件'
}, {name: 'skeptical', chinese: '怀疑态度'}, {name: 'payment', chinese: '支付'}, {
    name: 'conditions',
    chinese: '状况'
}, {name: 'affect', chinese: '影响'}, {name: 'claims', chinese: '索赔'}, {
    name: 'encountered',
    chinese: '遭遇'
}, {name: 'conversation', chinese: '对话'}, {name: 'greatly', chinese: '非常'}, {
    name: 'fields',
    chinese: '领域'
}, {name: 'stimulating', chinese: '刺激'}, {name: 'consuming', chinese: '消费'}, {
    name: 'smarter',
    chinese: '更聪明'
}, {name: 'ourselves', chinese: '我们自己'}, {name: 'evolving', chinese: '进化'}, {
    name: 'superior',
    chinese: '优越的'
}, {name: 'simulation', chinese: '模拟'}, {name: 'anticipates', chinese: '预期'}, {
    name: 'advice',
    chinese: '建议'
}, {name: 'stick', chinese: '戳'}, {name: 'mindset', chinese: '心态'}, {
    name: 'proper',
    chinese: '恰当的'
}, {name: 'optimistic', chinese: '乐观的'}, {name: 'interest', chinese: '兴趣'}, {
    name: 'amount',
    chinese: '登上'
}, {name: 'shrewdly', chinese: '精明的'}, {name: 'irrespective', chinese: '不管'}, {
    name: 'reserved',
    chinese: '预订的、储备的'
}, {name: 'reserve', chinese: '保留、储备'}, {name: 'remaining', chinese: '其余的'}, {
    name: 'designate',
    chinese: '指定'
}, {name: 'accessible', chinese: '接近的'}, {name: 'outfit', chinese: '合适'}, {
    name: 'inappropriate',
    chinese: '不恰当的'
}, {name: 'advertising', chinese: '广告'}, {name: 'conscious', chinese: '有意识的'}, {
    name: 'confidence',
    chinese: '信心'
}, {name: 'current', chinese: '当前的'}, {name: 'trends', chinese: '趋势'}, {
    name: 'aware',
    chinese: '意识到的'
}, {name: 'obsessed', chinese: '痴迷'}, {name: 'glimpse', chinese: '一瞥'}, {
    name: 'appropriate',
    chinese: '合适的'
}, {name: 'pieces', chinese: '单品'}, {name: 'remotely', chinese: '远程'}, {
    name: 'rarely',
    chinese: '很少'
}, {name: 'involves', chinese: '涉及'}, {name: 'interacting', chinese: '互动'}, {
    name: 'failure',
    chinese: '失败'
}, {name: 'cherish', chinese: '珍惜'}, {name: 'rare', chinese: '稀有的'}, {
    name: 'sufficient',
    chinese: '充足的'
}, {name: 'possessions', chinese: '财产'}, {name: 'credit', chinese: '信用'}, {
    name: 'coincidentally',
    chinese: '巧合'
}, {name: 'coincident', chinese: '巧合'}, {name: 'propose', chinese: '提供'}, {
    name: 'offered',
    chinese: '提供'
}, {name: 'appliances', chinese: '电器'}, {name: 'occasional', chinese: '偶然的'}, {
    name: 'accommodate',
    chinese: '容纳'
}, {name: 'respondents', chinese: '受访者'}, {name: 'compensated', chinese: '补偿'}, {
    name: 'endeavored',
    chinese: '努力的'
}, {name: 'conclusive', chinese: '确凿'}, {name: 'figure', chinese: '数字'}, {
    name: 'suspicious',
    chinese: '可疑的'
}, {name: 'assert', chinese: '断言'}, {name: 'obtain', chinese: '获得'}, {
    name: 'anticipate',
    chinese: '预料'
}, {name: 'experts', chinese: '专家'}, {name: 'suggesting', chinese: '建议'}, {
    name: 'skeptics',
    chinese: '怀疑论者'
}, {name: 'category', chinese: '类别'}, {name: 'released', chinese: '释放了'}, {
    name: 'release',
    chinese: '释放'
}, {name: 'distinctions', chinese: '区别'}, {name: 'appreciate', chinese: '欣赏'}, {
    name: 'exposed',
    chinese: '暴露的'
}, {name: 'intense', chinese: '紧张激烈的'}, {name: 'deteriorates', chinese: '恶化'}, {
    name: 'exposure',
    chinese: '暴露'
}, {name: 'essence', chinese: '本质'}, {name: 'obligations', chinese: '义务'}, {
    name: 'preference',
    chinese: '偏爱'
}, {name: 'revenue', chinese: '收入'}, {name: 'drunk', chinese: '喝醉'}, {name: 'state', chinese: '状态'}, {
    name: 'proven',
    chinese: '证明'
}, {name: 'economists', chinese: '经济学家'}, {name: 'emissions', chinese: '排放量'}, {
    name: 'companies',
    chinese: '公司'
}, {name: 'climate', chinese: '气候'}, {name: 'infrastructure', chinese: '基础设施'}, {
    name: 'stories',
    chinese: '故事'
}, {name: 'shivering', chinese: '发抖的'}, {name: 'engine', chinese: '引擎'}, {
    name: 'curses',
    chinese: '比赛'
}, {name: 'threats', chinese: '威胁'}, {name: 'dizzying', chinese: '头晕目眩'}, {
    name: 'capacity',
    chinese: '容量'
}, {name: 'signature', chinese: '签名'}, {name: 'particular', chinese: '特殊'}, {
    name: 'enormous',
    chinese: '巨大的'
}, {name: 'spheres', chinese: '球体'}, {name: 'extinction', chinese: '灭绝'}, {
    name: 'occurrence',
    chinese: '发生'
}, {name: 'represented', chinese: '代表'}, {name: 'manipulate', chinese: '操纵'}, {
    name: 'spaceships',
    chinese: '宇宙飞船'
}, {name: 'constraints', chinese: '约束'}, {name: 'scarcity', chinese: '缺乏'}, {
    name: 'mountains',
    chinese: '山'
}, {name: 'divine', chinese: '神圣的'}, {name: 'interests', chinese: '兴趣'}, {
    name: 'assume',
    chinese: '假定'
}, {name: 'destruction', chinese: '破坏'}, {name: 'manipulation', chinese: '操纵'}, {
    name: 'endeavours',
    chinese: '努力'
}, {name: 'narrative', chinese: '叙述'}, {name: 'invisible', chinese: '无形的'}, {
    name: 'philosophers',
    chinese: '哲学家'
}, {name: 'fiction', chinese: '小说'}, {name: 'native', chinese: '本国的'}, {
    name: 'democratic',
    chinese: '民主的'
}, {name: 'sustainable', chinese: '可持续的'}, {name: 'commodification', chinese: '商品化'}, {
    name: 'devastate',
    chinese: '蹂躏'
}, {name: 'present', chinese: '展示'}, {name: 'paid', chinese: '有薪酬的'}, {
    name: 'involve',
    chinese: '涉及'
}, {name: 'oversubscribed', chinese: '超额认购'}, {name: 'subscribed', chinese: '已订阅'}, {
    name: 'subscribe',
    chinese: '订阅'
}, {name: 'misperceptions', chinese: '误解'}, {name: 'disclose', chinese: '透露'}, {
    name: 'organise',
    chinese: '有组织的'
}, {name: 'forms', chinese: '形式'}, {name: 'contemplation', chinese: '沉思'}, {
    name: 'spray',
    chinese: '喷'
}, {name: 'destructive', chinese: '破坏性的'}, {name: 'otherwise', chinese: '除此以外'}, {
    name: 'escapes',
    chinese: '逃脱'
}, {name: 'scene', chinese: '场景'}, {name: 'appreciating', chinese: '欣赏'}, {
    name: 'masterpiece',
    chinese: '杰作'
}, {name: 'contemplate', chinese: '沉思'}, {name: 'annoyed', chinese: '生气'}, {
    name: 'delivery',
    chinese: '送货'
}, {name: 'federal', chinese: '联邦'}, {name: 'assistance', chinese: '帮助'}, {
    name: 'sustainability',
    chinese: '可持续性'
}, {name: 'scope', chinese: '范围'}, {name: 'presumably', chinese: '想必'}, {
    name: 'secure',
    chinese: '安全的'
}, {name: 'irritated', chinese: '恼怒'}, {name: 'dietary', chinese: '饮食'}, {
    name: 'recommendations',
    chinese: '建议'
}, {name: 'charge', chinese: '收费'}, {name: 'expertise', chinese: '专业知识'}, {
    name: 'belly',
    chinese: '腹部'
}, {name: 'diversity', chinese: '多样性'}, {name: 'neglect', chinese: '忽略'}, {
    name: 'endeavor',
    chinese: '努力'
}, {name: 'cooperating', chinese: '合作'}, {name: 'lying', chinese: '撒谎'}, {
    name: 'act',
    chinese: '行为'
}, {name: 'crawling', chinese: '爬行'}, {name: 'situation', chinese: '情况'}, {
    name: 'perspective',
    chinese: '看法'
}, {name: 'cognitive', chinese: '认知'}, {name: 'deceive', chinese: '欺骗'}, {
    name: 'monetary',
    chinese: '金钱'
}, {name: 'instantly', chinese: '立刻'}, {name: 'instinctively', chinese: '本能的'}, {
    name: 'instinct',
    chinese: '直觉本能'
}, {name: 'suggests', chinese: '建议'}, {name: 'deciding', chinese: '决定'}, {
    name: 'dishonesty',
    chinese: '不诚实'
}, {name: 'rationalise', chinese: '合理化'}, {name: 'reminders', chinese: '提醒'}, {
    name: 'probability',
    chinese: '可能性'
}, {name: 'falsehood', chinese: '谬误，假话'}, {name: 'deceiving', chinese: '欺骗'}, {
    name: 'sensational',
    chinese: '耸人听闻的'
}, {name: 'sensation', chinese: '感觉'}, {name: 'represents', chinese: '代表'}, {
    name: 'interact',
    chinese: '相互作用'
}, {name: 'plausible', chinese: '似是而非的'}, {name: 'implausible', chinese: '难以相信的'}, {
    name: 'circumstances',
    chinese: '环境，情况'
}, {name: 'imminent', chinese: '即将来临的'}, {name: 'complacent', chinese: '自满的'}, {
    name: 'currency',
    chinese: '货币'
}, {name: 'predicted', chinese: '预料到的'}, {name: 'appreciation', chinese: '欣赏'}, {
    name: 'counterfeit',
    chinese: '伪造'
}, {name: 'precisely', chinese: '精确的'}, {name: 'disputed', chinese: '有争议的'}, {
    name: 'disputes',
    chinese: '质疑'
}, {name: 'precedent', chinese: '先例'}, {name: 'blunt', chinese: '钝的'}, {
    name: 'pronounced',
    chinese: '明显'
}, {name: 'passive', chinese: '消极的'}, {name: 'prone', chinese: '倾向于'}, {
    name: 'potency',
    chinese: '效力'
}, {name: 'council', chinese: '理事会'}, {name: 'centres', chinese: '中心'}, {
    name: 'reserves',
    chinese: '储备'
}, {name: 'intervention', chinese: '干预'}, {name: 'wellbeing', chinese: '福利幸福'}, {
    name: 'sector',
    chinese: '部门'
}, {name: 'constructive', chinese: '建设性的（n.建议）'}, {name: 'anti-', chinese: '反义词开头'}, {
    name: 'opposing',
    chinese: '方面'
}, {name: 'debate', chinese: '辩论'}, {name: 'accordingly', chinese: '相应的'}, {
    name: 'realise',
    chinese: '实现了'
}, {name: 'biodiversity', chinese: '生物多样性'}, {name: 'proposal', chinese: '提议'}, {
    name: 'coastal',
    chinese: '沿海'
}, {name: 'proposed', chinese: '建议的'}, {name: 'specific', chinese: '具体的'}, {
    name: 'contention',
    chinese: '争夺'
}, {name: 'adversely', chinese: '不利的'}, {name: 'adverse', chinese: '不利'}, {
    name: 'notoriously',
    chinese: '臭名昭著'
}, {name: 'productive', chinese: '多产的'}, {name: 'reference', chinese: '参考'}, {
    name: 'exotic',
    chinese: '国外的'
}, {name: 'intrigued', chinese: '好奇的'}, {name: 'exhausting', chinese: '精疲力竭'}, {
    name: 'swell',
    chinese: '肿胀'
}, {name: 'liberating', chinese: '解放的'}, {name: 'brutal', chinese: '野蛮的'}, {
    name: 'endure',
    chinese: '忍受'
}, {name: 'minority', chinese: '少数'}, {name: 'irresponsible', chinese: '不负责的'}, {
    name: 'responsible',
    chinese: '负责的'
}, {name: 'industrious', chinese: '勤奋的'}, {name: 'prospect', chinese: '前景'}, {
    name: 'conventional',
    chinese: '传统的'
}, {name: 'conductive_to', chinese: '利于'}, {name: 'abbreviated', chinese: '缩写（词根是简短的）'}, {
    name: 'endorse',
    chinese: '认可，合法化'
}, {name: 'promoting', chinese: '促进'}, {name: 'disposable', chinese: '一次性的'}, {
    name: 'reliance',
    chinese: '依赖~'
}, {name: 'synthetic', chinese: '合成的'}, {name: 'assesses', chinese: '评估'}, {
    name: 'apparel',
    chinese: '服饰'
}, {name: 'overestimated', chinese: '高估'}, {name: 'excessive', chinese: '过多的'}, {
    name: 'dean',
    chinese: '院长'
}, {name: 'agricultural', chinese: '农业'}, {name: 'insect', chinese: '昆虫'}, {
    name: 'albeit',
    chinese: '工作'
}, {name: 'wreaking', chinese: '惊魂未定'}, {name: 'pluck', chinese: '采摘'}, {
    name: 'groundless',
    chinese: '毫无根据的'
}, {name: 'hazard', chinese: '冒险，危害'}, {name: 'hazards', chinese: '危害'}, {
    name: 'resilience',
    chinese: '弹性韧性'
}, {name: 'imminence', chinese: '迫在眉睫'}, {name: 'wrestling', chinese: '摔跤（wrestle）'}, {
    name: 'ingenuity',
    chinese: '独创性'
}, {name: 'automation', chinese: '自动化'}, {name: 'forming', chinese: '成型'}, {
    name: 'electronics',
    chinese: '电子产品'
}, {name: 'devastating', chinese: '毁灭性的'}, {name: 'unemployment', chinese: '失业'}, {
    name: 'regulated',
    chinese: '受管控的'
}, {name: 'hiring', chinese: '招聘'}, {name: 'recruiting', chinese: '招聘'}, {
    name: 'lure',
    chinese: '引诱'
}, {name: 'sluggish', chinese: '迟缓'}, {name: 'rigorous', chinese: '严格的'}, {
    name: 'applicants',
    chinese: '申请人'
}, {name: 'facial', chinese: '面部的'}, {name: 'received', chinese: '收到的过去分词'}, {
    name: 'compelling',
    chinese: '令人信服的'
}, {name: 'preferably', chinese: '宁可'}, {name: 'renewable', chinese: '可再生的'}, {
    name: 'harness',
    chinese: '治理'
}, {name: 'hypothetical', chinese: '假设'}, {name: 'tidal', chinese: '潮汐'},]
