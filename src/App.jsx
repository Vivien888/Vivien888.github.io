import { useMemo, useState } from 'react'
import {
  BarChart3,
  BookOpen,
  BookHeart,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlus,
  ClipboardCheck,
  Copy,
  Dumbbell,
  Feather,
  FileText,
  Flame,
  Home,
  ImagePlus,
  Link2,
  ListTodo,
  Menu,
  MessageCircle,
  Paperclip,
  Pencil,
  PenLine,
  Plus,
  Save,
  Search,
  Sparkles,
  Timer,
  Target,
  TrendingUp,
  Upload,
  WandSparkles,
  X,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'overview', label: '今日总览', icon: Home },
  { id: 'social', label: '内容数据', icon: BarChart3 },
  { id: 'journal', label: '电子手帐', icon: BookHeart },
  { id: 'todos', label: '待办清单', icon: ListTodo },
  { id: 'work', label: '工作记录', icon: BriefcaseBusiness },
  { id: 'plans', label: '规划一览', icon: Target },
  { id: 'learning', label: '学习资料', icon: BookOpen },
]

const seedTodos = [
  { id: 1, text: '整理本周项目进度', type: 'work', done: false },
  { id: 2, text: '回复合作方邮件', type: 'work', done: true },
  { id: 3, text: '下班后散步 30 分钟', type: 'life', done: false },
  { id: 4, text: '给妈妈打电话', type: 'life', done: false },
]

const seedJournal = [
  {
    id: 1,
    date: '10 月 7 日',
    mood: '🌤️',
    text: '今天把拖了很久的事情开了个头。没有想象中那么难，迈出第一步就已经很好。',
  },
  {
    id: 2,
    date: '10 月 6 日',
    mood: '🌿',
    text: '午休时晒到了很舒服的太阳，也喝到了喜欢的桂花拿铁。',
  },
]

const seedLogs = [
  { id: 1, date: '2026-10-07', project: '内容平台', text: '完成个人工作台的信息架构与交互梳理', link: '', image: '' },
  { id: 2, date: '2026-10-07', project: '增长实验', text: '复盘小红书近 10 篇笔记的数据表现', link: 'https://www.xiaohongshu.com', image: '' },
  { id: 3, date: '2026-10-06', project: '内容平台', text: '整理用户反馈，确定本周迭代优先级', link: '', image: '' },
]

const seedPlans = [
  {
    id: 1,
    title: '建立稳定的内容输出节奏',
    category: '成长',
    color: 'coral',
    steps: [
      { id: 11, text: '确定三个长期内容主题', done: true },
      { id: 12, text: '建立每周选题库', done: true },
      { id: 13, text: '连续四周稳定更新', done: false },
    ],
    notes: [{ id: 111, date: '10/06', text: '「下班后生活」系列反馈最好，继续深挖。' }],
  },
  {
    id: 2,
    title: '完成个人作品集网站',
    category: '工作',
    color: 'blue',
    steps: [
      { id: 21, text: '整理代表项目', done: true },
      { id: 22, text: '完成首页设计', done: false },
      { id: 23, text: '发布到个人域名', done: false },
    ],
    notes: [],
  },
  {
    id: 3,
    title: '每周运动三次',
    category: '健康',
    color: 'green',
    steps: [
      { id: 31, text: '购买适合的运动装备', done: true },
      { id: 32, text: '建立每周运动时间表', done: true },
      { id: 33, text: '连续坚持一个月', done: false },
    ],
    notes: [{ id: 311, date: '10/07', text: '本周完成两次，周末再安排一次散步。' }],
  },
]

const socialAccounts = {
  'xhs-tuimi': {
    platform: '小红书',
    account: '推米',
    name: '小红书',
    handle: '@推米',
    followers: '12,680',
    growth: '+8.4%',
    views: '186.2k',
    engagement: '9.6%',
    color: '#e85d5d',
    chart: [38, 44, 41, 58, 52, 71, 64, 83, 78, 96, 88, 110],
    posts: [
      { title: '一个人住，也要把生活过得热气腾腾', views: '42.8k', rate: '12.4%' },
      { title: '下班后的 3 小时，我是这样安排的', views: '31.6k', rate: '10.8%' },
      { title: '最近让我变开心的 7 件小事', views: '26.9k', rate: '9.7%' },
    ],
  },
  'xhs-jindaye': {
    platform: '小红书',
    account: '金大爷的日常',
    name: '小红书',
    handle: '@金大爷的日常',
    followers: '6,930',
    growth: '+11.2%',
    views: '108.5k',
    engagement: '11.3%',
    color: '#e85d5d',
    chart: [24, 32, 29, 38, 45, 43, 62, 58, 66, 81, 76, 92],
    posts: [
      { title: '金大爷今天第一次坐地铁', views: '36.2k', rate: '14.1%' },
      { title: '老爸退休后的普通一天', views: '28.7k', rate: '12.6%' },
      { title: '带金大爷去吃年轻人的火锅', views: '19.4k', rate: '10.8%' },
    ],
  },
  'douyin-jianmi': {
    platform: '抖音',
    account: '煎米',
    name: '抖音',
    handle: '@煎米',
    followers: '8,420',
    growth: '+5.1%',
    views: '328.4k',
    engagement: '6.8%',
    color: '#27262b',
    chart: [48, 55, 44, 69, 62, 78, 91, 74, 105, 99, 126, 119],
    posts: [
      { title: '普通女孩的一周生活记录', views: '89.3k', rate: '8.2%' },
      { title: '治愈系下班日常｜沉浸式 Vlog', views: '67.4k', rate: '7.5%' },
      { title: '把出租屋改成自己喜欢的样子', views: '51.8k', rate: '6.9%' },
    ],
  },
}

