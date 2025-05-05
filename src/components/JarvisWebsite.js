import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JarvisWebsite() {
  const [activeTab, setActiveTab] = useState("About");

  const tabs = ["About", "Technology", "Side Quests"];

  const renderContent = () => {
    switch (activeTab) {
      case "About":
        return (
            <div className="p-6">
              <div className="bg-gray-800 border border-cyan-400 rounded-xl p-6 shadow-md animate-glow">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src="/profile.jpeg"
                    alt="Greg Lee"
                    className="w-40 h-40 rounded-full border-4 border-cyan-400 shadow-lg"
                  />
                  <p className="text-cyan-200 leading-relaxed">
                    I’m a <strong className="text-cyan-400">Computer Science</strong> Sophomore at Singapore Management University and a proud recipient of the 
                    <strong className="text-cyan-400"> DSTA Merit Scholarship</strong>. 
                    My passion lies in <strong className="text-cyan-400">building and leading innovative Artificial Intelligence solutions</strong>  that make a real-world impact — especially in the domain of national defence. <br /><br />
                    I believe that technology should <strong className="text-cyan-400">serve both security and society</strong> and I’m committed to using my skills to bridge that purpose. 
                    With a deep interest in defence technology, I see it not just as intriguing but also critical. I’m excited to help shape a future of smart, ethical systems that protect and empower communities. <br /><br />
                    The reason this website is JARVIS-themed is deeply personal. Before I formally chose Computer Science, I have always admired
                    <strong className="text-cyan-400"> Marvel’s Iron Man</strong>: a charismatic visionary who used technology for good.
                  </p>
                </div>
          
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="https://linkedin.com/in/gregleejy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-400 text-gray-900 font-semibold rounded hover:bg-cyan-500 transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://leetcode.com/gregleejy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-400 text-gray-900 font-semibold rounded hover:bg-cyan-500 transition"
                  >
                    LeetCode
                  </a>
                  <a
                    href="https://github.com/gregleejy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-400 text-gray-900 font-semibold rounded hover:bg-cyan-500 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          );
          
          case "Technology":
            return (
              <div className="p-6">
                <div className="bg-gray-800 border border-cyan-400 rounded-xl p-6 shadow-md animate-glow">
                  <h2 className="text-2xl font-bold mb-4">Career</h2>
          
                  {/* Experience */}
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">Experience</h3>
                  <ul className="list-disc list-inside text-cyan-200 mb-6">
                    <li>President, SMU Business Intelligence & Analytics Club (2025 – Present)</li>
                    <li>Data Associate, SMU Business Intelligence & Analytics Club (2024 – 2025)</li>
                    <li>Teaching Intern, Ministry of Education (2021)</li>
                  </ul>
          
                  {/* Awards */}
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">Awards</h3>
                  <ul className="list-disc list-inside text-cyan-200 mb-6">
                    <li>Defence Science & Technology Agency Merit Scholarship (2025)</li>
                    <li>Raffles Institution F.I.R.E Award (2021)</li>
                    <li>Good Progress Award (2011, 2016, 2021)</li>
                  </ul>
          
                    {/* Education */}
                    <h3 className="text-xl font-semibold mb-2 text-cyan-400">Education</h3>
                    <ul className="list-disc list-inside text-cyan-200 mb-6">
                    <li>
                        <strong>Singapore Management University</strong> (2024 – 2028)<br />
                    </li>
                    <li>
                        <strong>Raffles Institution</strong> (2020 – 2021)<br />
                    </li>
                    <li>
                        <strong>Catholic High School</strong> (2016 – 2019)<br />
                    </li>
                    </ul>

                    {/* Projects */}
                    <h3 className="text-xl font-semibold mb-2 text-cyan-400">Projects</h3>
                    <ul className="list-disc list-inside text-cyan-200">
                    <li>
                        <strong>SignBridge</strong> – Real-time speech-to-sign language translator (2025)<br />
                    </li>
                    <li>
                        <strong>Aspect-Based Sentiment Analysis for Mental Health</strong> (2024 – 2025)<br />
                    </li>
                    </ul>
                </div>
              </div>
            );
          
          
            case "Side Quests":
                return (
                  <div className="p-6">
                    <div className="bg-gray-800 border border-cyan-400 rounded-xl p-6 shadow-md animate-glow">
                      <h2 className="text-2xl font-bold mb-4">Side Quests</h2>
              
                      {/* Football Section */}
                      <h3 className="text-xl font-semibold mb-2 text-cyan-400">⚽ Football</h3>
                      <ul className="list-disc list-inside text-cyan-200 mb-6">
                        <li>
                          <strong>Programme Manager, Lion City Sailors Football Club</strong> (2025)<br />
                        </li>
                        <li>
                          <strong>Exco, Singapore Management University Varsity Football</strong> (2024 - Present)<br />
                        </li>
                        <li>
                          <strong>Assistant Coach, Singapore Football Club</strong> (2022)<br />
                        </li>
                        <li>
                          <strong>Vice-Captain, Raffles Institution Football</strong> (2020–2021)<br />
                        </li>
                      </ul>
              
                      {/* Community Section */}
                      <h3 className="text-xl font-semibold mb-2 text-cyan-400">🤝 Community</h3>
                      <ul className="list-disc list-inside text-cyan-200">
                        <li>
                          <strong>Vice President, SMU Project Wan Mai 15</strong> (2025)<br />
                        </li>
                        <li>
                          <strong>Grassroots Leader, People's Association</strong> (2022 - Present)<br />
                        </li>
                      </ul>
                    </div>
                  </div>
                );              
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-cyan-300 min-h-screen font-orbitron">
      <header className="p-8 text-center text-4xl font-bold border-b border-cyan-400">
        GREG LEE JY.
      </header>

      {/* Tabs */}
      <nav className="flex justify-center space-x-4 p-4 border-b border-cyan-400">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-lg font-semibold transition duration-200 ${
              activeTab === tab ? "bg-cyan-400 text-gray-900" : "hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

    {/* Animated Content */}
    <AnimatePresence mode="wait">
    <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
    >
        {renderContent()}
    </motion.div>
    </AnimatePresence>
    </div>
  );
}
