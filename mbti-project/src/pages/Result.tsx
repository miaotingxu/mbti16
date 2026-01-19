
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { mbtiTypes } from '../data/mbtiData';
import { Share2, RefreshCw, Briefcase, TrendingUp, AlertCircle, Heart, Lightbulb, Users } from 'lucide-react';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultState = location.state as { type: string, scores: any } | null;

  // 滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!resultState) {
    return <Navigate to="/" replace />;
  }

  const { type, scores } = resultState;
  const data = mbtiTypes[type];

  // 根据类型决定颜色主题
  const getThemeColor = (type: string) => {
    if (type.includes('NT')) return 'from-indigo-600 to-purple-600';
    if (type.includes('NF')) return 'from-teal-500 to-emerald-600';
    if (type.includes('SJ')) return 'from-blue-500 to-cyan-600';
    if (type.includes('SP')) return 'from-amber-400 to-orange-500';
    return 'from-indigo-600 to-blue-600';
  };

  const themeGradient = getThemeColor(type);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
          <div className={`bg-gradient-to-r ${themeGradient} p-10 md:p-14 text-center text-white relative overflow-hidden`}>
            
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <span className="absolute -top-10 -left-10 text-[15rem] font-black">{type[0]}</span>
              <span className="absolute -bottom-10 -right-10 text-[15rem] font-black">{type[3]}</span>
            </div>

            <div className="relative z-10">
              <h2 className="text-xl font-medium opacity-90 mb-4 tracking-widest uppercase">你的 MBTI 性格类型</h2>
              <h1 className="text-7xl md:text-8xl font-black tracking-wider mb-4 drop-shadow-lg">{type}</h1>
              <p className="text-3xl md:text-4xl font-bold mb-8">{data.name}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {data.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/20 rounded-full text-sm md:text-base backdrop-blur-md border border-white/30 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12 bg-white">
            <p className="text-xl text-gray-700 leading-relaxed text-justify max-w-3xl mx-auto first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-2 first-letter:float-left">
              {data.description}
            </p>
          </div>
        </div>

        {/* Dimension Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DimensionCard 
              labelLeft="外向 (E)" labelRight="内向 (I)" 
              descLeft="关注外部世界" descRight="关注内心世界"
              scoreLeft={scores.E} scoreRight={scores.I} 
              color="blue"
            />
            <DimensionCard 
              labelLeft="实感 (S)" labelRight="直觉 (N)" 
              descLeft="关注现实细节" descRight="关注抽象可能"
              scoreLeft={scores.S} scoreRight={scores.N} 
              color="green"
            />
            <DimensionCard 
              labelLeft="理智 (T)" labelRight="情感 (F)" 
              descLeft="依据逻辑决策" descRight="依据价值决策"
              scoreLeft={scores.T} scoreRight={scores.F} 
              color="purple"
            />
            <DimensionCard 
              labelLeft="判断 (J)" labelRight="感知 (P)" 
              descLeft="喜欢计划有序" descRight="喜欢灵活自发"
              scoreLeft={scores.J} scoreRight={scores.P} 
              color="orange"
            />
        </div>

        {/* Deep Analysis Section - New! */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 ml-2 border-l-4 border-indigo-500 pl-4">深度分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextCard 
              title="工作风格" 
              content={data.workStyle}
              icon={<Briefcase className="w-6 h-6 text-blue-600" />}
              bg="bg-blue-50"
              borderColor="border-blue-100"
            />
            <TextCard 
              title="恋爱与人际" 
              content={data.relationships}
              icon={<Heart className="w-6 h-6 text-rose-600" />}
              bg="bg-rose-50"
              borderColor="border-rose-100"
            />
            <TextCard 
              title="成长建议" 
              content={data.advice}
              icon={<Lightbulb className="w-6 h-6 text-amber-600" />}
              bg="bg-amber-50"
              borderColor="border-amber-100"
            />
          </div>
        </div>

        {/* Lists Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ListCard 
            title="性格优势" 
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            items={data.strengths}
            bg="bg-emerald-50"
          />
          <ListCard 
            title="性格盲点" 
            icon={<AlertCircle className="w-5 h-5 text-rose-600" />}
            items={data.weaknesses}
            bg="bg-rose-50"
          />
          <ListCard 
            title="适合职业" 
            icon={<Users className="w-5 h-5 text-indigo-600" />}
            items={data.careers}
            bg="bg-indigo-50"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-6 pt-8 pb-12">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center px-8 py-4 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            重新测试
          </button>
          <button className="flex items-center px-8 py-4 bg-gray-900 rounded-full text-white font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <Share2 className="w-5 h-5 mr-2" />
            分享结果
          </button>
        </div>

      </div>
    </div>
  );
};

const DimensionCard = ({ labelLeft, labelRight, descLeft, descRight, scoreLeft, scoreRight, color }: any) => {
  const total = scoreLeft + scoreRight;
  const leftPct = total === 0 ? 50 : Math.round((scoreLeft / total) * 100);
  const rightPct = 100 - leftPct;

  const colorMap: Record<string, { main: string, sub: string, text: string }> = {
    blue: { main: 'bg-blue-500', sub: 'bg-blue-100', text: 'text-blue-600' },
    green: { main: 'bg-emerald-500', sub: 'bg-emerald-100', text: 'text-emerald-600' },
    purple: { main: 'bg-purple-500', sub: 'bg-purple-100', text: 'text-purple-600' },
    orange: { main: 'bg-amber-500', sub: 'bg-amber-100', text: 'text-amber-600' },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-end mb-3">
        <div className="text-left">
          <span className="text-lg font-bold text-gray-800 block">{labelLeft}</span>
          <span className="text-xs text-gray-500">{descLeft}</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-800 block">{labelRight}</span>
          <span className="text-xs text-gray-500">{descRight}</span>
        </div>
      </div>
      
      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden flex items-center">
        {/* Progress Bar */}
        <div 
          style={{ width: `${leftPct}%` }} 
          className={`h-full ${colors.main} transition-all duration-1000 ease-out`}
        ></div>
        <div 
          style={{ width: `${rightPct}%` }} 
          className={`h-full ${colors.sub} transition-all duration-1000 ease-out`}
        ></div>
        
        {/* Percentage Overlay */}
        <div className="absolute w-full flex justify-between px-2 text-[10px] font-bold text-white mix-blend-difference pointer-events-none">
          <span>{leftPct}%</span>
          <span>{rightPct}%</span>
        </div>
      </div>
    </div>
  );
};

const TextCard = ({ title, content, icon, bg, borderColor }: any) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border ${borderColor} h-full hover:shadow-md transition-all duration-300`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2.5 rounded-xl ${bg}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed text-justify">
      {content}
    </p>
  </div>
);

const ListCard = ({ title, icon, items, bg }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2.5 rounded-xl ${bg}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex items-start text-gray-600 text-sm">
          <span className={`mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${bg.replace('-50', '-400')}`}></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Result;