const seedLearning = [
  { id: 1, title: '内容创作者的数据分析方法', type: '文章', status: '在看', link: 'https://example.com/data', note: '重点看完播率和互动率之间的关系' },
  { id: 2, title: 'Building a Second Brain', type: '书籍', status: '待读', link: '', note: '整理信息管理方法' },
  { id: 3, title: 'AI Agent 产品设计公开课', type: '视频', status: '收藏', link: 'https://example.com/agent', note: '周末集中看完' },
]

const quotes = [
  '认真生活的人，自带光芒。',
  '允许一切发生，也相信一切会慢慢变好。',
  '你不需要很厉害才开始，但需要开始才会很厉害。',
  '日子是过以后，不是过从前。',
]

const TODAY = new Date()

function useLocalState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  const update = (next) => {
    setValue((current) => {
      const resolved = typeof next === 'function' ? next(current) : next
      localStorage.setItem(key, JSON.stringify(resolved))
      return resolved
    })
  }

  return [value, update]
}

function formatToday() {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(TODAY)
}

function planProgress(plan) {
  if (!plan.steps?.length) return plan.progress || 0
  return Math.round((plan.steps.filter((step) => step.done).length / plan.steps.length) * 100)
}

function imageFileToDataUrl(file, maxSize = 1200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const image = new Image()
      image.onerror = reject
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

function MiniChart({ values, color }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 45 - ((value - min) / (max - min || 1)) * 36
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className="mini-chart" viewBox="0 0 100 50" preserveAspectRatio="none" aria-label="近 12 周趋势">
      <defs>
        <linearGradient id={`fill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,50 ${points} 100,50`} fill={`url(#fill-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="empty-state">
      <Icon size={22} />
      <span>{text}</span>
    </div>
  )
}

function Overview({ todos, journal, plans, setPage, cover, onCover, title, setTitle }) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState(title)
  const activeTodos = todos.filter((todo) => !todo.done).slice(0, 4)
  const activePlans = plans.slice(0, 3)

  const saveTitle = () => {
    const nextTitle = titleDraft.trim()
    if (nextTitle) setTitle(nextTitle)
    else setTitleDraft(title)
    setEditingTitle(false)
  }

  return (
    <div className="page page-overview">
      <div className="cover" style={cover ? { backgroundImage: `url(${cover})` } : undefined}>
        <div className="cover-overlay" />
        <div className="cover-art">
          <span className="sun" />
          <span className="hill hill-one" />
          <span className="hill hill-two" />
        </div>
        <label className="cover-upload">
          <ImagePlus size={15} />
          更换封面
          <input type="file" accept="image/*" onChange={onCover} />
        </label>
      </div>

      <div className="overview-intro">
        <div className="page-emoji">☀️</div>
        <span className="eyebrow">{formatToday()}</span>
        {editingTitle ? (
          <div className="overview-title-edit">
            <input
              autoFocus
              value={titleDraft}
              onChange={(event) => setTitleDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') saveTitle()
                if (event.key === 'Escape') {
                  setTitleDraft(title)
                  setEditingTitle(false)
                }
              }}
              aria-label="首页标题"
            />
            <button onClick={saveTitle} aria-label="保存首页标题"><Save size={19} /></button>
          </div>
        ) : (
          <div className="overview-title">
            <h1>{title}</h1>
            <button
              onClick={() => {
                setTitleDraft(title)
                setEditingTitle(true)
              }}
              aria-label="修改首页标题"
            >
              <Pencil size={16} />
            </button>
          </div>
        )}
        <p>在这里整理生活，记录成长，也给忙碌的自己留一点呼吸的空间。</p>
      </div>

      <div className="quick-grid">
        <button className="quick-card coral" onClick={() => setPage('social')}>
          <div className="quick-icon"><TrendingUp size={20} /></div>
          <span>本周内容曝光</span>
          <strong>514.6k</strong>
          <small>较上周增长 12.8%</small>
        </button>
        <button className="quick-card butter" onClick={() => setPage('todos')}>
          <div className="quick-icon"><ClipboardCheck size={20} /></div>
          <span>今日待办</span>
          <strong>{activeTodos.length} 项</strong>
          <small>{todos.filter((todo) => todo.done).length} 项已经完成</small>
        </button>
        <button className="quick-card mint" onClick={() => setPage('plans')}>
          <div className="quick-icon"><Target size={20} /></div>
          <span>计划平均进度</span>
          <strong>{Math.round(plans.reduce((sum, item) => sum + planProgress(item), 0) / plans.length)}%</strong>
          <small>继续保持稳定节奏</small>
        </button>
      </div>

      <div className="overview-columns">
        <section className="panel">
          <div className="panel-head">
            <div><span className="eyebrow">TODAY</span><h2>今天要做的事</h2></div>
            <button className="text-link" onClick={() => setPage('todos')}>查看全部 <ChevronRight size={15} /></button>
          </div>
          <div className="compact-list">
            {activeTodos.map((todo) => (
              <div className="compact-todo" key={todo.id}>
                <span className={`type-dot ${todo.type}`} />
                <span>{todo.text}</span>
                <small>{todo.type === 'work' ? '工作' : '生活'}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel quote-panel">
          <Feather size={22} />
          <span className="eyebrow">TODAY'S NOTE</span>
          <blockquote>“{journal[0]?.text || quotes[0]}”</blockquote>
          <button className="text-link" onClick={() => setPage('journal')}>去写今天的手帐 <PenLine size={14} /></button>
        </section>
      </div>

      <section className="panel plan-strip">
        <div className="panel-head">
          <div><span className="eyebrow">MY PLANS</span><h2>正在发生的计划</h2></div>
          <button className="text-link" onClick={() => setPage('plans')}>规划一览 <ChevronRight size={15} /></button>
        </div>
        <div className="plan-mini-grid">
          {activePlans.map((plan) => (
            <div className="plan-mini" key={plan.id}>
              <div><span className={`plan-mark ${plan.color}`} /><strong>{plan.title}</strong></div>
              <div className="progress-track"><span className={plan.color} style={{ width: `${planProgress(plan)}%` }} /></div>
              <small>{planProgress(plan)}% · {plan.category}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function SocialPage() {
  const [account, setAccount] = useState('xhs-tuimi')
  const [draft, setDraft] = useState('下班后不要只刷手机，试试这 5 件能让生活慢下来的小事')
  const [optimized, setOptimized] = useState('')
  const [imports, setImports] = useLocalState('daylight-social-imports', {})
  const data = socialAccounts[account]

  const prediction = useMemo(() => {
    const lengthScore = Math.min(draft.length / 32, 1)
    const hookScore = /不要|试试|如何|为什么|这|我/.test(draft) ? 1 : 0.65
    return Math.round(58 + lengthScore * 18 + hookScore * 14)
  }, [draft])

  const optimize = () => {
    const isXhs = data.platform === '小红书'
    const prefix = isXhs ? '下班后别再无效休息了｜' : '下班后停止内耗，'
    const suffix = isXhs ? '（亲测真的会变开心）' : '这 5 件小事让我重新找回生活感'
    setOptimized(`${prefix}${draft.replace(/[，。]$/, '')}${suffix}`)
  }

  const importData = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const lines = String(reader.result).split(/\r?\n/).filter(Boolean).length
      setImports((current) => ({
        ...current,
        [account]: { file: file.name, rows: Math.max(lines - 1, 1), date: new Date().toLocaleDateString('zh-CN') },
      }))
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div className="page">
      <SectionTitle
        eyebrow="SOCIAL STUDIO"
        title="内容数据"
        description="管理「推米」「金大爷的日常」和「煎米」，把每一次发布变成下一次进步的线索。"
        action={(
          <label className="outline-button upload-button">
            <Upload size={16} /> 为当前账号导入
            <input type="file" accept=".csv,.json,.xlsx" onChange={importData} />
          </label>
        )}
      />

      <div className="platform-tabs">
        {Object.entries(socialAccounts).map(([key, item]) => (
          <button className={account === key ? 'active' : ''} key={key} onClick={() => setAccount(key)}>
            <span className={`platform-logo ${item.platform === '小红书' ? 'xhs' : 'douyin'}`}>{item.platform === '小红书' ? '小' : '抖'}</span>
            <span><strong>{item.account}</strong><small>{item.platform} · {item.handle}</small></span>
          </button>
        ))}
      </div>

      <div className="data-source-note">
        <div><Upload size={16} /><span><strong>当前使用手动数据导入</strong>支持平台导出的 CSV、JSON 数据。自动同步需要小红书、抖音开放平台授权及后端服务。</span></div>
        {imports[account] ? <small>最近导入：{imports[account].file} · {imports[account].rows} 条 · {imports[account].date}</small> : <small>当前账号还没有导入文件，页面展示示例数据</small>}
      </div>

      <div className="metric-grid">
        <div className="metric-card"><span>关注者</span><strong>{data.followers}</strong><small className="positive">{data.growth} 本月</small></div>
        <div className="metric-card"><span>近 30 天曝光</span><strong>{data.views}</strong><small>覆盖 18 篇内容</small></div>
        <div className="metric-card"><span>互动率</span><strong>{data.engagement}</strong><small className="positive">高于同类 3.2%</small></div>
        <div className="metric-card chart-card"><span>12 周趋势</span><MiniChart values={data.chart} color={data.color} /></div>
      </div>

      <div className="social-layout">
        <section className="panel posts-panel">
          <div className="panel-head"><div><span className="eyebrow">TOP POSTS</span><h2>表现最好的内容</h2></div><span className="soft-chip">近 30 天</span></div>
          <div className="post-list">
            {data.posts.map((post, index) => (
              <div className="post-row" key={post.title}>
                <span className="rank">0{index + 1}</span>
                <div><strong>{post.title}</strong><small>{post.views} 浏览</small></div>
                <span className="rate">{post.rate}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel insight-panel">
          <div className="codex-title"><span><Sparkles size={17} /></span><div><strong>Codex 内容助手</strong><small>正在分析：{data.account}</small></div></div>
          <p>{data.account === '金大爷的日常' ? '家庭互动和代际反差内容明显高于均值。建议保留真实对话，在开头三秒直接出现人物关系和冲突点。' : '你的「下班后生活」和「日常治愈感」内容明显高于均值。建议保持真实场景，同时让标题在前 12 个字里出现明确收益。'}</p>
          <div className="insight-tags"><span>生活方式</span><span>情绪价值</span><span>真实体验</span></div>
        </section>
      </div>

      <section className="panel creator-panel">
        <div className="creator-head">
          <div><span className="eyebrow">NEXT POST</span><h2>下一篇内容实验室</h2><p>写下初步想法，让 Codex 帮你优化标题并预估流量表现。</p></div>
          <div className="prediction-ring" style={{ '--score': `${prediction * 3.6}deg` }}>
            <div><strong>{prediction}</strong><small>潜力分</small></div>
          </div>
        </div>
        <div className="creator-grid">
          <div className="draft-box">
            <label>你的初稿</label>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} />
            <div><small>{draft.length} 字</small><button onClick={optimize}><WandSparkles size={15} /> 帮我优化</button></div>
          </div>
          <div className="result-box">
            <label>优化建议</label>
            {optimized ? (
              <>
                <strong>{optimized}</strong>
                <ul><li>标题前置冲突点，更容易停留</li><li>建议首图使用暖色生活场景</li><li>推荐发布时间：周四 20:30</li></ul>
              </>
            ) : (
              <div className="result-placeholder"><Sparkles size={22} /><span>点击「帮我优化」生成建议</span></div>
            )}
          </div>
        </div>
        <p className="integration-note">当前为本地预测演示。接入平台授权与 Codex API 后，可使用真实账号数据生成建议。</p>
      </section>
    </div>
  )
}

function JournalPage({ entries, setEntries }) {
  const [mood, setMood] = useState('🌤️')
  const [text, setText] = useState('')
  const today = TODAY
  const dateLabel = `${today.getMonth() + 1} 月 ${today.getDate()} 日`

  const addEntry = () => {
    if (!text.trim()) return
    setEntries((current) => [{ id: Date.now(), date: dateLabel, mood, text: text.trim() }, ...current])
    setText('')
  }

  return (
    <div className="page journal-page">
      <SectionTitle eyebrow="LITTLE JOYS" title="电子手帐" description="把值得记住的小事，轻轻放在这里。" />
      <div className="journal-hero">
        <div>
          <span className="eyebrow">A NOTE FOR YOU</span>
          <blockquote>“{quotes[TODAY.getDate() % quotes.length]}”</blockquote>
          <small>今日份温柔提醒</small>
        </div>
        <div className="doodle">✿</div>
      </div>

      <section className="panel journal-editor">
        <div className="editor-date"><CalendarDays size={18} /><strong>{formatToday()}</strong></div>
        <div className="mood-row">
          <span>此刻的心情</span>
          {['☀️', '🌤️', '🌿', '🌙', '🌧️'].map((item) => (
            <button className={mood === item ? 'active' : ''} key={item} onClick={() => setMood(item)}>{item}</button>
          ))}
        </div>
        <textarea
          placeholder="今天有什么让你开心的小事？哪怕只是一杯好喝的咖啡……"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="editor-actions"><small>不必写得完整，真实就很好。</small><button className="primary-button" onClick={addEntry}><Feather size={16} /> 收进手帐</button></div>
      </section>

      <div className="journal-timeline">
        {entries.map((entry) => (
          <article className="journal-entry" key={entry.id}>
            <div className="entry-date"><span>{entry.mood}</span><strong>{entry.date}</strong></div>
            <p>{entry.text}</p>
            <button aria-label="删除记录" onClick={() => setEntries((current) => current.filter((item) => item.id !== entry.id))}><X size={14} /></button>
          </article>
        ))}
      </div>
    </div>
  )
}

function TodosPage({ todos, setTodos }) {
  const [filter, setFilter] = useState('all')
  const [text, setText] = useState('')
  const [type, setType] = useState('work')
  const visible = todos.filter((todo) => filter === 'all' || todo.type === filter)

  const addTodo = () => {
    if (!text.trim()) return
    setTodos((current) => [...current, { id: Date.now(), text: text.trim(), type, done: false }])
    setText('')
  }

  const toggle = (id) => setTodos((current) => current.map((todo) => (
    todo.id === id ? { ...todo, done: !todo.done } : todo
  )))

  return (
    <div className="page">
      <SectionTitle eyebrow="TO DO, GENTLY" title="待办清单" description="工作认真完成，生活也别忘了好好体验。" />
      <div className="todo-summary">
        <div><span className="summary-orb work"><BriefcaseBusiness size={20} /></span><div><strong>{todos.filter((item) => item.type === 'work' && !item.done).length}</strong><small>项工作待办</small></div></div>
        <div><span className="summary-orb life"><BookHeart size={20} /></span><div><strong>{todos.filter((item) => item.type === 'life' && !item.done).length}</strong><small>项生活待办</small></div></div>
        <div className="completion"><span>今日完成度</span><strong>{todos.length ? Math.round(todos.filter((item) => item.done).length / todos.length * 100) : 0}%</strong><div className="progress-track"><span style={{ width: `${todos.length ? todos.filter((item) => item.done).length / todos.length * 100 : 0}%` }} /></div></div>
      </div>

      <section className="panel todo-panel">
        <div className="todo-toolbar">
          <div className="segmented">
            {[['all', '全部'], ['work', '工作'], ['life', '生活']].map(([key, label]) => (
              <button key={key} className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>
            ))}
          </div>
          <span>{visible.filter((item) => !item.done).length} 项未完成</span>
        </div>

        <div className="todo-add">
          <button className={`type-switch ${type}`} onClick={() => setType(type === 'work' ? 'life' : 'work')}>
            {type === 'work' ? '工作' : '生活'}
          </button>
          <input
            value={text}
            placeholder="添加一件要做的事，按回车保存"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}><Plus size={18} /></button>
        </div>

        <div className="todo-list">
          {visible.map((todo) => (
            <div className={`todo-item ${todo.done ? 'done' : ''}`} key={todo.id}>
              <button className={`todo-check ${todo.type}`} onClick={() => toggle(todo.id)}>{todo.done && <Check size={14} />}</button>
              <span>{todo.text}</span>
              <small className={todo.type}>{todo.type === 'work' ? '工作' : '生活'}</small>
              <button className="delete-button" onClick={() => setTodos((current) => current.filter((item) => item.id !== todo.id))}><X size={14} /></button>
            </div>
          ))}
          {!visible.length && <EmptyState icon={ClipboardCheck} text="这一栏还没有待办" />}
        </div>
      </section>
    </div>
  )
}

function WorkPage({ logs, setLogs }) {
  const [text, setText] = useState('')
  const [project, setProject] = useState('内容平台')
  const [date, setDate] = useState(TODAY.toISOString().slice(0, 10))
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')
  const [period, setPeriod] = useState('日报')
  const [copied, setCopied] = useState(false)

  const addLog = () => {
    if (!text.trim()) return
    setLogs((current) => [{
      id: Date.now(),
      date,
      project,
      text: text.trim(),
      link: link.trim(),
      image,
    }, ...current])
    setText('')
    setLink('')
    setImage('')
  }

  const uploadScreenshot = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const report = useMemo(() => {
    const grouped = logs.reduce((result, log) => {
      result[log.project] = [...(result[log.project] || []), log.text]
      return result
    }, {})
    return `【${period}】\n\n一、已完成\n${Object.entries(grouped).map(([name, items]) => `${name}\n${items.map((item) => `- ${item}`).join('\n')}`).join('\n\n')}\n\n二、相关资料\n共记录 ${logs.filter((log) => log.link).length} 个链接、${logs.filter((log) => log.image).length} 张截图\n\n三、下一步\n- 推进当前重点项目\n- 根据反馈调整执行优先级`
  }, [logs, period])

  const copyReport = async () => {
    await navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="page">
      <SectionTitle eyebrow="WORK NOTES" title="工作记录" description="记下每天推进的一小步，报告自然就有了。" />
      <div className="work-layout">
        <div>
          <section className="panel log-editor">
            <div className="panel-head"><div><span className="eyebrow">QUICK LOG</span><h2>记录一项进展</h2></div></div>
            <div className="form-row">
              <label>项目<input value={project} onChange={(event) => setProject(event.target.value)} /></label>
              <label>日期<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
            </div>
            <label>完成了什么<textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="例如：完成首页交互稿，并与开发确认实现范围" /></label>
            <label>相关链接<div className="input-with-icon"><Link2 size={15} /><input value={link} onChange={(event) => setLink(event.target.value)} placeholder="https://..." /></div></label>
            <div className="log-attachments">
              <label className="outline-button upload-button"><Paperclip size={15} /> 上传截图<input type="file" accept="image/*" onChange={uploadScreenshot} /></label>
              {image && <div className="attachment-preview"><img src={image} alt="待上传截图" /><button onClick={() => setImage('')}><X size={12} /></button></div>}
              <button className="primary-button" onClick={addLog}><CirclePlus size={16} /> 添加记录</button>
            </div>
          </section>

          <section className="panel log-history">
            <div className="panel-head"><div><span className="eyebrow">TIMELINE</span><h2>最近记录</h2></div></div>
            {logs.map((log) => (
              <div className="log-row" key={log.id}>
                <span className="log-date">{String(log.date).slice(5).replace('-', '/')}</span>
                <div className="log-content">
                  <strong>{log.text}</strong>
                  <small>{log.project}</small>
                  {(log.link || log.image) && <div className="log-resources">
                    {log.link && <a href={log.link} target="_blank" rel="noreferrer"><Link2 size={12} /> 查看链接</a>}
                    {log.image && <a href={log.image} target="_blank" rel="noreferrer"><ImagePlus size={12} /> 查看截图</a>}
                  </div>}
                </div>
                <button className="delete-button" onClick={() => setLogs((current) => current.filter((item) => item.id !== log.id))}><X size={14} /></button>
              </div>
            ))}
          </section>
        </div>

        <section className="panel report-panel">
          <div className="report-top">
            <div><span className="eyebrow">AUTO REPORT</span><h2>自动报告</h2></div>
            <div className="segmented">
              {['日报', '周报', '月报'].map((item) => <button className={period === item ? 'active' : ''} key={item} onClick={() => setPeriod(item)}>{item}</button>)}
            </div>
          </div>
          <pre>{report}</pre>
          <button className="outline-button copy-button" onClick={copyReport}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? '已复制' : `复制${period}`}</button>
          <div className="ai-tip"><Sparkles size={16} /><span>报告会根据工作记录实时整理，你可以直接复制后再做细节调整。</span></div>
        </section>
      </div>
    </div>
  )
}

function CategoryManager({ label, categories, setCategories, active, setActive }) {
  const [name, setName] = useState('')

  const addCategory = () => {
    const next = name.trim()
    if (!next || categories.some((item) => item.toLowerCase() === next.toLowerCase())) return
    setCategories((current) => [...current, next])
    setActive(next)
    setName('')
  }

  const removeCategory = (item) => {
    if (categories.length <= 1) return
    const next = categories.filter((category) => category !== item)
    setCategories(next)
    if (active === item) setActive(next[0])
  }

  return (
    <div className="category-manager">
      <span>{label}</span>
      <div className="category-chips">
        {categories.map((item) => (
          <button className={active === item ? 'active' : ''} key={item} onClick={() => setActive(item)}>
            {item}
            <X
              size={11}
              onClick={(event) => {
                event.stopPropagation()
                removeCategory(item)
              }}
            />
          </button>
        ))}
      </div>
      <div className="category-add">
        <input value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addCategory()} placeholder="新分类" />
        <button onClick={addCategory} aria-label="添加分类"><Plus size={14} /></button>
      </div>
    </div>
  )
}

function PlansPage({ plans, setPlans, categories, setCategories }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [expanded, setExpanded] = useState([])

  const addPlan = () => {
    if (!title.trim()) return
    const colors = ['coral', 'blue', 'green', 'violet']
    setPlans((current) => [...current, {
      id: Date.now(),
      title: title.trim(),
      category,
      color: colors[current.length % colors.length],
      steps: [],
      notes: [],
      photos: [],
      checkins: [],
    }])
    setTitle('')
  }

  const updatePlan = (id, updater) => setPlans((current) => current.map((plan) => (
    plan.id === id ? updater({
      ...plan,
      steps: plan.steps || [],
      notes: plan.notes || [],
      photos: plan.photos || [],
      checkins: plan.checkins || [],
    }) : plan
  )))

  const toggleExpanded = (id) => setExpanded((current) => (
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  ))

  return (
    <div className="page">
      <SectionTitle eyebrow="LIFE MAP" title="规划一览" description="把想做的事情放在看得见的地方，然后慢慢靠近。" />

      <section className="vision-card">
        <div><span className="eyebrow">THIS YEAR</span><h2>我想成为一个更自由、更有创造力的人。</h2><p>稳定工作，认真生活，持续表达，也保留随时出发的能力。</p></div>
        <span className="vision-spark">✦</span>
      </section>

      <CategoryManager label="规划分类" categories={categories} setCategories={setCategories} active={category} setActive={setCategory} />

      <div className="plan-add">
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <input value={title} onChange={(event) => setTitle(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addPlan()} placeholder="添加一个想实现的计划" />
        <button className="primary-button" onClick={addPlan}><Plus size={16} /> 添加计划</button>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            expanded={expanded.includes(plan.id)}
            onToggle={() => toggleExpanded(plan.id)}
            onUpdate={(updater) => updatePlan(plan.id, updater)}
            onDelete={() => setPlans((current) => current.filter((item) => item.id !== plan.id))}
          />
        ))}
      </div>
    </div>
  )
}

function PlanCard({ plan, expanded, onToggle, onUpdate, onDelete }) {
  const [stepText, setStepText] = useState('')
  const [noteText, setNoteText] = useState('')
  const [checkinDate, setCheckinDate] = useState(TODAY.toISOString().slice(0, 10))
  const [activity, setActivity] = useState('')
  const [duration, setDuration] = useState('')
  const [calories, setCalories] = useState('')
  const steps = plan.steps || []
  const notes = plan.notes || []
  const photos = plan.photos || []
  const checkins = plan.checkins || []
  const progress = planProgress({ ...plan, steps })

  const addStep = () => {
    if (!stepText.trim()) return
    onUpdate((current) => ({ ...current, steps: [...current.steps, { id: Date.now(), text: stepText.trim(), done: false }] }))
    setStepText('')
  }

  const addNote = () => {
    if (!noteText.trim()) return
    onUpdate((current) => ({
      ...current,
      notes: [{ id: Date.now(), date: `${TODAY.getMonth() + 1}/${String(TODAY.getDate()).padStart(2, '0')}`, text: noteText.trim() }, ...current.notes],
    }))
    setNoteText('')
  }

  const addPhotos = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return
    const urls = await Promise.all(files.map((file) => imageFileToDataUrl(file)))
    const date = `${TODAY.getMonth() + 1}/${String(TODAY.getDate()).padStart(2, '0')}`
    onUpdate((current) => ({
      ...current,
      photos: [
        ...urls.map((url, index) => ({ id: Date.now() + index, date, url })),
        ...current.photos,
      ],
    }))
    event.target.value = ''
  }

  const addCheckin = () => {
    if (!checkinDate || !activity.trim()) return
    onUpdate((current) => ({
      ...current,
      checkins: [{
        id: Date.now(),
        date: checkinDate,
        activity: activity.trim(),
        duration: Math.max(0, Number(duration) || 0),
        calories: Math.max(0, Number(calories) || 0),
      }, ...current.checkins],
    }))
    setActivity('')
    setDuration('')
    setCalories('')
  }

  return (
    <article className={`plan-card expandable ${plan.color} ${expanded ? 'is-open' : ''}`}>
      <div className="plan-card-head"><span>{plan.category}</span><button onClick={onDelete}><X size={14} /></button></div>
      <button className="plan-main" onClick={onToggle}>
        <h3>{plan.title}</h3>
        <ChevronRight size={18} />
      </button>
      <div className="big-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="plan-progress-label">
        <strong>{progress}%</strong>
        <small>{steps.filter((step) => step.done).length}/{steps.length} 个步骤完成 · 点击展开</small>
      </div>

      {expanded && (
        <div className="plan-details">
          <div className="plan-detail-block">
            <span className="detail-title">完成步骤</span>
            <div className="step-list">
              {steps.map((step) => (
                <label className={step.done ? 'done' : ''} key={step.id}>
                  <input
                    type="checkbox"
                    checked={step.done}
                    onChange={() => onUpdate((current) => ({
                      ...current,
                      steps: current.steps.map((item) => item.id === step.id ? { ...item, done: !item.done } : item),
                    }))}
                  />
                  <span>{step.text}</span>
                  <button onClick={(event) => {
                    event.preventDefault()
                    onUpdate((current) => ({ ...current, steps: current.steps.filter((item) => item.id !== step.id) }))
                  }}><X size={12} /></button>
                </label>
              ))}
            </div>
            <div className="inline-add">
              <input value={stepText} onChange={(event) => setStepText(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addStep()} placeholder="添加一个小步骤" />
              <button onClick={addStep}><Plus size={15} /></button>
            </div>
          </div>

          <div className="plan-detail-block">
            <span className="detail-title">过程记录</span>
            <div className="inline-add">
              <input value={noteText} onChange={(event) => setNoteText(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addNote()} placeholder="记录今天的进展或想法" />
              <button onClick={addNote}><PenLine size={14} /></button>
            </div>
            <div className="plan-notes">
              {notes.map((note) => <p key={note.id}><small>{note.date}</small>{note.text}</p>)}
              {!notes.length && <small className="muted-empty">还没有过程记录</small>}
            </div>
            <div className="plan-photo-head">
              <span className="detail-title">过程照片</span>
              <label className="plan-photo-upload">
                <ImagePlus size={14} /> 上传照片
                <input type="file" accept="image/*" multiple onChange={addPhotos} />
              </label>
            </div>
            <div className="plan-photo-grid">
              {photos.map((photo) => (
                <figure key={photo.id}>
                  <img src={photo.url} alt={`${plan.title}的过程记录`} />
                  <figcaption>{photo.date}</figcaption>
                  <button
                    onClick={() => onUpdate((current) => ({
                      ...current,
                      photos: current.photos.filter((item) => item.id !== photo.id),
                    }))}
                    aria-label="删除照片"
                  >
                    <X size={12} />
                  </button>
                </figure>
              ))}
              {!photos.length && <small className="muted-empty">还没有过程照片</small>}
            </div>
          </div>
          <div className="plan-detail-block checkin-block">
            <div className="checkin-heading">
              <div>
                <span className="detail-title">每日打卡</span>
                <strong>{checkins.length} 次记录</strong>
              </div>
              <Dumbbell size={20} />
            </div>
            <div className="checkin-form">
              <input type="date" value={checkinDate} onChange={(event) => setCheckinDate(event.target.value)} aria-label="打卡日期" />
              <input value={activity} onChange={(event) => setActivity(event.target.value)} placeholder="锻炼了什么" />
              <div className="number-input"><Timer size={14} /><input type="number" min="0" value={duration} onChange={(event) => setDuration(event.target.value)} placeholder="时长（分钟）" /></div>
              <div className="number-input"><Flame size={14} /><input type="number" min="0" value={calories} onChange={(event) => setCalories(event.target.value)} placeholder="消耗（千卡）" /></div>
              <button className="primary-button" onClick={addCheckin}><Check size={15} /> 完成打卡</button>
            </div>
            <div className="checkin-list">
              {checkins.map((checkin) => (
                <div className="checkin-item" key={checkin.id}>
                  <span className="checkin-mark"><Check size={13} /></span>
                  <div><strong>{checkin.activity}</strong><small>{checkin.date}</small></div>
                  <span><Timer size={12} /> {checkin.duration || 0} 分钟</span>
                  <span><Flame size={12} /> {checkin.calories || 0} 千卡</span>
                  <button
                    onClick={() => onUpdate((current) => ({
                      ...current,
                      checkins: current.checkins.filter((item) => item.id !== checkin.id),
                    }))}
                    aria-label="删除打卡"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {!checkins.length && <small className="muted-empty">今天完成锻炼后，就来留下第一条记录吧</small>}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

function LearningPage({ resources, setResources, resourceTypes, setResourceTypes }) {
  const resourceStatuses = ['待读', '在看', '已完成', '收藏']
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('全部')
  const [title, setTitle] = useState('')
  const [type, setType] = useState(resourceTypes[0])
  const [resourceStatus, setResourceStatus] = useState('待读')
  const [link, setLink] = useState('')
  const [note, setNote] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState(null)

  const visible = resources.filter((item) => (
    (status === '全部' || item.status === status)
    && `${item.title}${item.note}`.toLowerCase().includes(query.toLowerCase())
  ))

  const addResource = () => {
    if (!title.trim()) return
    setResources((current) => [{
      id: Date.now(),
      title: title.trim(),
      type,
      status: resourceStatus,
      link: link.trim(),
      note: note.trim(),
    }, ...current])
    setTitle('')
    setLink('')
    setNote('')
  }

  const beginEdit = (resource) => {
    setEditingId(resource.id)
    setEditDraft({ ...resource })
  }

  const saveResource = () => {
    if (!editDraft?.title.trim()) return
    setResources((current) => current.map((item) => (
      item.id === editingId
        ? { ...editDraft, title: editDraft.title.trim(), link: (editDraft.link || '').trim(), note: (editDraft.note || '').trim() }
        : item
    )))
    setEditingId(null)
    setEditDraft(null)
  }

  return (
    <div className="page">
      <SectionTitle eyebrow="LEARNING SHELF" title="学习资料" description="把想看、正在看和舍不得忘记的内容，收进自己的知识书架。" />
      <section className="panel learning-add">
        <div className="panel-head"><div><span className="eyebrow">NEW RESOURCE</span><h2>收藏一份资料</h2></div></div>
        <CategoryManager label="资料分类" categories={resourceTypes} setCategories={setResourceTypes} active={type} setActive={setType} />
        <div className="learning-form">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="资料标题" />
          <select value={type} onChange={(event) => setType(event.target.value)}>{resourceTypes.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={resourceStatus} onChange={(event) => setResourceStatus(event.target.value)}>{resourceStatuses.map((item) => <option key={item}>{item}</option>)}</select>
          <div className="input-with-icon"><Link2 size={15} /><input value={link} onChange={(event) => setLink(event.target.value)} placeholder="链接（可选）" /></div>
          <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="为什么想看 / 需要记住什么" />
          <button className="primary-button" onClick={addResource}><Plus size={16} /> 收进书架</button>
        </div>
      </section>

      <div className="learning-toolbar">
        <div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索资料" /></div>
        <div className="segmented">{['全部', ...resourceStatuses].map((item) => <button className={status === item ? 'active' : ''} key={item} onClick={() => setStatus(item)}>{item}</button>)}</div>
      </div>

      <div className="resource-grid">
        {visible.map((resource) => (
          <article className="resource-card" key={resource.id}>
            {editingId === resource.id ? (
              <div className="resource-edit">
                <input value={editDraft.title} onChange={(event) => setEditDraft((current) => ({ ...current, title: event.target.value }))} placeholder="资料标题" />
                <div>
                  <select value={editDraft.type} onChange={(event) => setEditDraft((current) => ({ ...current, type: event.target.value }))}>{[...new Set([editDraft.type, ...resourceTypes])].map((item) => <option key={item}>{item}</option>)}</select>
                  <select value={editDraft.status} onChange={(event) => setEditDraft((current) => ({ ...current, status: event.target.value }))}>{resourceStatuses.map((item) => <option key={item}>{item}</option>)}</select>
                </div>
                <input value={editDraft.link} onChange={(event) => setEditDraft((current) => ({ ...current, link: event.target.value }))} placeholder="链接（可选）" />
                <textarea value={editDraft.note} onChange={(event) => setEditDraft((current) => ({ ...current, note: event.target.value }))} placeholder="持续记录用法、心得或重要信息" />
                <div className="resource-edit-actions">
                  <button onClick={() => { setEditingId(null); setEditDraft(null) }}>取消</button>
                  <button className="primary-button" onClick={saveResource}><Save size={14} /> 保存</button>
                </div>
              </div>
            ) : (
              <>
                <div className="resource-top"><span className={`resource-icon ${resource.type}`}><FileText size={19} /></span><span className={`resource-status ${resource.status}`}>{resource.status}</span></div>
                <h3>{resource.title}</h3>
                <p>{resource.note || '暂时还没有笔记'}</p>
                <div className="resource-foot">
                  <small>{resource.type}</small>
                  <div>
                    {resource.link && <a href={resource.link} target="_blank" rel="noreferrer"><Link2 size={14} /></a>}
                    <button onClick={() => beginEdit(resource)} aria-label="编辑资料"><Pencil size={13} /></button>
                    <button onClick={() => setResources((current) => current.filter((item) => item.id !== resource.id))} aria-label="删除资料"><X size={14} /></button>
                  </div>
                </div>
              </>
            )}
          </article>
        ))}
        {!visible.length && <EmptyState icon={BookOpen} text="没有找到相关资料" />}
      </div>
    </div>
  )
}

function EditableBrand({ name, setName }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)

  const save = () => {
    const next = draft.trim() || '日光簿'
    setName(next)
    setDraft(next)
    setEditing(false)
  }

  return (
    <div className="brand">
      <span className="brand-mark"><Sparkles size={18} /></span>
      <div className="brand-copy">
        {editing ? (
          <div className="brand-edit"><input value={draft} autoFocus onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && save()} /><button onClick={save}><Save size={13} /></button></div>
        ) : (
          <div className="brand-name"><strong>{name}</strong><button aria-label="修改网站名称" onClick={() => setEditing(true)}><Pencil size={12} /></button></div>
        )}
        <small>My little universe</small>
      </div>
    </div>
  )
}

function AbbyAgent() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, role: 'agent', text: '嗨，我是金金 ✦ 今天想和我聊点什么？我可以帮你整理计划、拆解待办，也可以陪你复盘内容。' },
  ])

  const reply = (text) => {
    if (/计划|目标/.test(text)) return '可以先把目标拆成三个足够小的步骤：明确结果、安排第一次行动、设置复盘时间。要不要把你的目标告诉我？'
    if (/小红书|抖音|内容|标题/.test(text)) return '建议先确定这条内容给谁看、解决什么情绪或问题，再把结果前置到标题。你可以把初稿发给我。'
    if (/累|焦虑|难过/.test(text)) return '先不用急着解决所有事情。喝口水，慢慢呼吸一下，然后只选今天最重要的一件事，好吗？'
    if (/日报|周报|工作/.test(text)) return '你可以先去「工作记录」记下今天完成的事情，我会根据记录帮你整理成日报、周报或月报。'
    return '我记下了。我们可以把这件事再说具体一点：你现在最希望得到一个答案、一个计划，还是一点陪伴？'
  }

  const send = (preset) => {
    const text = (preset || input).trim()
    if (!text) return
    setMessages((current) => [...current, { id: Date.now(), role: 'user', text }])
    setInput('')
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'agent', text: reply(text) }])
    }, 350)
  }

  return (
    <div className={`abby ${open ? 'open' : ''}`}>
      {open && (
        <section className="abby-panel">
          <header><img className="abby-face small" src="/jinjin-avatar.jpg" alt="金金" /><div><strong>金金</strong><small>你的随身生活 Agent</small></div><button onClick={() => setOpen(false)}><X size={17} /></button></header>
          <div className="abby-messages">
            {messages.map((message) => <p className={message.role} key={message.id}>{message.text}</p>)}
          </div>
          <div className="abby-prompts">
            {['帮我拆解计划', '优化内容标题', '整理今天工作'].map((item) => <button key={item} onClick={() => send(item)}>{item}</button>)}
          </div>
          <div className="abby-input"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder="和金金说点什么…" /><button onClick={() => send()}><MessageCircle size={17} /></button></div>
          <small className="abby-note">当前为本地助手。接入 Codex API 后可升级为真实 Agent。</small>
        </section>
      )}
      <button className="abby-fab" onClick={() => setOpen((current) => !current)} aria-label="打开金金">
        <img className="abby-face" src="/jinjin-avatar.jpg" alt="" />
        <span>金金</span>
      </button>
    </div>
  )
}

function App() {
  const [page, setPage] = useState('overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [siteName, setSiteName] = useLocalState('daylight-site-name', '日光簿')
  const [homeTitle, setHomeTitle] = useLocalState('daylight-home-title', '下午好，今天也要好好生活。')
  const [cover, setCover] = useLocalState('daylight-cover', '')
  const [todos, setTodos] = useLocalState('daylight-todos', seedTodos)
  const [entries, setEntries] = useLocalState('daylight-journal', seedJournal)
  const [logs, setLogs] = useLocalState('daylight-logs', seedLogs)
  const [plans, setPlans] = useLocalState('daylight-plans', seedPlans)
  const [planCategories, setPlanCategories] = useLocalState('daylight-plan-categories', ['成长', '工作', '健康', '生活', '旅行'])
  const [resources, setResources] = useLocalState('daylight-learning', seedLearning)
  const [learningTypes, setLearningTypes] = useLocalState('daylight-learning-types', ['文章', '视频', '书籍', '课程', '播客', '工具', 'Skill'])

  const changePage = (next) => {
    setPage(next)
    setMobileNav(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCover = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCover(reader.result)
    reader.readAsDataURL(file)
  }

  let content
  if (page === 'social') content = <SocialPage />
  if (page === 'journal') content = <JournalPage entries={entries} setEntries={setEntries} />
  if (page === 'todos') content = <TodosPage todos={todos} setTodos={setTodos} />
  if (page === 'work') content = <WorkPage logs={logs} setLogs={setLogs} />
  if (page === 'plans') content = <PlansPage plans={plans} setPlans={setPlans} categories={planCategories} setCategories={setPlanCategories} />
  if (page === 'learning') content = <LearningPage resources={resources} setResources={setResources} resourceTypes={learningTypes} setResourceTypes={setLearningTypes} />
  if (!content) content = <Overview todos={todos} journal={entries} plans={plans} setPage={changePage} cover={cover} onCover={handleCover} title={homeTitle} setTitle={setHomeTitle} />

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <EditableBrand name={siteName} setName={setSiteName} />

        <nav>
          <span className="nav-label">我的空间</span>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => changePage(item.id)}>
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-quote">“不用很用力，也可以慢慢成为喜欢的自己。”</div>
      </aside>

      {mobileNav && <button className="nav-backdrop" aria-label="关闭导航" onClick={() => setMobileNav(false)} />}
      <main className="content">
        <header className="mobile-header">
          <button onClick={() => setMobileNav(true)}><Menu size={21} /></button>
          <strong>{siteName}</strong>
          <span />
        </header>
        {content}
      </main>
      <AbbyAgent />
    </div>
  )
}

export default App
