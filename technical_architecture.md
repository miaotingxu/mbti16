# MBTI 性格测试网站 - 技术架构文档

## 1. 技术栈推荐
- **前端框架**：React 18
- **构建工具**：Vite
- **开发语言**：TypeScript
- **样式方案**：Tailwind CSS (快速构建响应式 UI)
- **路由管理**：React Router
- **状态管理**：React Context 或 Zustand (用于管理答题状态)
- **图标库**：Lucide React 或 Heroicons

## 2. 目录结构规划
```
src/
├── assets/          # 静态资源（图片、图标）
├── components/      # 公共组件
│   ├── Button.tsx
│   ├── ProgressBar.tsx
│   ├── QuestionCard.tsx
│   └── ResultChart.tsx
├── data/            # 静态数据文件
│   ├── questions.ts # 测试题目
│   └── types.ts     # 16种人格详情
├── pages/           # 页面组件
│   ├── Home.tsx
│   ├── Quiz.tsx
│   └── Result.tsx
├── utils/           # 工具函数
│   └── mbtiCalculator.ts # 计分逻辑
├── App.tsx
└── main.tsx
```

## 3. 数据结构定义

### 3.1 题目数据 (Question)
```typescript
interface Option {
  label: string; // 'A' | 'B'
  text: string;  // 选项描述
  value: string; // 对应的维度值，如 'E', 'I', 'S', 'N' 等
}

interface Question {
  id: number;
  question: string;
  options: [Option, Option];
  dimension: string; // 'EI' | 'SN' | 'TF' | 'JP'
}
```

### 3.2 人格类型数据 (MBTIResult)
```typescript
interface MBTIType {
  code: string;       // 如 'INTJ'
  name: string;       // 如 '建筑师'
  tags: string[];     // 标签
  description: string;// 详细描述
  strengths: string[];// 优势
  weaknesses: string[];// 劣势
  careers: string[];  // 推荐职业
}
```

## 4. 核心算法逻辑

### 4.1 计分规则
1. 初始化四个维度的计数器：
   ```typescript
   const scores = {
     E: 0, I: 0,
     S: 0, N: 0,
     T: 0, F: 0,
     J: 0, P: 0
   };
   ```
2. 遍历用户的选择，累加对应维度的分数。
3. 比较每对维度的分数，得出倾向性：
   - `EI` 维度：`E > I ? 'E' : 'I'`
   - `SN` 维度：`S > N ? 'S' : 'N'`
   - `TF` 维度：`T > F ? 'T' : 'F'`
   - `JP` 维度：`J > P ? 'J' : 'P'`
4. 将四个字母拼接，得到最终结果（如 "ENTP"）。

### 4.2 扩展功能（百分比计算）
为了展示倾向程度，可以计算百分比：
- E% = E / (E + I) * 100
- I% = I / (E + I) * 100
- (其他维度同理)

## 5. 开发步骤
1. **初始化项目**：使用 Vite 创建 React + TypeScript 项目。
2. **配置样式**：安装并配置 Tailwind CSS。
3. **数据准备**：将整理好的题目和人格数据写入 `src/data` 目录。
4. **路由搭建**：配置首页、测试页、结果页的路由。
5. **组件开发**：
   - 开发 `Quiz` 组件，实现答题逻辑和进度条。
   - 开发 `Calculator` 工具函数，实现 MBTI 算法。
   - 开发 `Result` 组件，展示结果和图表。
6. **测试与优化**：检查计分准确性，优化移动端适配。
