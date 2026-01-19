import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Brain className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4">
          探索真实的<span className="text-indigo-600">自己</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          通过专业的 MBTI 性格测试，只需 28 道题，即可深入了解你的性格特征、优势劣势以及潜在的职业发展方向。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
          <FeatureCard 
            icon={<Sparkles className="w-6 h-6 text-purple-500" />}
            title="精准分析"
            desc="基于荣格心理学理论，科学分析你的性格维度"
          />
          <FeatureCard 
            icon={<Brain className="w-6 h-6 text-indigo-500" />}
            title="深度解读"
            desc="提供详细的性格报告、职业建议和人际关系指南"
          />
          <FeatureCard 
            icon={<ArrowRight className="w-6 h-6 text-blue-500" />}
            title="快速测试"
            desc="精心设计的28道题目，5分钟内完成测试"
          />
        </div>

        <button
          onClick={() => navigate('/quiz')}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          开始测试
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <p className="text-sm text-gray-400 mt-8">
          已有超过 10,000+ 用户完成测试
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-left border border-gray-100">
    <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Home;
