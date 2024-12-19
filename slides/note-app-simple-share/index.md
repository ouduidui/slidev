---
# You can also start simply with 'default'
theme: default
title: 「轻分享」当你想做一个笔记 App...
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
class: text-center
transition: slide-left
---

# 当你想做一个笔记 App...

<p class="text-2xl pt-3">「轻分享」</p>

<div class="abs-b m-6 text-sm">Dewey Ou</div>

---
transition: fade-out
layout: center
---

## 能用的编辑容器 / 框架

---
transition: fade-out
layout: two-cols
---

## 硬性要求

<div mt-10 v-click>

1. 可编辑
2. 可监听到相关的事件（input、selection、clipboard...）
3. 可以定义容器元素的样式

</div>

::right::

<v-click>

## 各端的编辑器框架

<div mt-10>

- **PC/Web**
  - [div + contenteditable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)（[Quill.js](https://quilljs.com/)、 [ProseMirror](https://prosemirror.net/)、 [Slate.js](https://docs.slatejs.org/)）
- **IOS**
  - [TextKit](https://developer.apple.com/documentation/appkit/textkit)、[TextKit 2](https://www.google.com.hk/search?q=TextKit2&newwindow=1&sca_esv=41cff334a491b950&sxsrf=ADLYWII2HgVuhDReLy5WO_N79aE9vq-qvQ%3A1733886789516&ei=RQNZZ7qQH4WX4-EP7dPouA0&ved=0ahUKEwj6xq3R356KAxWFyzgGHe0pGtcQ4dUDCA8&uact=5&oq=TextKit2&gs_lp=Egxnd3Mtd2l6LXNlcnAiCFRleHRLaXQyMgoQABiABBgKGMsBMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgYQABgKGB4yBBAAGB4yCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyBhAAGAoYHkibA1BHWEdwAXgBkAEAmAGAAqABgAKqAQMyLTG4AQPIAQD4AQGYAgKgAoUCwgIKEAAYsAMY1gQYR5gDAIgGAZAGBZIHBTEuMC4xoAfsAg&sclient=gws-wiz-serp)
- **Android**
  - [EditText](https://developer.android.com/reference/android/widget/EditText)

</div>

</v-click>

---
transition: fade-out
layout: center
---

<v-switch>
  <template #0> 
    <h2><b>数据</b> 驱动 <b>视图</b> </h2>
   </template>
  <template #1>
      <h2>先从数据开始看看</h2>
   </template>
</v-switch>

---
transition: fade-out
layout: image-left
image: ./assets/markdown.png
class: left-image
---

<v-click>

## 字符串 + XML 

</v-click>

<v-click>

```bash
'<h1>一级标题\n</h1><h2>二级标题\n</h2><quote>引用
\n</quote>正文<b>加错</b>,<a href="https://baidu.
com">链接</a>...\n<img src="image url"></img>'
```

</v-click>

<v-click>

<div mt-10>

存在一些问题：

- 可读性差
- 不易修改

</div>

</v-click>


---
layout: image-left
image: ./assets/markdown.png
class: left-image
---

## JSON + 语法树

<v-click>

````md magic-move
```json
[
  { 
    insert: "一级标题\n", attributes: { header: 1 } 
  },
]
```

```json
[
  { 
    insert: "一级标题\n", attributes: { header: 1 } 
  },
  { 
    insert: "二级标题\n", attributes: { header: 2 } 
  },
]
```

```json
[
  { 
    insert: "一级标题\n", attributes: { header: 1 } 
  },
  { 
    insert: "二级标题\n", attributes: { header: 2 } 
  },
  { insert: "引用\n", attributes: {quote: true} },
]
```

```json
[
  { 
    insert: "一级标题\n", attributes: { header: 1 } 
  },
  { 
    insert: "二级标题\n", attributes: { header: 2 } 
  },
  { insert: "引用\n", attributes: {quote: true} },
  { insert: "正文," },
  { insert: "加错"， attributes: {bold: true} },
  { insert: "," },
  { 
    insert: "链接"， 
    attributes: {link: "https://baidu.com"} 
  },
  { insert: "...\n" },
]
```

```json
[
  { 
    insert: "一级标题\n", attributes: { header: 1 } 
  },
  { 
    insert: "二级标题\n", attributes: { header: 2 } 
  },
  { insert: "引用\n", attributes: {quote: true} },
  { insert: "正文," },
  { insert: "加错"， attributes: {bold: true} },
  { insert: "," },
  { 
    insert: "链接"， 
    attributes: {link: "https://baidu.com"} 
  },
  { insert: "...\n" },
  { 
    insert: " ", 
    attributes: {
      image: "image url"
    } 
  },
  { insert: "\n" },
]
```
````

</v-click>

---
transition: fade-out
---

# Editor Demo

<!-- ./components/Editor.vue -->
<Editor />

---
transition: fade-out
---

## 每个端上，都有对应的数据层结构：

<div mt-10></div>

- PC/Web的Quill.js： Delta
- IOS 的 TextKit： NSAttributedString
- Android 的 EditText： SpannableString

<div v-click mt-10>

#### **它们都类似于语法树，将内容拆成子串，然而赋予对应的样式属性字段**

</div>

<div v-click mt-12>

#### 在视图层的时候，我们也就根据每个子串定义的属性字段，进行各自的 UI 渲染：
#### 加粗、斜体、超链接、图片、代码块等等…

</div>

---
transition: fade-out
---

## 整个编辑器的大致机制：

<div mt-10></div>

- 用户编辑内容
- modal 层监听到用户操作
- 将操作内容更新到数据层
- 数据层更新后，通知视图层
- 视图层根据数据层的内容，重新渲染视图


---
transition: fade-out
layout: center
---

## 实现一个编辑器的功能

---
transition: fade-out
---

## **粗体效果**

<div mt-10></div>

- 监听用户是不是打开了“粗体”效果
- 监听用户的输入
- 将新增的字段都赋予 `{ bold: true }` 属性
- 视图层识别到包含 `{ bold: true }` 的字段，对对应的子串内容渲染出粗体样式

---
transition: fade-out
---

## **markdown shortcut —— Header**

<div mt-10></div>

- 监听用户操作
- 识别当前输入行是否以 1～6 个连续“#”加空格开头的
- 将对应开头内容删除，给对应行内容都赋予 `{header: 1~6}` 属性
- 视图层识别到包含 `{header: 1~6}` 的子串，设置对应的标题样式

---
transition: fade-out
layout: center
---

<v-switch>
  <template #0>

<div text-center>

## 协同编辑

</div>

<div mt-5 text-center>

##### 协同编辑，就是允许多个用户/设备**同时在同一篇文档上编辑**
##### 确保所有用户的更改都能够被准确地记录和整合，提供无缝的用户体验

</div>

    
  </template>
  <template #1>
 
## 而协同，就绕不开**冲突**

   </template>
</v-switch>

---
transition: fade-out
---

## **举个例子🌰**

<div mt-10></div>

- 当文档内容是：“hell”
- 用户 A：“hell<span class="highlighted">o</span>”
- 用户 B：“hell<span class="highlighted">!</span>”
- 此时，A 和 B 都对同一行的内容进行了修改，就会产生冲突


<style>
.highlighted {
  background: #21e6c1;
}
</style>

---
transition: fade-out
---

## 常见的冲突解决方案


<div mt-10 v-click>

- **编辑锁**
  - 即对编辑的文档/区域上锁，禁止其他输入的修改，从而避免冲突的产生
  - 对于「多人编辑」场景没有强诉求的业务通常会使用，因为其实现简单成本最低

</div>

<div mt-4 v-click>

- **diff-patch**
  - 对内容进行差异对比、合并，属于半自动冲突解决，对于同一行的冲突需手动解决
  - 类似于 git 等版本管理工具
  - diff 和 patch 是一对工具，diff 可以比较两个内容之间的差异并记录下来，根据差异生成一个 patch，然后将 patch 应用于其他内容从而更新内容

</div>

<div mt-4 v-click>

- **最终一致性**
  - 系统自动帮你解决冲突，按照特定的先后顺序进行合并：时间戳等等
  - 系统不需要是正确的，它只需要保持一致，并且需要努力保持你的意图

</div>

---
transition: fade-out
layout: center
---

<div text-center>

## 最终一致性

</div>

<div mt-5 text-center>

##### 需要约定好先后顺序：时间戳 / 用户ID / 版本号等等

</div>

---
transition: fade-out
---

## OT 算法（Operational Transformation）

<v-switch>
  <template #1>

<div mt-5>

#### 流程

<div mt-2></div>

- 用户 A 会给服务端发起对应的操作记录： `{ position: 5, insert: "o" }`
- 用户 B 会给服务端发起对应的操作记录： `{ position: 5, insert: "!" }`
- 服务端会依照先后顺序，执行 A 的操作，即在第五个位置插入文本`a`，从而文本为：`hello`；
- 其次，服务端会去更新 B 的操作记录：`{ position: 6, insert: "!" }`
- 然后服务端继续执行 B 的操作，即在第六个位置插入文本`!`，从而文本为`hello!`

</div>

  </template>

   <template #2>

<div mt-5>

#### 核心原理

<div mt-2></div>

- 通过对用户操作进行转换，确保所有用户最终达成一致的文档状态

</div>

<div mt-5>

#### 落地

<div mt-2></div>

- Google Doc、Office365、飞书文档、钉钉、腾讯文档、石墨文档

</div>

  </template>

  <template #3>

<div mt-5>

#### 优点：

<div mt-2></div>

- **成熟度高，广泛应用**
- **性能较高，支持实时多用户编辑，低延迟**
  - OT 的中心化架构只需要处理操作差异，而非全量数据同步，传输数据量较小
  - 服务端通过操作队列管理冲突，客户端实现较轻量化
- **实现相对简单**
  - 对于线性文本编辑的场景，OT 的冲突解决逻辑相对直观
  - 操作变换的逻辑简单易懂，适合开发传统的中心化文档协同应用
- **适用于线性数据结构**
  - 对于富文本或代码编辑等以线性结构为主的数据类型，OT 的效率较高

</div>
  </template>

  <template #4>

<div mt-5>

#### 缺点：

<div mt-2></div>

- **依赖中心化服务**
  - OT 的操作转换通常依赖服务端统一管理，难以完全去中心化
  - 离线编辑支持较弱，用户必须连接到服务端才能同步和合并冲突
- **复杂的并发冲突解决**
  - 随着用户并发操作的增多，OT 的操作转换逻辑变得复杂，尤其是在非线性数据（如画布、树状结构）中
- **难以扩展到复杂数据结构**
  - 对于非线性数据（如图形、表格、嵌套数据结构等），OT 的适配和冲突解决较为困难

</div>
  </template>
</v-switch>

---
transition: fade-out
---

## CRDT 算法（Conflict-free Replicated Data Types）

<v-switch>
  <template #1>

<div mt-5>

#### 流程

<div mt-2></div>

- 用户 A 输入后，本地会为本次新增文本添加唯一 id：`5:timestampA`，然后将记录发给服务端： `{ insert: "o", id: "5:timestampA" }`
- 用户 B 输入后，本地会为本次新增文本添加唯一 id：`5:timestampB`，然后将记录发给服务端： `{ insert: "!", id: "5:timestampB" }`
- 服务端接收到请求后，会对每一个数据 ID 进行解析后排序，合并到队列中：`['h', 'e', 'l', 'l', { insert: "o", id: "5:timestampA" }, { insert: "!", id: "5:timestampB" } ]`
- 最后合并成文本：`hello!`

</div>

  </template>

   <template #2>

<div mt-5>

#### 核心原理

<div mt-2></div>

- 会给每个字符设置了一个 id，而在 id 会存储操作的 meta 信息，从而实现无冲突合并操作

</div>

<div mt-5>

#### 落地

<div mt-2></div>

- Figma、Notion、tldraw...

</div>

  </template>

  <template #3>

<div mt-5>

#### G-Counter（基于字符列表）

<div mt-2></div>

- 每个字符都有一个唯一的 ID 和位置
- 插入时，给新字符分配一个唯一的 ID，基于其前后字符的 ID 决定逻辑位置
- 删除时，只需标记该字符为“已删除”，而不会实际移除

<div mt-2></div>

**例子🌰**
1. 用户 A 在末尾插入 `"o"`：
  - 为 `"o"` 生成 ID `5:A`
  - 文档变为 `[h, e, l, l, (o:5:A)]`
2. 用户 B 同时在末尾插入 `"!"`：
  - 为 `"!"` 生成 ID `5:B`
  - 根据排序规则（如 A 优先于 B），文档变为 `[h, e, l, l, (o:5:A), (!:5:B)]`

#### 

</div>
  </template>

  <template #4>

<div mt-5>

#### RGA（基于引用关系）

<div mt-2></div>

- RGA (Replicated Growable Array) 是 CRDT 的一种实现，专注于线性文本。
- 每个字符会存储其前驱字符 ID，通过这种“链式”方式记录插入的位置。

<div mt-2></div>

**例子🌰**
1. 用户 A 插入 `"o"`，其前驱字符是 `"l"`：
  - 为 `"o"` 分配 ID `idA`，插入时记录为 `{value: "o", prev: idL}`。
2. 用户 B 同时插入 `"!"`，前驱也是 `"l"`：
  - 为 `"!"` 分配 ID `idB`，记录为 `{value: "!", prev: idL}`。
3. 最终合并规则按时间戳排序，生成链表结构：

```bash
h -> e -> l -> l -> o(idA) -> !(idB)
```

#### 

</div>
  </template>

  <template #5>

<div mt-5>

#### 优点：

<div mt-2></div>

- **天然支持离线和去中心化**
  - CRDT 的核心特性是冲突自动合并，客户端可以在完全离线的情况下生成和处理操作，稍后同步到其他节点
- **强一致性保证**
  - 在不依赖中心化服务的情况下，CRDT 能确保所有客户端最终达成一致的状态
  - 并发操作通过唯一 ID 和规则合并，无需复杂的操作变换逻辑
- **适用于复杂数据结构**
  - CRDT 能很好地处理非线性数据结构（如集合、列表、图形、嵌套结构等），因此适合富文本编辑、画布工具和图形协作
- **简化冲突解决**
  - CRDT 的冲突合并是通过数学模型（如偏序关系、增量合并）自动实现的，无需显式管理并发冲突

</div>
  </template>

  <template #6>

<div mt-5>

#### 缺点：

<div mt-2></div>

- **实现复杂**
  - CRDT 的实现需要对特定数据结构（如列表、集合、图等）设计专门的算法
- **存储和传输开销大**
  - CRDT 通常需要为每个数据项生成唯一 ID，这会显著增加存储和传输成本，尤其是在大规模协同编辑时
  - 如在文本编辑中，每个字符都需要存储一个元数据 ID，远远超过 OT 的操作记录体积
- **性能问题**
  - CRDT 在高并发场景中可能导致大量元数据膨胀（如字符的唯一 ID 列表），增加内存和带宽消耗
  - 需要额外的垃圾回收机制（如清理已删除的元素）来优化性能
- **一致性合并有局限性**
  - CRDT 的合并逻辑基于数学模型，对于某些复杂的冲突（如多个用户修改同一段文本并改变顺序），可能无法很好地解决语义冲突
  - 通常需要依赖应用层设计额外的冲突解决逻辑

</div>
  </template>
</v-switch>

---
transition: fade-out
---

## **so..**

<div mt-10></div>

#### **选择 OT 的场景**
- 中心化服务优先：如 Google Docs、Microsoft Office Online
- 线性数据结构为主：适合以文本为主的协作，如代码编辑器、文档编辑器
- 对存储和传输开销敏感：如带宽有限或存储空间有限的应用
  
<div mt-5></div>

#### **选择 CRDT 的场景**
- 去中心化和离线优先：如 Figma、Notion
- 复杂数据结构：如协同画布、嵌套文档、图形设计工具
- 高并发需求：如支持多人实时协作的动态应用

<div mt-5></div>

#### 趋势

CRDT 随着现代分布式系统的流行正在逐渐占据更多领域，尤其在需要高并发和离线支持的应用中，而 OT 依然在文本编辑等中心化协同场景中占据主导地位

---
layout: center
class: text-center
---

## End, thanks..

<PoweredBySlidev mt-10 />